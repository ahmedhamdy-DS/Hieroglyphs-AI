import io
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError

from .model.loader import get_model, warm_up
from .model.predictor import predict_image
from .data import CODE_TO_INFO, GARDINER_CATEGORIES
from .schemas import PredictionResponse, HealthResponse
from .config import ALLOWED_ORIGINS

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("hieroglyphs.api")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Loads the model once when the server starts, not with every request
    logger.info("Warming up model...")
    warm_up()
    yield
    logger.info("Shutting down.")


app = FastAPI(
    title="Egyptian Hieroglyphs API",
    description="API for recognizing Egyptian Hieroglyphs using InceptionV3",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_FILE_SIZE_MB = 8
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/jpg", "image/webp"}


@app.get("/api/health", response_model=HealthResponse)
def health():
    """Ensure the server is running and the model is loaded (useful for monitoring/deployment)."""
    try:
        model_loaded = get_model() is not None
    except Exception:
        model_loaded = False
    return HealthResponse(status="ok", model_loaded=model_loaded)


@app.post("/api/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    """Accepts a hieroglyph image and returns the prediction (code, name, description, confidence score)."""
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {file.content_type}. Use JPG, PNG, or WEBP.",
        )

    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail=f"Image size is larger than {MAX_FILE_SIZE_MB}MB.",
        )

    try:
        image = Image.open(io.BytesIO(contents))
        image.load()
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="The file is not a valid image.")

    result = predict_image(image)

    if result["code"] == "Error":
        # Internal error during prediction (not an input error)
        logger.error("Prediction error: %s", result["description"])
        raise HTTPException(status_code=500, detail="An error occurred while analyzing the image.")

    return PredictionResponse(**result)


@app.get("/api/symbols")
def list_symbols():
    """Returns all known symbols in the database (useful for explore/museum pages)."""
    return [
        {"code": code, "name": name, "description": desc}
        for code, (name, desc) in CODE_TO_INFO.items()
    ]


@app.get("/api/symbols/{code}")
def get_symbol(code: str):
    if code not in CODE_TO_INFO:
        raise HTTPException(status_code=404, detail="Symbol not found.")
    name, desc = CODE_TO_INFO[code]
    return {"code": code, "name": name, "description": desc}


@app.get("/api/categories")
def list_categories():
    """Main Gardiner categories (A: Man, B: Woman, ...)."""
    return GARDINER_CATEGORIES
