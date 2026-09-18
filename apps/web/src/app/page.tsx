"use client";

import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  service: string;
  ollama: { model: string; baseUrl: string; configured: boolean };
};

const apiBase =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function HomePage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`${apiBase}/health`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`API responded ${res.status}`);
        return (await res.json()) as HealthResponse;
      })
      .then((data) => {
        if (!cancelled) {
          setHealth(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "API unreachable");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
      <p style={{ color: "#8b93a7", margin: "0 0 8px" }}>
        Hackathon project · local-first
      </p>
      <h1 style={{ margin: "0 0 12px", fontSize: 36 }}>
        Production Failure Investigator
      </h1>
      <p style={{ color: "#b8bfd0", lineHeight: 1.6 }}>
        AI-assisted investigation of pod crashes, logs, core-dump metadata and
        deployment changes. This is an investigation tool — not a monitoring
        dashboard. Full evidence input and investigation UI land in later
        branches.
      </p>

      <section
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #232a3b",
          borderRadius: 12,
          background: "#111624",
        }}
      >
        <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>Project setup</h2>
        {loading ? <p>Checking API health…</p> : null}
        {error ? (
          <p style={{ color: "#f0a35e" }}>
            API not reachable at {apiBase} ({error}). Start it with{" "}
            <code>npm run dev --workspace=@pfi/server</code>.
          </p>
        ) : null}
        {health ? (
          <pre
            style={{
              background: "#0b0e14",
              padding: 12,
              borderRadius: 8,
              overflowX: "auto",
            }}
          >
            {JSON.stringify(health, null, 2)}
          </pre>
        ) : null}
        <p style={{ color: "#8b93a7", fontSize: 14 }}>
          Branch 1 scope only: monorepo wiring, health endpoint, env config.
        </p>
      </section>
    </main>
  );
}
