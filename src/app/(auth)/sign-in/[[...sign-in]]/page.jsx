"use client";

// ─────────────────────────────────────────────
//  src/app/(auth)/sign-in/[[...sign-in]]/page.jsx
//
//  The root layout already provides Navbar (64px)
//  So we use calc(100vh - 64px) for full bleed
//
//  Left panel:  dark code editor visual
//  Right panel: Clerk SignIn — always visible
// ─────────────────────────────────────────────

import { SignIn } from "@clerk/nextjs";

const PERKS = [
  { icon: "📝", text: "Notes in plain, exam-ready language"   },
  { icon: "💻", text: "Coding exercises after every topic"    },
  { icon: "🎓", text: "Real university PYQs + solutions"      },
  { icon: "🔓", text: "Premium plan — ₹99 one-time, lifetime access" },
];

export default function SignInPage() {
  return (
    <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>

      {/* ─────────────────────────────────────
          LEFT PANEL — dark code visual
          Hidden below lg breakpoint
      ───────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-slate-950 flex-col">

        {/* Grid background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(20,184,166,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(20,184,166,1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Glow blobs */}
          <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl"
            style={{ background: "rgba(20,184,166,0.08)" }} />
          <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full blur-3xl"
            style={{ background: "rgba(139,92,246,0.08)" }} />
        </div>

        {/* Floating code card — centred */}
        <div className="absolute inset-0 flex items-center justify-center px-10">
          <div className="w-full max-w-sm">

            {/* Code editor */}
            <div className="bg-slate-900/90 border border-slate-700/40 rounded-2xl
              overflow-hidden shadow-2xl shadow-black/50">
              {/* Chrome bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-800/60
                border-b border-slate-700/30">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-[11px] font-mono text-slate-500">
                  binary_search.py
                </span>
              </div>
              {/* Code lines */}
              <div className="p-5 font-mono text-[12.5px] leading-[1.9] select-none">
                <p>
                  <span className="text-violet-400">def </span>
                  <span className="text-teal-300">binary_search</span>
                  <span className="text-slate-300">(arr, target):</span>
                </p>
                <p className="pl-5">
                  <span className="text-slate-400">lo, hi </span>
                  <span className="text-slate-500">= </span>
                  <span className="text-amber-300">0</span>
                  <span className="text-slate-500">, </span>
                  <span className="text-teal-300">len</span>
                  <span className="text-slate-400">(arr) </span>
                  <span className="text-slate-500">- </span>
                  <span className="text-amber-300">1</span>
                </p>
                <p className="pl-5 mt-1">
                  <span className="text-violet-400">while </span>
                  <span className="text-slate-300">lo &lt;= hi:</span>
                </p>
                <p className="pl-10">
                  <span className="text-slate-400">mid </span>
                  <span className="text-slate-500">= </span>
                  <span className="text-slate-400">(lo + hi) </span>
                  <span className="text-slate-500">// </span>
                  <span className="text-amber-300">2</span>
                </p>
                <p className="pl-10">
                  <span className="text-violet-400">if </span>
                  <span className="text-slate-300">arr[mid] == target:</span>
                </p>
                <p className="pl-16">
                  <span className="text-violet-400">return </span>
                  <span className="text-slate-300">mid</span>
                </p>
                <p className="pl-10">
                  <span className="text-violet-400">elif </span>
                  <span className="text-slate-300">arr[mid] &lt; target:</span>
                </p>
                <p className="pl-16">
                  <span className="text-slate-400">lo </span>
                  <span className="text-slate-500">= </span>
                  <span className="text-slate-400">mid + </span>
                  <span className="text-amber-300">1</span>
                </p>
                <p className="pl-10">
                  <span className="text-violet-400">else</span>
                  <span className="text-slate-300">:</span>
                </p>
                <p className="pl-16">
                  <span className="text-slate-400">hi </span>
                  <span className="text-slate-500">= </span>
                  <span className="text-slate-400">mid </span>
                  <span className="text-slate-500">- </span>
                  <span className="text-amber-300">1</span>
                </p>
                <p className="pl-5 mt-1">
                  <span className="text-violet-400">return </span>
                  <span className="text-rose-400">-1</span>
                </p>
              </div>
              {/* Status bar */}
              <div className="px-5 py-2.5 bg-teal-500/10 border-t border-slate-700/30
                flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-[11px] font-mono text-teal-400">
                  O(log n) — optimal
                </span>
              </div>
            </div>

            {/* Floating streak badge */}
            <div className="absolute -bottom-3 right-8 bg-white rounded-xl shadow-xl
              px-3.5 py-2.5 flex items-center gap-2.5 border border-slate-100">
              <span className="text-xl">🔥</span>
              <div>
                <p className="text-[10px] text-slate-400 font-mono leading-none mb-0.5">
                  Day streak
                </p>
                <p
                  className="text-sm font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-sora,'Sora',sans-serif)" }}
                >
                  14 days
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom copy */}
        <div className="absolute bottom-0 left-0 right-0 p-10
          bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent">
          <p className="text-[10px] font-mono tracking-widest uppercase text-teal-500 mb-2">
            Welcome back
          </p>
          <h2
            className="text-2xl font-bold text-white leading-snug mb-2"
            style={{ fontFamily: "var(--font-sora,'Sora',sans-serif)" }}
          >
            Continue where
            <br />
            <span className="text-teal-400">you left off</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-xs">
            Your notes, progress, and unlocks are waiting.
          </p>
        </div>

      </div>

      {/* ─────────────────────────────────────
          RIGHT PANEL — Clerk SignIn form
          flex-1 so it takes full width on mobile
      ───────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center
        bg-white px-6 sm:px-12 py-10 overflow-y-auto">

        <div className="w-full max-w-[400px]">

          {/* Header */}
          <div className="mb-7">
            <h1
              className="text-2xl font-bold text-slate-900 mb-1.5"
              style={{ fontFamily: "var(--font-sora,'Sora',sans-serif)" }}
            >
              Sign in to Prepzena
            </h1>
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <a
                href="/sign-up"
                className="text-teal-600 font-semibold hover:text-teal-700"
              >
                Create one free →
              </a>
            </p>
          </div>

          {/* Mobile perks (lg panel hidden on small screens) */}
          <div className="lg:hidden grid grid-cols-2 gap-2 mb-7">
            {PERKS.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-slate-50 rounded-xl p-3"
              >
                <span className="text-sm mt-0.5">{p.icon}</span>
                <p className="text-[11px] text-slate-500 leading-snug">{p.text}</p>
              </div>
            ))}
          </div>

          {/* ── Clerk SignIn — always visible ── */}
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/home"
            appearance={{
              elements: {
                // Remove Clerk's own card wrapper
                card:                          "shadow-none bg-transparent p-0 w-full",
                headerTitle:                   "hidden",
                headerSubtitle:                "hidden",
                logoBox:                       "hidden",
                // Primary button — teal
                formButtonPrimary:
                  "w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl py-3 transition-all shadow-sm shadow-teal-100 hover:-translate-y-px normal-case",
                // Inputs
                formFieldInput:
                  "w-full border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all",
                formFieldLabel:                "text-sm font-medium text-slate-700 mb-1",
                // Links
                footerActionLink:              "text-teal-600 font-semibold hover:text-teal-700",
                formResendCodeLink:            "text-teal-600 font-semibold",
                identityPreviewEditButton:     "text-teal-600 font-semibold text-sm",
                // Divider
                dividerLine:                   "bg-slate-200",
                dividerText:                   "text-xs text-slate-400 font-mono px-2",
                // Social buttons
                socialButtonsBlockButton:
                  "w-full border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition-colors mb-2",
                socialButtonsBlockButtonText:  "text-sm font-medium text-slate-700",
                socialButtonsBlockButtonArrow: "hidden",
                // Error states
                alertText:                     "text-sm text-rose-600",
                formFieldErrorText:            "text-xs text-rose-500 mt-1",
                // Hide Clerk's own footer (we have our own above)
                footer:                        "hidden",
              },
            }}
          />

        </div>
      </div>

    </div>
  );
}