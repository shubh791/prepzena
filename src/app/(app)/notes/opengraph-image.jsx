// src/app/(app)/notes/opengraph-image.jsx
import { ImageResponse } from "next/og";
import { OGBase }        from "@/lib/og";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt         = "Prepzena Notes — Structured CS study notes";

export default function Image() {
  return new ImageResponse(
    <OGBase
      title="Structured Study Notes"
      subtitle="Topic-wise notes on Arrays, DBMS, OS, CN, and more — with quizzes after each section."
      badge="Free first section · Premium full access"
      tags={["Arrays", "DBMS", "OS", "Networks", "DSA"]}
    />,
    { width: 1200, height: 630 }
  );
}
