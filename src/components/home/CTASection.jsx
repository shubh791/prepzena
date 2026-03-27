"use client";

// ─────────────────────────────────────────────
//  src/components/home/CTASection.jsx
//  id="pricing" — linked from navbar anchor
// ─────────────────────────────────────────────

import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

const STATS = [
  { value: "50+",    label: "Topics covered"  },
  { value: "2,400+", label: "Active students"  },
  { value: "₹99",    label: "Lifetime access"  },
];

export default function CTASection() {
  const router = useRouter();

  return (
    // ── id links from navbar "Pricing" anchor ─
    <section id="pricing" className="relative bg-slate-900 py-24 px-6 overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-teal-500 opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-violet-500 opacity-10 rounded-full blur-3xl" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #94A3B8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-full px-4 py-1.5 text-xs font-mono font-medium tracking-wider uppercase">
          <Zap size={12} />
          Free to start — unlock only what you need
        </div>

        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Ready to Study the{" "}
          <span className="text-teal-400">Smart Way?</span>
        </h2>

        {/* ── UPDATED DESCRIPTION ── */}
        <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          Explore all free content first. When you're ready to go deeper —
          unlock everything with the Premium Plan for just ₹99 one-time.
          No subscriptions, no renewals. Lifetime access.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-center"
            >
              <p
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {s.value}
              </p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => router.push("/sign-up")}
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-teal-500/20 hover:-translate-y-0.5 text-sm"
          >
            Create Free Account
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => router.push("/sign-in")}
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm"
          >
            Already have an account? Sign in
          </button>
        </div>

        {/* Trust note */}
        <p className="flex items-center justify-center gap-2 text-slate-500 text-xs font-mono">
          <ShieldCheck size={14} className="text-teal-600" />
          No spam · No hidden fees · Pay only for what you unlock
        </p>

      </div>
    </section>
  );
}