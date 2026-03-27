"use client";

/**
 * ─────────────────────────────────────────────────────────────
 *  page.jsx  (Marketing Landing Page)
 *  Route: src/app/(marketing)/page.jsx
 *
 *  - Redirects signed-in users to /home (safe, no loop)
 *  - Renders all marketing sections in order
 * ─────────────────────────────────────────────────────────────
 */

import HeroSection   from "@/components/home/HeroSection";
import Features      from "@/components/home/Features";
import HowItWorks    from "@/components/home/HowItWorks";
import CTASection    from "@/components/home/CTASection";

import { useUser }   from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  /* ── Safe redirect — only fires once, no loop ── */
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/home");
    }
  }, [isLoaded, isSignedIn]);

  /* ── Show nothing while Clerk hydrates or while redirecting ── */
  if (!isLoaded || isSignedIn) return null;

  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <Features />
      <HowItWorks />
      <CTASection />
    </main>
  );
}