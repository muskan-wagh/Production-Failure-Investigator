# Production Failure Investigator

Local-first AI production incident investigation tool.

It correlates pod crash info, application logs, core-dump metadata and
deployment changes into a structured investigation report. It is an
**investigation tool** — not a monitoring dashboard, Prometheus, Grafana,
alerting or auto-remediation system.

## Stack

- Frontend: Next.js + React + TypeScript (`apps/web`)
- Backend: Node.js + Express + TypeScript (`server`)
- Shared types: TypeScript + Zod (`shared`)
- AI (Branch 3+): AWS Strands Agents SDK (TypeScript) + `VercelModel` + `ai-sdk-ollama` + Ollama + Zod structured output

Architecture: `Next.js → Express → Strands Agent → Ollama → structured JSON`.

## Prerequisites

- Node.js 22+ (`nvm use` respects `.nvmrc`)
- Ollama running locally for investigation branches (not required for Branch 1 health check):
  `ollama serve` + `ollama pull llama3.1`
- No AWS account required (Strands uses the local `VercelModel`/Ollama path, never Bedrock).

## Setup (Branch 1)

```bash
cp .env.example .env
npm install
npm run typecheck
npm run build
npm run dev
```

- Web: http://localhost:3000
- API health: http://localhost:3001/health

Env (`OLLAMA_MODEL`, `OLLAMA_BASE_URL`, `API_PORT`, `NEXT_PUBLIC_API_URL`) — see `.env.example`. Never commit `.env`.
