# Egyptian Hieroglyphs — Project

المشروع اتقسم لجزئين مستقلين بيتكلموا مع بعض عن طريق API:

```
hieroglyphs-project/
├── backend/     → FastAPI (منطق الذكاء الاصطناعي، مأخوذ من مشروع Streamlit الأصلي)
└── frontend/    → Next.js (الموقع اللي كنت شغال عليه، اتضاف له مكون Translator)
```

## الفكرة

- **backend/**: فيه نفس منطق التنبؤ اللي كان في `pages/1_Translator.py` (تحميل موديل InceptionV3، الـ label_map، قاموس الرموز)، لكن اتحول لـ API بـ FastAPI بدل Streamlit. مفيهوش أي UI خالص.
- **frontend/**: مشروعك الـ Next.js زي ما هو (Hero, Pharaohs, Monuments, Timeline, Gallery, Artifact3D)، وأضفت له مكون جديد اسمه `Translator.tsx` بيرفع صورة ويبعتها لـ backend عن طريق `fetch` ويعرض النتيجة.

الاتنين شغالين منفصلين تمامًا (سيرفرين مختلفين، حتى لو محليًا)، والربط بينهم بس عن طريق رابط الـ API.

## إزاي تشغلهم محليًا مع بعض

**١) شغّل الـ backend الأول:**
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```
جرب `http://localhost:8000/docs` تتأكد إنه شغال.

**٢) شغّل الـ frontend:**
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```
افتح `http://localhost:3000` — هتلاقي قسم "AI Hieroglyph Translator" جديد، وهو اللي بيكلم الـ backend.

الربط كله بيحصل عن طريق متغير واحد: `NEXT_PUBLIC_API_URL` في ملف `frontend/.env.local` — لازم يبقى نفس الرابط اللي شغال عليه الـ backend.

## إزاي تنشرهم (Deployment)

| الجزء | فين |
|---|---|
| backend | Render / Railway / Fly.io (بيدعموا Docker، فيه `Dockerfile` جاهز) |
| frontend | Vercel (الأنسب لـ Next.js) |

خطوات النشر:
1. ادفع كل مجلد (`backend`, `frontend`) كـ repo منفصل على GitHub (أو نفس الـ repo، بس حدد الـ root directory وقت الديبلوي).
2. انشر الـ backend الأول (مثلاً على Render) → هياخد رابط زي `https://hieroglyphs-api.onrender.com`.
3. في Vercel، وقت ما تنشر الـ frontend، ضيف Environment Variable:
   `NEXT_PUBLIC_API_URL = https://hieroglyphs-api.onrender.com`
4. في `backend/.env` (أو Environment Variables على Render)، حدد:
   `ALLOWED_ORIGINS = https://your-frontend.vercel.app`
   عشان الـ CORS يسمح بس لموقعك يكلم الـ API.

كده الموقع بقى على دومين حقيقي، وبيكلم API حقيقي منفصل عنه بالكامل.

## اللي اتغيّر بالظبط عشان الدمج

- `frontend/app/components/Translator.tsx` → ملف جديد بالكامل
- `frontend/app/page.tsx` → إضافة سطرين لاستدعاء `Translator`
- `frontend/.env.local.example` → ملف جديد
- `backend/` → مجلد جديد بالكامل، فيه نفس منطق AI بتاع مشروع Streamlit بعد ما اتنظف وانفصل عن الـ UI

باقي مكونات الـ frontend (Hero, Pharaohs, Monuments, Gallery, Timeline, Artifact3D) متلمُّوش خالص.
