# Plan — Production Failure Investigator

Working tracker for the hackathon build. Update this file as branches land:
move items `Pending → Working → Done`. Single source of truth for "where are we".

## How to check this is working

Prerequisites: Node.js 22+ (`nvm use`), `npm install` done.

```bash
# 1. Types + builds (must all pass)
npm run typecheck
npm run build

# 2. API health (terminal 1)
node server/dist/index.js
# terminal 2:
curl http://localhost:3001/health
# expect: {"status":"ok","service":"pfi-api","ollama":{"model":"llama3.1",...}}

# 3. Web UI (terminal 1)
npm run dev --workspace=@pfi/web
# browser: http://localhost:3000  (shows setup page + API health JSON)
```

Or one command for both: `npm run dev`, then open
http://localhost:3000 and http://localhost:3001/health.

> `GET /health` works even when Ollama is NOT running (returns config only).
> Real investigation (Branch 3+) needs `ollama serve` + `ollama pull llama3.1`.

## ✅ Done

- [x] **feat/project-setup** (`72afc50`, merged) — monorepo
  (`apps/web`, `server`, `shared`), Express `GET /health`, env config,
  `npm run dev/build/typecheck`. Verified: typecheck ✅, build ✅,
  `GET /health` → 200 ✅, `GET /` → 200 ✅.
- [x] **docs/readme** (`26abead`, merged) — full project README.
- [x] **docs/plan** (this file) — working tracker.

## 🔄 Working (current branch)

- [ ] _(nothing right now — pick next from Pending)_

## ⏳ Pending (in order)

- [ ] **feat/evidence-ingestion** — Zod models in `shared`:
  `PodEvidence`, `CoreDumpMetadata`, `IncidentLog`, `DeploymentChange`,
  `IncidentEvidence` (all timestamped). No DB. Test validation.
  Commit: `feat: add incident evidence models`
- [ ] **feat/strands-investigator** — real Strands `Agent` + `VercelModel` +
  `ollama(llama3.1)`, safety system prompt, Zod structured output
  (`summary`, `probableCause`, `confidence`, `evidence`, `timeline`,
  `affectedComponents`, `recommendedInvestigation`, `insufficientEvidence`).
  Must actually call Ollama — no fakes.
  Commit: `feat: add Strands investigation agent`
- [ ] **feat/sample-incidents** — 3 synthetic fixtures: deployment regression
  (10:25 deploy → 10:30 errors → 10:31 crash/restart), OOM resource failure,
  insufficient-evidence case. No real prod data.
  Commit: `feat: add synthetic incident fixtures`
- [ ] **feat/investigation-api** — `GET /health`, `GET /api/incidents`,
  `GET /api/incidents/:id`, `POST /api/investigate`
  (validate → agent → Ollama → Zod JSON). Handle invalid input, missing
  incident, Ollama down, malformed output.
  Commit: `feat: add investigation API`
- [ ] **feat/investigation-ui** — select incident → view evidence →
  Investigate → view report (summary/cause/confidence/evidence/timeline/
  affected/next/missing). No dashboards, auth, or admin pages.
  Commit: `feat: add investigation interface`
- [ ] **feat/evidence-correlation** — timestamp/service/signal/stack/deploy
  correlation, chronological timeline, `likely/possible/correlated with`
  wording. Correlation ≠ causation.
  Commit: `feat: correlate incident evidence`
- [ ] **feat/error-handling** — Ollama down, model missing, API down, empty
  logs, missing dump/deploy, malformed response. Useful UI errors.
  Commit: `fix: improve investigation error handling`
- [ ] **feat/testing** — validation, fixtures, API, output shape,
  insufficient-evidence ⇒ low confidence, no invented cause. Run typecheck +
  build + tests on all 3 fixtures.
  Commit: `test: cover investigation workflow`
- [ ] **feat/hackathon-polish** — loading/error states, readability, timeline
  + confidence display, responsive, final README. No new features.
  Commit: `docs: prepare hackathon submission`

## Branch rules (every branch)

1. `git checkout main && git pull && git checkout -b feat/<name>`
2. Only that branch's scope.
3. `npm run typecheck`, `npm run build` (+ tests where present).
4. Conventional commit, merge `--no-ff` into `main`, **push branch + main**.
5. Move the item here from Pending → Done with commit hash.
6. Never rewrite history, fake timestamps, or commit `.env`/secrets.
