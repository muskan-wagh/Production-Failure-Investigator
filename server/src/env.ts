import "dotenv/config";

function readEnv(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.length > 0 ? value : fallback;
}

function readPort(name: string, fallback: number): number {
  const raw = process.env[name];
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  apiPort: readPort("API_PORT", 3001),
  ollamaModel: readEnv("OLLAMA_MODEL", "llama3.1"),
  ollamaBaseUrl: readEnv("OLLAMA_BASE_URL", "http://localhost:11434"),
} as const;

export type AppEnv = typeof env;
