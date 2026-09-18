import cors from "cors";
import express from "express";
import { env } from "./env.js";
import { getOllamaConfig } from "./ollama.js";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "pfi-api",
      ollama: getOllamaConfig(),
    });
  });

  // Branch 5 adds: GET /api/incidents, GET /api/incidents/:id, POST /api/investigate
  return app;
}

const app = createApp();

if (process.env.NODE_ENV !== "test") {
  app.listen(env.apiPort, () => {
    // eslint-disable-next-line no-console
    console.log(`[pfi-api] listening on http://localhost:${env.apiPort}`);
  });
}

export default app;
