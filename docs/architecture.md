flowchart LR
  %% Front‑end
  subgraph Frontend
    A[React&nbsp;UI] -- "SSE&nbsp;/ask" --> B(API&nbsp;Gateway)
  end

  %% Back‑end
  subgraph Backend
    B --> C[FastAPI<br/>Hybrid&nbsp;Agent]
    C -- SQL --> D[Aurora<br/>Star&nbsp;Schema]
    C -- k‑NN --> E[pgvector<br/>Embeddings]
    C --> F[Bedrock<br/>Claude&nbsp;3&nbsp;+&nbsp;Cohere&nbsp;v3]
  end

  %% Note (comment-only)
  %% In local dev the UI calls FastAPI directly on port 5000
