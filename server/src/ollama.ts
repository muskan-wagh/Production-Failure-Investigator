import { env } from "./env.js";

export type OllamaConfig = {
  model: string;
  baseUrl: string;
  configured: boolean;
};

/**
 * Local-first Ollama configuration (Branch 1: wiring only).
 * The actual Strands Agent construction
 * (Agent + VercelModel + ollama(model)) lands in Branch 3
 * (feat/strands-investigator). No network calls here so
 * `GET /health` works even when Ollama is not running.
 */
export function getOllamaConfig(): OllamaConfig {
  const model = env.ollamaModel.trim();
  const baseUrl = env.ollamaBaseUrl.trim().replace(/\/+$/, "");
  return {
    model,
    baseUrl,
    configured: model.length > 0 && baseUrl.length > 0,
  };
}
