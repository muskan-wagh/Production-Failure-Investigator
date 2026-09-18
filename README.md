# Production Failure Investigator

Local-first AI production incident investigation tool.

When a production service crashes, engineers manually correlate pod crash info,
application logs, core-dump/stack-trace data and deployment changes — fragmented
evidence that is hard to piece together. This tool takes those evidence sources
and produces a **structured investigation report**: what happened, what changed,
the probable cause with supporting evidence, calibrated confidence, affected
components, next investigation steps and missing evidence.

> This is an **investigation tool**. It is NOT a monitoring dashboard,
> Prometheus, Grafana, a Kubernetes monitoring platform, an alerting system or
> an auto-remediation system.

## The 8 questions it answers

1. What happened?
2. What changed?
3. What is the probable cause?
4. What evidence supports the conclusion?
5. How confident is the conclusion?
6. Which components are affected?
7. What should the engineer investigate next?
8. What evidence is missing?

## MVP evidence

1. **Pod crash info** — pod name, namespace, restart count, exit code,
   termination reason, signal, timestamp.
2. **Core-dump metadata** — executable, signal, stack frames / function names,
   timestamp.
3. **Application logs** — timestamp, log level, message.
4. **Deployment changes** — previous version, new version, deployment timestamp,
   service, changed configuration metadata.

## AI output (structured JSON)

```json
{
  "summary": "...",
  "probableCause": "...",
  "confidence": 0.0,
  "evidence": [],
  "timeline": [],
  "affectedComponents": [],
  "recommendedInvestigation": [],
  "insufficientEvidence": []
}
```

## AI safety / accuracy rules

- Never invent evidence, logs, stack frames, deployment changes, metrics or
  code changes.
- Clearly distinguish observed evidence from inference.
- Correlation is not causation (`likely`, `possible`, `correlated with`).
- If evidence is insufficient or conflicts, say so.
- Confidence must reflect the supplied evidence — never claim certainty
  without sufficient evidence.

## Architecture

```
Next.js (apps/web)
   ↓
Node.js / Express API (server)
   ↓
Strands Agent (VercelModel + ai-sdk-ollama)
   ↓
Ollama (local LLM, default: llama3.1)
   ↓
Structured investigation result (Zod-validated JSON)
```

## Tech stack

| Layer    | Tech                                                              |
| -------- | ----------------------------------------------------------------- |
| Frontend | Next.js, React, TypeScript (`apps/web`)                           |
| Backend  | Node.js, Express, TypeScript (`server`)                           |
| Shared   | TypeScript + Zod (`shared`)                                       |
| AI       | AWS Strands Agents SDK (TS), `VercelModel`, `ai-sdk-ollama`, Zod  |

**Local-first:** development works without an AWS account, credit card or paid
cloud services. The agent uses the local `VercelModel`/Ollama path — never
Bedrock.

## Prerequisites

- Node.js 22+ (`nvm use` respects `.nvmrc`)
- Ollama for investigation branches (not required for the setup health check):
  `ollama serve` + `ollama pull llama3.1`

## Setup

```bash
cp .env.example .env
npm install
npm run typecheck
npm run build
npm run dev
```

- Web: http://localhost:3000
- API health: http://localhost:3001/health (`GET /health`)

Environment (`OLLAMA_MODEL`, `OLLAMA_BASE_URL`, `API_PORT`,
`NEXT_PUBLIC_API_URL`) — see `.env.example`. Never commit `.env` or secrets.

## Build progress (branch workflow)

| Branch                     | Scope                              | Status |
| -------------------------- | ---------------------------------- | ------ |
| `feat/project-setup`       | Monorepo, health endpoint, env     | ✅ Done |
| `feat/evidence-ingestion`  | Zod evidence models + validation   | Next   |
| `feat/strands-investigator`| Strands agent + Ollama + output    | Planned|
| `feat/sample-incidents`    | 3 synthetic fixtures               | Planned|
| `feat/investigation-api`   | `/api/incidents`, `/api/investigate`| Planned|
| `feat/investigation-ui`    | Incident + report UI               | Planned|
| `feat/evidence-correlation`| Timeline correlation reasoning     | Planned|
| `feat/error-handling`      | Ollama/API/input failure states    | Planned|
| `feat/testing`             | Validation, API, low-confidence    | Planned|
| `feat/hackathon-polish`    | UI polish, final docs              | Planned|
