# backend/app/main.py
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Agent Stub")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # change to your domain in prod
    allow_methods=["POST"],
    allow_headers=["*"],
)

@app.post("/ask")
def ask(question: str):
    """
    Placeholder endpoint.
    In production this streams tokens from a LangChain hybrid agent.
    """
    def stream():
        yield "data: This is a stub answer — see docs/architecture.md\n\n"
        yield "data: [END]\n\n"
    return StreamingResponse(stream(), media_type="text/event-stream")
