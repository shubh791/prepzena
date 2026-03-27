// src/app/opengraph-image.jsx — root-level fallback OG image
import { ImageResponse } from "next/og";
import { OGBase }        from "@/lib/og";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt         = "Prepzena — Learn CS Smarter";

export default function Image() {
  return new ImageResponse(
    <OGBase
      title="Learn CS Smarter"
      subtitle="Structured notes, FAANG coding problems, quizzes, and PYQs for CS/IT students."
      badge="Free to start · No subscription"
      tags={["Notes", "Coding", "Quizzes", "PYQs"]}
    />,
    { width: 1200, height: 630 }
  );
}
