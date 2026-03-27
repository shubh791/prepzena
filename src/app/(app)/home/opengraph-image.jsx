// src/app/(app)/home/opengraph-image.jsx
import { ImageResponse } from "next/og";
import { OGBase }        from "@/lib/og";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt         = "Prepzena Dashboard — Track your study streak and progress";

export default function Image() {
  return new ImageResponse(
    <OGBase
      title="Your Learning Dashboard"
      subtitle="Track your streak, completed notes, quiz scores, and weekly goals — all in one view."
      badge="Study smarter, not harder"
      tags={["Streak", "Progress", "Weekly Goals"]}
    />,
    { width: 1200, height: 630 }
  );
}
