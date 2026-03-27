// src/app/(app)/quiz/opengraph-image.jsx
import { ImageResponse } from "next/og";
import { OGBase }        from "@/lib/og";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt         = "Prepzena Quizzes — MCQ quizzes for every study note";

export default function Image() {
  return new ImageResponse(
    <OGBase
      title="Topic Quizzes"
      subtitle="MCQ quizzes unlock after each note. Test your understanding and track your average score."
      badge="Unlocks after reading"
      tags={["MCQ", "Instant feedback", "Score tracking"]}
    />,
    { width: 1200, height: 630 }
  );
}
