<div align="center">

# 🤖 CIMS Sage
### AI-Powered University Assistant

**DST-Centre for Interdisciplinary Mathematical Sciences (DST-CIMS)**
**Banaras Hindu University, Varanasi**

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Google-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev)


*AI-powered academic assistant prototype developed for DST-CIMS, BHU.*

</div>

---

## 📌 Overview

CIMS Sage is a conversational AI assistant prototype designed for students, researchers, and faculty at the DST-Centre for Interdisciplinary Mathematical Sciences, BHU. It leverages Google's Gemini AI with a curated institutional knowledge base to deliver accurate, context-aware responses in Hindi, English, and Hinglish.

> The assistant is restricted to DST-CIMS and BHU-related academic information using a custom knowledge base and prompt-engineering based guardrails.

---

## 🚦 Project Status

| Component | Status |
|---|---|
| Frontend (HTML/CSS/JS) | ✅ Completed |
| FastAPI Backend | ✅ Completed |
| Gemini AI Integration | ✅ Completed |
| Knowledge Base Integration | ✅ Completed |
| Production Deployment | ⏳ Pending Institutional API Approval |

---

## ✨ Features

- 🧠 **Gemini AI Integration** — Powered by Google's Gemini model for intelligent, context-aware conversations
- 📚 **Knowledge Base Driven** — Institutional data-backed responses for accurate department-specific information
- 🌐 **Multilingual Support** — Seamless communication in Hindi, English, and Hinglish
- ⚡ **FastAPI Backend** — High-performance async API with automatic Swagger docs
- 💬 **Modern Chat Interface** — Clean, responsive UI for an intuitive user experience
- 🔒 **Environment-Based Config** — Secure API key management via `.env`

---

## 🏗️ Architecture

```
User Query
    ↓
Frontend (HTML / CSS / JS)
    ↓
FastAPI Backend (app.py)
    ↓
Knowledge Base Context (knowledge_base.txt)
    ↓
Gemini AI
    ↓
Response Generation
    ↓
Chat Interface
```

---

## 📸 Screenshots

### Chat Interface

> 📷 *(Screenshot will be added after deployment)*

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.10+, FastAPI |
| AI Engine | Google Gemini AI |
| Frontend | HTML, CSS, JavaScript |
| Templating | Jinja2 (FastAPI Templates) |
| Config | python-dotenv |
| Server | Uvicorn (ASGI) |

---

## 📁 Project Structure

```
DST-CIMS-AI-Assistant/
├── app.py                  # Main FastAPI application
├── knowledge_base.txt      # Institutional knowledge & context
├── requirements.txt        # Python dependencies
├── .env.example            # Environment variable template
├── static/                 # Frontend static assets
│   ├── style.css
│   └── script.js
├── templates/              # Jinja2 HTML templates
│   └── index.html
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- A valid [Google Gemini API Key](https://ai.google.dev)

### 1. Clone the Repository

```bash
git clone https://github.com/That-ASHWIN/DST-CIMS-AI-Assistant.git
cd DST-CIMS-AI-Assistant
```

### 2. Create and Activate a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Copy the example file and add your API key:

```bash
cp .env.example .env
```

`.env.example`:

```env
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

### 5. Run the Application

```bash
uvicorn app:app --reload
```

The app will be live at: **http://127.0.0.1:8000**

Interactive API docs: **http://127.0.0.1:8000/docs**

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serves the chat UI |
| `POST` | `/chat` | Accepts user message, returns AI response |
| `GET` | `/health` | Health check endpoint |

> Full API documentation available at `/docs` (Swagger UI) when the server is running.

---

## 💡 Usage Example

Send a POST request to `/chat`:

```json
{
  "message": "DST-CIMS mein admission kaise lein?"
}
```

Response:

```json
{
  "reply": "DST-CIMS mein admission ke liye aapko BHU ke official portal par jaana hoga..."
}
```

---

## 🙏 Acknowledgements

- [Google Gemini AI](https://ai.google.dev) for the underlying language model
- [FastAPI](https://fastapi.tiangolo.com) for the blazing-fast backend framework

---



---

<div align="center">
  <sub>Developed as an academic AI assistant prototype for DST-CIMS, BHU.</sub>
</div>