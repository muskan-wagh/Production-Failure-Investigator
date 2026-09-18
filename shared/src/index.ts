/**
 * @pfi/shared — shared TypeScript types for Production Failure Investigator.
 *
 * Branch 1 (project-setup) scope: package wiring only.
 * Full evidence models (PodEvidence, CoreDumpMetadata, IncidentLog,
 * DeploymentChange, IncidentEvidence) + Zod validation land in
 * Branch 2 (feat/evidence-ingestion).
 */

export const APP_NAME = "Production Failure Investigator" as const;

export type HealthStatus = {
  status: "ok";
  service: string;
};
