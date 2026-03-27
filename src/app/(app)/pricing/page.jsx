// src/app/(app)/pricing/page.jsx
// Server component — fetches real user plan from DB
// Passes to client PricingClient for interactive payment flow

import { auth }           from "@clerk/nextjs/server";
import { redirect }       from "next/navigation";
import { prisma }         from "@/lib/prisma";
import PricingClient      from "./PricingClient";

export const metadata = {
  title:       "Pricing — Prepzena",
  description: "Unlock premium content. One-time payment, forever access.",
};

export default async function PricingPage({ searchParams }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const p      = await searchParams;
  const status = p?.payment ?? null; // "success" | "failed"

  const dbUser = await prisma.user.findUnique({
    where:  { clerkId: userId },
    select: { isPremium: true, email: true, name: true },
  }).catch(() => null);

  return (
    <PricingClient
      isPremium={dbUser?.isPremium ?? false}
      userEmail={dbUser?.email ?? ""}
      userName={dbUser?.name ?? "Student"}
      paymentStatus={status}
    />
  );
}