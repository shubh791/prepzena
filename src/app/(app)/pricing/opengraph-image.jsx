// src/app/(app)/pricing/opengraph-image.jsx
import { ImageResponse } from "next/og";
import { OGBase }        from "@/lib/og";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt         = "Prepzena Pricing — ₹99 one-time, lifetime access";

export default function Image() {
  return new ImageResponse(
    <OGBase
      title="₹99 · Access Everything. Forever."
      subtitle="One-time payment. No subscription, no renewal. Unlock all notes, FAANG problems, and PYQ solutions permanently."
      badge="No subscription · Pay once · Keep forever"
      tags={["Free tier available", "₹99 All Access", "Cashfree"]}
    />,
    { width: 1200, height: 630 }
  );
}
