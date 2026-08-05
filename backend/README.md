# Egyptian Hieroglyphs API

FastAPI backend للتعرف على الرموز الهيروغليفية - نفس منطق الـ AI بتاع مشروع Streamlit الأصلي، بس متفصل عن الـ UI عشان يتحط API حقيقي.

## التشغيل محليًا

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # على ويندوز: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env           # وعدّل القيم لو محتاج

uvicorn app.main:app --reload --port 8000
```

هيفتح على `http://localhost:8000`، والـ docs التلقائية على `http://localhost:8000/docs`.

أول ما تعمل request لـ `/api/predict` أو أول ما السيرفر يشتغل، هيحمّل الموديل من HuggingFace تلقائيًا (تقريبًا 90 ميجا) ويخزنه في `model_files/`.

## التشغيل بـ Docker

```bash
docker build -t hieroglyphs-api .
docker run -p 8000:8000 --env-file .env hieroglyphs-api
```

## الـ Endpoints

| Method | Path              | الوصف                                  |
|--------|-------------------|-----------------------------------------|
| GET    | `/api/health`     | حالة السيرفر وهل الموديل اتحمل         |
| POST   | `/api/predict`    | يستقبل صورة (multipart/form-data, field اسمه `file`) ويرجع التنبؤ |
| GET    | `/api/symbols`    | كل الرموز المعروفة في قاعدة البيانات    |
| GET    | `/api/symbols/{code}` | تفاصيل رمز معين (مثلاً N14)         |
| GET    | `/api/categories` | فئات جاردنر الرئيسية                    |

## مثال استخدام /api/predict

```bash
curl -X POST http://localhost:8000/api/predict \
  -F "file=@/path/to/hieroglyph.jpg"
```

الرد:
```json
{
  "code": "N14",
  "name": "Ankh",
  "description": "...",
  "category": "Sky, earth, water",
  "confidence": 0.9421
}
```

## النشر (Deployment)

- **Render / Railway / Fly.io**: بيدعموا Docker مباشرة، اربط الـ repo وحدد `Dockerfile`.
- حدد `ALLOWED_ORIGINS` = دومين الفرونت إند النهائي بتاعك (مثلاً `https://your-site.vercel.app`).
- الموديل بيتحمل أول تشغيل، فممكن أول request ياخد وقت أطول (cold start). لو عايز تتجنب ده، حمّل الموديل وقت `docker build` بدل الـ runtime.
