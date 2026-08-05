"""
تحميل موديل InceptionV3 مرة واحدة بس (lazy singleton) بدل ما يتحمل مع كل request.
نفس فكرة st.cache_resource بتاعة Streamlit، بس بشكل مناسب لـ FastAPI.
"""
import os
import threading
import logging

import gdown
from tensorflow.keras.models import load_model

logger = logging.getLogger("hieroglyphs.model")

MODEL_DIR = os.environ.get("MODEL_DIR", "model_files")
MODEL_FILE = "InceptionV3_model.h5"
MODEL_PATH = os.path.join(MODEL_DIR, MODEL_FILE)
MODEL_URL = os.environ.get(
    "MODEL_URL",
    "https://huggingface.co/sonic222/Egyptian-Hieroglyphs/resolve/main/InceptionV3_model.h5",
)

_model = None
_lock = threading.Lock()


def get_model():
    """يرجع الموديل المحمّل، وبيحمله أول مرة بس (thread-safe)."""
    global _model
    if _model is not None:
        return _model

    with _lock:
        if _model is not None:  # تأكيد تاني بعد أخذ الـ lock (double-checked locking)
            return _model

        if not os.path.exists(MODEL_PATH):
            logger.info("Downloading model from %s ...", MODEL_URL)
            os.makedirs(MODEL_DIR, exist_ok=True)
            gdown.download(MODEL_URL, MODEL_PATH, quiet=False)

        logger.info("Loading model from %s ...", MODEL_PATH)
        _model = load_model(MODEL_PATH)
        logger.info("Model loaded successfully.")
        return _model


def warm_up():
    """يستخدم وقت startup عشان الموديل يتحمل قبل أول request حقيقي من المستخدم."""
    get_model()
