
# AI‑Driven Portfolio / Program Assistant — System Design Repo

> Conversational analytics agent that combines SQL accuracy with vector
> search to answer program‑management questions in plain English.

| Layer | Tech |
|-------|------|
| Data Warehouse | Aurora PostgreSQL (star‑schema facts & dims) |
| Semantic Layer | pgvector + Cohere v3 embeddings |
| LLM Agent | LangChain router (SQL + vector) using Claude 3 Haiku |
| API | FastAPI, SSE streaming |
| Front‑end | React hook (`useChat`) |

![Architecture diagram](docs/img/architecture.png)

This repo includes **only** system‑design artefacts and stub code—full
implementation resides in a private repository.
