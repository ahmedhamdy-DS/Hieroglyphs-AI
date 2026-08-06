# 𓂀 Hieroglyphs-AI

**AI-powered Egyptian hieroglyph recognition — upload a photo of a hieroglyph and get an instant translation.**
 <p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/XGBoost-006ACC?style=for-the-badge" alt="XGBoost" />
  <img src="https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-Learn" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</p>
 
 
 **Live demo:** [hieroglyphs-ai.vercel.app](https://hieroglyphs-ai.vercel.app)

>
![Hieroglyphs-AI overview](.ML\Docs\Overview.png)

---

## The problem

Reading Egyptian hieroglyphs is a specialized skill — it normally requires years of studying Egyptology or Gardiner's sign list to identify even a single symbol. This creates a barrier for:

- **Tourists and museum visitors** who see hieroglyphs on monuments and artifacts but have no way to understand them on the spot.
- **Students and hobbyists** learning about ancient Egypt who want a quick, interactive way to explore individual symbols instead of digging through academic references.
- **Content creators / educators** who need a fast way to identify and describe a symbol they've photographed.

**Hieroglyphs-AI removes that barrier**: upload a photo of a single hieroglyph, and the model identifies it, returns its Gardiner code, name, meaning, and a confidence score — in seconds, from any browser.

---

## How it works

The project is split into two independent services that talk to each other over a simple REST API:

```
hieroglyphs-project/
├── backend/   → FastAPI service that loads an InceptionV3 model and serves predictions
└── frontend/  → Next.js site (Hero, Pharaohs, Monuments, Timeline, Gallery, 3D Artifacts, Translator)
```

**User flow:**
1. Visitor opens the site and scrolls to the **AI Hieroglyph Translator** section.
2. They upload a photo of a hieroglyph (JPG / PNG / WEBP, up to 8MB).
3. The frontend sends the image to the backend's `/api/predict` endpoint.
4. The backend (a fine-tuned **InceptionV3** CNN) classifies the symbol and returns its Gardiner code, name, description, and confidence score.
5. The result renders instantly in the UI.


![Translator screenshot](ML\Docs\Translator.png)

---

The AI logic originally lived inside a Streamlit prototype (`pages/1_Translator.py`). It was extracted into a standalone FastAPI service with no UI of its own, so it can be called by any client — the Next.js site today, potentially a mobile app tomorrow.

---

## API reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/predict` | `POST` | Accepts an image file, returns the predicted symbol (code, name, description, confidence) |
| `/api/symbols` | `GET` | Returns the full database of known symbols |
| `/api/symbols/{code}` | `GET` | Returns details for a single symbol by Gardiner code |
| `/api/categories` | `GET` | Returns the main Gardiner categories (A: Man, B: Woman, ...) |
| `/api/health` | `GET` | Health check — confirms the server is up and the model is loaded |

Interactive docs are available at `/docs` on the backend (FastAPI's built-in Swagger UI).

---

## Running locally

**1. Start the backend:**
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```
Visit `http://localhost:8000/docs` to confirm it's running.

**2. Start the frontend:**
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```
Open `http://localhost:3000` — you'll see the "AI Hieroglyph Translator" section talking to your local backend.

The two services are connected by a single environment variable: `NEXT_PUBLIC_API_URL` in `frontend/.env.local`, which must match the URL the backend is running on.

---

## Deployment

| Part | Where | Notes |
|---|---|---|
| Backend | Render (or Railway / Fly.io) | Docker-based, `Dockerfile` included |
| Frontend | Vercel | Set **Framework Preset** to `Next.js` explicitly |

**Steps:**
1. Deploy `backend/` (e.g. to Render) → you'll get a URL like `https://hieroglyphs-ai.onrender.com`.
2. On Vercel, set the frontend's environment variable:
   `NEXT_PUBLIC_API_URL = https://hieroglyphs-ai.onrender.com`
3. On the backend host, set:
   `ALLOWED_ORIGINS = https://your-frontend.vercel.app`
   so CORS only allows your actual frontend domain to call the API.

> **Note on cold starts:** on Render's free tier, the backend spins down after ~15 minutes of inactivity, so the first request after idle time can take 30–60s while the model warms back up. For production use, consider a paid instance (no spin-down) or a keep-alive ping to `/api/health` every ~10 minutes.

---

## Roadmap / possible next steps

- [ ] Batch upload — recognize multiple hieroglyphs in one photo (segment + classify each)
- [ ] Confidence threshold UI — flag low-confidence predictions instead of showing a guess
- [ ] Mobile camera capture (not just file upload)
- [ ] Expand the symbol database beyond the current label set
- [ ] Cache frequent predictions to reduce backend load

---

## Credits

Built by **Ahmed Hamdy** — Data Scientist & ML Engineer.

- LinkedIn: [linkedin.com/in/ahmed-hamdy-4569a8360](https://www.linkedin.com/in/ahmed-hamdy-4569a8360/)
- Portfolio: [my-web-3ciq.vercel.app](https://my-web-3ciq.vercel.app/)
- GitHub: [@ahmedhamdy-DS](https://github.com/ahmedhamdy-DS)
