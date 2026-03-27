// src/app/(app)/pyqs/opengraph-image.jsx
import { ImageResponse } from "next/og";
import { OGBase }        from "@/lib/og";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt         = "Prepzena PYQs — Previous year question papers from top universities";

export default function Image() {
  return new ImageResponse(
    <OGBase
      title="Previous Year Questions"
      subtitle="Real exam papers from VTU, PIET, KUK, Anna University, AKTU, and CBSE with model answers."
      badge="6 universities · Free questions"
      tags={["VTU", "AKTU", "Anna Univ", "CBSE"]}
    />,
    { width: 1200, height: 630 }
  );
}
