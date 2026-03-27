// src/app/(app)/coding/opengraph-image.jsx
import { ImageResponse } from "next/og";
import { OGBase }        from "@/lib/og";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt         = "Prepzena Coding — 25 FAANG problems per language with live editor";

export default function Image() {
  return new ImageResponse(
    <OGBase
      title="FAANG Coding Practice"
      subtitle="25 premium problems per language — Python, JS, Java, C++, C — with a live in-browser code editor."
      badge="25 FAANG problems per language"
      tags={["Python", "JavaScript", "Java", "C++", "C"]}
    />,
    { width: 1200, height: 630 }
  );
}
