"use client";

// ─────────────────────────────────────────────
//  src/components/home/HowItWorks.jsx
//  id="how-it-works" — linked from navbar anchor
// ─────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-100",
    title: "Pick a Topic",
    desc: "Browse structured notes for every coding subject — Arrays, Trees, OS, DBMS, and more — written in plain language.",
    tag: "Start here",
  },
  {
    number: "02",
    color: "text-violet-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
    title: "Read & Practice",
    desc: "Each note is followed by hands-on exercises. Write code, get instant feedback, and see solutions when you're stuck.",
    tag: "Build skills",
  },
  {
    number: "03",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    title: "Test Yourself",
    desc: "Take topic quizzes and attempt real PYQs from universities. Track what you know and what needs more revision.",
    tag: "Lock it in",
  },
  {
    number: "04",
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
    title: "Unlock What You Need",
    tag: "Go deeper",
    // ── UPDATED DESC ──
    desc: "Ready to go all-in? Unlock everything — all notes, quizzes, PYQ solutions and FAANG questions — with one ₹99 payment. Lifetime access, no subscriptions.",
  },
];

export default function HowItWorks() {
  return (
    // ── id links from navbar "How it works" anchor ─
    <section id="how-it-works" className="bg-[#F8F7F4] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16 space-y-3">
          <span className="inline-block text-xs font-mono font-medium tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5">
            How it works
          </span>
          <h2
            className="text-4xl font-bold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Four Steps to Exam Confidence
          </h2>
          <p className="text-slate-500 max-w-md mx-auto text-base">
            A proven flow that takes you from zero to ready — in the least time possible.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-teal-200 via-violet-200 to-rose-200" />

          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-2xl border ${step.border} p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
            >
              {/* Step number bubble */}
              <div className={`relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full ${step.bg} border ${step.border} mb-5`}>
                <span className={`font-mono font-bold text-sm ${step.color}`}>
                  {step.number}
                </span>
              </div>

              <span className={`block text-xs font-mono font-medium tracking-wider uppercase ${step.color} mb-2`}>
                {step.tag}
              </span>

              <h3
                className="text-base font-semibold text-slate-800 mb-2"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {step.title}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}