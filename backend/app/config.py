import os

# دومينات مسموح لها تكلم الـ API (CORS)
# في الديفلوبمنت سيبها * أو localhost، وفي production حطها = دومين الفرونت إند بتاعك فقط
_raw = os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
ALLOWED_ORIGINS = [origin.strip() for origin in _raw.split(",") if origin.strip()]
