// src/app/(marketing)/opengraph-image.jsx — landing page OG image
import { ImageResponse } from "next/og";
import { OGBase }        from "@/lib/og";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt         = "Prepzena — Structured notes and FAANG prep for CS/IT students";

export default function Image() {
  return new ImageResponse(
    <OGBase
      title="Crack your CS exams & interviews"
      subtitle="Notes, FAANG problems, quizzes, and PYQs — all in one place. One-time ₹99 for everything."
      badge="2,400+ students · 4.9 ★"
      tags={["Free to start", "₹99 All Access", "No subscription"]}
    />,
    { width: 1200, height: 630 }
  );
}
