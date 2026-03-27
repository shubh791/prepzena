"use client";

// ─────────────────────────────────────────────
//  src/components/home/HeroSection.jsx
// ─────────────────────────────────────────────

import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Zap, Star } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();

  // ── Smooth scroll helper ───────────────────
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#FAFAF8]">

      {/* ── Dot-grid background ── */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Gradient blobs ── */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-teal-100 via-emerald-50 to-transparent opacity-70 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-amber-50 via-orange-50 to-transparent opacity-60 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* ── LEFT: Copy ── */}
        <div className="space-y-8">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-mono font-medium tracking-wider uppercase">
            <Zap size={12} className="text-teal-500" />
            Free to start · No credit card
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-slate-900"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Learn to Code{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-teal-600">Smarter</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-teal-100 rounded-sm -z-0" />
            </span>
            {" "}& Faster
          </h1>

          {/* ── UPDATED DESCRIPTION ── */}
          <p className="text-lg text-slate-500 leading-relaxed max-w-md">
            Structured notes in plain language, hands-on coding exercises, and
            real university PYQs — start free, then unlock everything with the{" "}
            <span className="text-slate-700 font-semibold">Premium Plan at ₹99</span>.
            One-time payment. Lifetime access.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["bg-teal-400", "bg-violet-400", "bg-amber-400", "bg-rose-400"].map((c, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                >
                  {["A", "B", "R", "S"][i]}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-slate-500">
              <strong className="text-slate-700">2,400+</strong> students learning
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => router.push("/sign-up")}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-teal-200 hover:shadow-teal-300 hover:-translate-y-0.5 text-sm"
            >
              Start Learning Free
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("features")}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-7 py-3.5 rounded-xl border border-slate-200 transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              <BookOpen size={15} />
              See Features
            </button>
          </div>

        </div>

        {/* ── RIGHT: Floating UI cards ── */}
        <div className="relative hidden lg:block h-[480px]">

          {/* Code card */}
          <div className="absolute top-0 left-8 right-0 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs font-mono text-slate-400">arrays.py — Topic 3</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed bg-[#FAFAF8]">
              <div>
                <span className="text-violet-500">def</span>{" "}
                <span className="text-teal-600">two_sum</span>
                <span className="text-slate-700">(nums, target):</span>
              </div>
              <div className="pl-4 mt-1">
                <span className="text-violet-500">seen</span>{" "}
                <span className="text-slate-500">=</span>{" "}
                <span className="text-amber-600">{"{}"}</span>
              </div>
              <div className="pl-4">
                <span className="text-slate-400"># hash map approach</span>
              </div>
              <div className="pl-4">
                <span className="text-violet-500">for</span>{" "}
                <span className="text-slate-700">i, n </span>
                <span className="text-violet-500">in</span>{" "}
                <span className="text-teal-600">enumerate</span>
                <span className="text-slate-700">(nums):</span>
              </div>
              <div className="pl-8">
                <span className="text-violet-500">if</span>{" "}
                <span className="text-slate-700">target - n </span>
                <span className="text-violet-500">in</span>{" "}
                <span className="text-slate-700">seen:</span>
              </div>
              <div className="pl-12">
                <span className="text-violet-500">return</span>{" "}
                <span className="text-slate-700">[seen[target-n], i]</span>
              </div>
            </div>
          </div>

          {/* Quiz score card */}
          <div className="absolute bottom-16 left-0 w-56 bg-white rounded-xl shadow-lg border border-slate-100 p-4">
            <p className="text-xs font-mono text-slate-400 mb-2">Quiz Score</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-teal-600" style={{ fontFamily: "'Sora', sans-serif" }}>
                8/10
              </span>
              <span className="text-xs text-emerald-500 font-semibold mb-1">↑ +2 today</span>
            </div>
            <div className="mt-3 flex gap-1">
              {[1,1,1,1,1,1,1,1,0,0].map((v, i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full ${v ? "bg-teal-500" : "bg-slate-200"}`} />
              ))}
            </div>
          </div>

          {/* Streak badge */}
          <div className="absolute bottom-4 right-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-xs text-amber-600 font-mono font-medium">Day Streak</p>
              <p className="text-xl font-bold text-amber-700" style={{ fontFamily: "'Sora', sans-serif" }}>12</p>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-slate-400" />
        <p className="text-xs font-mono text-slate-400 tracking-widest uppercase">Scroll</p>
      </div>

    </section>
  );
}