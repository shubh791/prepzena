"use client";

// ─────────────────────────────────────────────
//  src/components/home/Features.jsx
//  id="features" — linked from navbar + hero
// ─────────────────────────────────────────────

import { BookOpen, Brain, FileText, Trophy, Code2, Unlock } from "lucide-react";

const FEATURES = [
  {
    icon: BookOpen,
    color: "bg-teal-50 text-teal-600 border-teal-100",
    accent: "border-t-teal-500",
    title: "Smart Notes",
    desc: "Every topic explained in plain English — no jargon, no fluff. Built for fast understanding.",
  },
  {
    icon: Code2,
    color: "bg-violet-50 text-violet-600 border-violet-100",
    accent: "border-t-violet-500",
    title: "Coding Exercises",
    desc: "Practice problems after every concept, with hints and step-by-step solutions.",
  },
  {
    icon: Brain,
    color: "bg-amber-50 text-amber-600 border-amber-100",
    accent: "border-t-amber-500",
    title: "Adaptive Quizzes",
    desc: "Test yourself with topic quizzes. Unlock the full question bank for any topic individually.",
  },
  {
    icon: FileText,
    color: "bg-rose-50 text-rose-600 border-rose-100",
    accent: "border-t-rose-500",
    title: "University PYQs",
    desc: "Previous year questions from top universities — unlock detailed solutions per paper.",
  },
  {
    icon: Trophy,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    accent: "border-t-emerald-500",
    title: "Progress Tracking",
    desc: "See your streak, quiz scores, and topics mastered — all in one dashboard.",
  },
  {
    icon: Unlock,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    accent: "border-t-indigo-500",
    title: "One-time Premium",
    desc: "Unlock all notes, quizzes, PYQ solutions, and FAANG interview questions with a single ₹99 payment. No subscriptions, no renewals — lifetime access.",
  },
];

export default function Features() {
  return (
    // ── id links from navbar "Features" anchor ─
    <section id="features" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16 space-y-3">
          <span className="inline-block text-xs font-mono font-medium tracking-widest uppercase text-teal-600 bg-teal-50 border border-teal-100 rounded-full px-4 py-1.5">
            What you get
          </span>
          <h2
            className="text-4xl font-bold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Everything You Need to Study Efficiently
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
            Prepzena combines notes, exercises, quizzes, and PYQs into one seamless
            experience — free to explore, unlock everything with one ₹99 lifetime payment.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`group relative bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-t-4 ${f.accent}`}
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${f.color} mb-5`}>
                  <Icon size={20} />
                </div>
                <h3
                  className="text-base font-semibold text-slate-800 mb-2"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}