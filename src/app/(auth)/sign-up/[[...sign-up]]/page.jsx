"use client";

// ─────────────────────────────────────────────
//  src/app/(auth)/sign-up/[[...sign-up]]/page.jsx
//
//  Left panel:  dark dashboard progress visual
//  Right panel: Clerk SignUp — always visible
// ─────────────────────────────────────────────

import { SignUp } from "@clerk/nextjs";

const PERKS = [
  { icon: "📝", text: "Notes in plain, exam-ready language"   },
  { icon: "💻", text: "Coding exercises after every topic"    },
  { icon: "🎓", text: "Real university PYQs + solutions"      },
  { icon: "🔓", text: "Premium plan — ₹99 one-time, lifetime access" },
];

const TOPICS = [
  { name: "Arrays & Hashing",  pct: 85, color: "bg-teal-500"   },
  { name: "Binary Search",     pct: 60, color: "bg-violet-500" },
  { name: "Operating Systems", pct: 40, color: "bg-amber-500"  },
  { name: "DBMS Basics",       pct: 22, color: "bg-rose-500"   },
];

export default function SignUpPage() {
  return (
    <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>

      {/* ─────────────────────────────────────
          LEFT PANEL — dashboard mock visual
          Hidden below lg
      ───────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col"
        style={{ background: "#0F1117" }}>

        {/* Dot grid */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Glow blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(20,184,166,0.07)" }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl"
            style={{ background: "rgba(139,92,246,0.07)" }} />
        </div>

        {/* Dashboard card — centred */}
        <div className="absolute inset-0 flex items-center justify-center px-10">
          <div className="w-full max-w-sm relative">

            {/* Floating unlock badge — top right */}
            <div className="absolute -top-5 -right-4 z-10 bg-white rounded-xl
              shadow-xl px-3 py-2.5 flex items-center gap-2 border border-slate-100">
              <span className="text-lg">⭐</span>
              <div>
                <p className="text-[10px] text-slate-400 font-mono leading-none mb-0.5">
                  Just unlocked
                </p>
                <p className="text-xs font-bold text-slate-900">Trees &amp; Graphs</p>
              </div>
            </div>

            {/* Main dashboard card */}
            <div className="bg-slate-900/80 backdrop-blur border border-slate-700/30
              rounded-2xl overflow-hidden shadow-2xl shadow-black/50">

              {/* Card header */}
              <div className="px-5 pt-5 pb-4 border-b border-slate-800/60">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Your Progress
                  </p>
                  <span className="text-[10px] font-mono text-teal-400
                    bg-teal-500/10 px-2 py-0.5 rounded-full">
                    Week 3
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: "var(--font-sora,'Sora',sans-serif)" }}
                  >
                    68%
                  </span>
                  <span className="text-xs text-emerald-400 font-mono mb-1">
                    ↑ +12% this week
                  </span>
                </div>
              </div>

              {/* Topic bars */}
              <div className="px-5 py-4 space-y-4">
                {TOPICS.map((t, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[11px] text-slate-400 font-mono">{t.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{t.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${t.color}`}
                        style={{ width: `${t.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom stat strip */}
              <div className="px-5 pb-5 grid grid-cols-3 gap-2">
                {[
                  { val: "12",   sub: "Day streak 🔥" },
                  { val: "8/10", sub: "Last quiz"     },
                  { val: "5",    sub: "Unlocked"      },
                ].map((s, i) => (
                  <div key={i}
                    className="bg-slate-800/50 rounded-xl p-2.5 text-center">
                    <p
                      className="text-sm font-bold text-white leading-none mb-1"
                      style={{ fontFamily: "var(--font-sora,'Sora',sans-serif)" }}
                    >
                      {s.val}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom copy */}
        <div className="absolute bottom-0 left-0 right-0 p-10"
          style={{ background: "linear-gradient(to top, #0F1117 40%, transparent)" }}>
          <p className="text-[10px] font-mono tracking-widest uppercase text-teal-500 mb-2">
            Start for free
          </p>
          <h2
            className="text-2xl font-bold text-white leading-snug mb-2"
            style={{ fontFamily: "var(--font-sora,'Sora',sans-serif)" }}
          >
            Study smarter,
            <br />
            <span className="text-teal-400">not harder</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-xs">
            Join 2,400+ students already using Prepzena to ace their exams.
          </p>
        </div>

      </div>

      {/* ─────────────────────────────────────
          RIGHT PANEL — Clerk SignUp form
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
              Create your account
            </h1>
            <p className="text-sm text-slate-500">
              Already have one?{" "}
              <a
                href="/sign-in"
                className="text-teal-600 font-semibold hover:text-teal-700"
              >
                Sign in →
              </a>
            </p>
          </div>

          {/* Mobile perks */}
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

          {/* ── Clerk SignUp ── */}
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl="/home"
            appearance={{
              elements: {
                card:                          "shadow-none bg-transparent p-0 w-full",
                headerTitle:                   "hidden",
                headerSubtitle:                "hidden",
                logoBox:                       "hidden",
                formButtonPrimary:
                  "w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl py-3 transition-all shadow-sm shadow-teal-100 hover:-translate-y-px normal-case",
                formFieldInput:
                  "w-full border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all",
                formFieldLabel:                "text-sm font-medium text-slate-700 mb-1",
                footerActionLink:              "text-teal-600 font-semibold hover:text-teal-700",
                formResendCodeLink:            "text-teal-600 font-semibold",
                identityPreviewEditButton:     "text-teal-600 font-semibold text-sm",
                dividerLine:                   "bg-slate-200",
                dividerText:                   "text-xs text-slate-400 font-mono px-2",
                socialButtonsBlockButton:
                  "w-full border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition-colors mb-2",
                socialButtonsBlockButtonText:  "text-sm font-medium text-slate-700",
                socialButtonsBlockButtonArrow: "hidden",
                alertText:                     "text-sm text-rose-600",
                formFieldErrorText:            "text-xs text-rose-500 mt-1",
                footer:                        "hidden",
              },
            }}
          />

        </div>
      </div>

    </div>
  );
}