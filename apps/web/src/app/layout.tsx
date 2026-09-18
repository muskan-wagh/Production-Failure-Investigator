import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Production Failure Investigator",
  description:
    "Local-first AI production incident investigation tool (not a monitoring dashboard).",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          margin: 0,
          background: "#0b0e14",
          color: "#e6e9f0",
        }}
      >
        {children}
      </body>
    </html>
  );
}
