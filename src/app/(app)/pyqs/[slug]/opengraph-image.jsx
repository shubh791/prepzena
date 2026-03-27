// src/app/(app)/pyqs/[slug]/opengraph-image.jsx — dynamic per-paper OG image
import { ImageResponse } from "next/og";
import { OGBase }        from "@/lib/og";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt         = "Prepzena — Previous Year Question Paper";

function slugToTitle(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function Image({ params }) {
  const title = slugToTitle(params.slug ?? "question-paper");

  return new ImageResponse(
    <OGBase
      title={title}
      subtitle="Previous year question paper with model answers. Practice real exam questions on Prepzena."
      badge="Previous Year Questions"
      tags={["PYQ", "Solved", "University Exam"]}
    />,
    { width: 1200, height: 630 }
  );
}
