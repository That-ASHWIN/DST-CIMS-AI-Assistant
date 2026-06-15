import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, Field
from google import genai
from google.genai import types

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

client = genai.Client(api_key=GEMINI_API_KEY)

def load_knowledge_base():
    try:
        with open("knowledge_base.txt", "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        return "DST-CIMS Knowledge Base Not Found."

def build_system_prompt():
    knowledge = load_knowledge_base()
    return f"""You are CIMS Sage, Official AI Assistant of DST-CIMS, BHU Varanasi.
LANGUAGE: Reply in same language as user (English/Hindi/Hinglish).
RULES: Answer ONLY from knowledge base. Never invent information.
If unavailable say: "I do not have verified information. Please refer to official DST-CIMS website."
KNOWLEDGE BASE:
{knowledge}
END OF KNOWLEDGE BASE"""

app = FastAPI(title="CIMS Sage API", version="2.0")

app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

templates = Jinja2Templates(directory="templates")

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=1000)

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/chat")
def chat(req: ChatRequest):
    try:
        prompt = f"{build_system_prompt()}\n\nUser Question: {req.message.strip()}\n\nAnswer:"
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.2,
                max_output_tokens=800,
            )
        )
        return {"reply": response.text}
    except Exception as e:
        print("Chat Error:", e)
        raise HTTPException(status_code=500, detail="AI service temporarily unavailable.")
