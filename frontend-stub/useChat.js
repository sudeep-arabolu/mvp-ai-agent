// Very small React hook illustrating SSE with the FastAPI backend.
import { useState } from "react";

export function useChat() {
  const [answer, setAnswer] = useState("");

  const ask = (question) => {
    setAnswer("");
    fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: question }),
    }).then((res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const read = () =>
        reader.read().then(({ done, value }) => {
          if (done) return;
          decoder
            .decode(value)
            .split("\n\n")
            .forEach((chunk) => {
              if (chunk.startsWith("data:")) {
                const tok = chunk.slice(5);
                if (tok !== "[END]") setAnswer((a) => a + tok);
              }
            });
          read();
        });
      read();
    });
  };

  return { answer, ask };
}
