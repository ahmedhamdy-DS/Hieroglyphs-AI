from typing import Optional
from pydantic import BaseModel


class PredictionResponse(BaseModel):
    code: str
    name: str
    description: str
    category: Optional[str] = None
    confidence: float


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
