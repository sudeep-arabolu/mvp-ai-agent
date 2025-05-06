# AI Analytics Agent (MVP)

Conversational assistant that answers portfolio / program / project questions by **combining SQL‑accurate KPIs with semantic context**—all on AWS.

---

## ✨  Key Points

| Capability | Implementation |
|------------|----------------|
| Exact, up‑to‑date numbers | Aurora PostgreSQL star‑schema queried via parameterised SQL |
| Rich “why/how” explanations | Vector search on pgvector embeddings (Cohere v3 Large) |
| Tool routing | LangChain agent chooses SQL vs Vector per question |
| Streaming UX | Server‑Sent Events – React UI renders tokens live |
| Zero‑ops demo | Runs locally with `uvicorn`; deploys as one Fargate task |

---

## 🖼️  Architecture

```mermaid
flowchart TD
    %% ─── Front‑end ─────────────────────────────────────────
    subgraph Browser
        FE["React UI<br/>(useChat hook)"]
        FE -- "POST /ask<br/>(SSE stream)" --> APIGW["API Gateway*"]
    end

    %% ─── Back‑end service ─────────────────────────────────
    subgraph Backend
        APIGW --> AGENT["FastAPI<br/>Hybrid Agent"]
        AGENT -- "SQL" --> DB[(Aurora<br/>Star Schema)]
        AGENT -- "k‑NN" --> VEC[(pgvector<br/>Embeddings)]
        AGENT --> LLM["Bedrock<br/>Claude 3 Haiku"]
    end

    %% ─── Embeddings & background job ─────────────────────
    VEC --- EMB["Bedrock<br/>Cohere v3 Large"]
    subgraph Jobs
        JOB["smart_embed.py<br/>Hourly Lambda"]
        DB -.-> JOB
        JOB -.-> VEC
    end

    %% note
    %% Local dev: React calls FastAPI directly on port 5000
