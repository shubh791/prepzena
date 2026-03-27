// src/app/(app)/notes/[slug]/opengraph-image.jsx — dynamic per-note OG image
import { ImageResponse } from "next/og";
import { OGBase }        from "@/lib/og";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "Prepzena — Study Note";

function slugToTitle(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function Image({ params }) {
  const title = slugToTitle(params.slug ?? "study-note");

  return new ImageResponse(
    <OGBase
      title={title}
      subtitle="Read the full note, take the quiz, and track your progress on Prepzena."
      badge="Study Note"
      tags={["Notes", "Quiz included", "Prepzena"]}
    />,
    { width: 1200, height: 630 }
  );
}
