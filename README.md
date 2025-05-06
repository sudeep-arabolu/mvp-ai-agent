# AI Analytics Agent (MVP)

> Conversational assistant that lets program‑management teams ask plain‑English questions and receive **SQL‑grade numbers _plus_ narrative context** in real time.

---

## 🌐  Project Overview
Traditional BI dashboards show numbers but hide the “why.”  
This MVP fuses **warehouse accuracy** with **LLM reasoning**:

* Exact KPIs (budget, velocity, MTTR…) come straight from Aurora queries.  
* Explanations are enriched with risk descriptions, milestone text, OKRs—retrieved semantically from pgvector embeddings.  
* A single endpoint streams answers token‑by‑token to the UI, producing a ChatGPT‑like experience without sacrificing data fidelity.

---

## ✨  Key Features

| Feature | Benefit |
|---------|---------|
| **Hybrid Retrieval (SQL + Vector)** | Numbers never hallucinate; narrative answers stay relevant. |
| **Streaming Server‑Sent Events** | Users see answers materialise in < 1 s, boosting perceived speed. |
| **No Ops for MVP** | Runs locally or in one ECS Fargate task; hourly Lambda keeps embeddings fresh. |
| **Cloud‑native Security** | All data stays inside AWS; IAM + Secrets Manager, no external keys. |

---

## 🎯  System Design Goals

| Goal | Design Choice |
|------|---------------|
| **Accuracy first** | Route numeric questions to SQL, not the LLM. |
| **Explainability** | Attach the text snippet/source behind every answer. |
| **Cost‑efficiency** | pgvector inside Aurora until > 3 M vectors, then OpenSearch. |
| **Incremental growth** | LangChain tools let us bolt on Jira, GitHub, SAP via config, not code rewrites. |
| **Fast POC → easy prod** | Same FastAPI code runs on laptop, Lambda, or Fargate. |

---

## 🖼️  Architecture

```mermaid
flowchart TD
    subgraph Browser
        FE["React UI<br/>(useChat hook)"]
        FE -- "POST /ask<br/>(SSE)" --> APIGW["API Gateway*"]
    end

    subgraph Backend
        APIGW --> AGENT["FastAPI<br/>Hybrid Agent"]
        AGENT -- "SQL" --> DB[(Aurora<br/>Star‑Schema)]
        AGENT -- "k‑NN" --> VEC[(pgvector<br/>Embeddings)]
        AGENT --> LLM["Bedrock<br/>Claude 3 Haiku"]
    end

    VEC --- EMBED[[Bedrock<br/>Cohere v3 Large]]

    subgraph Jobs
        EMBJOB["smart_embed.py<br/>Hourly Lambda"]
        DB -.-> EMBJOB
        EMBJOB -.-> VEC
    end
