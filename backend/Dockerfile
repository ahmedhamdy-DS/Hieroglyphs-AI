FROM python:3.11-slim

WORKDIR /app

# مكتبات نظام لازمة لـ Pillow / TensorFlow
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

# الموديل هيتحمل هنا وقت أول تشغيل (أو حطه في الـ image وقت الـ build لو عايز يبقى أسرع)
ENV MODEL_DIR=/app/model_files

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
