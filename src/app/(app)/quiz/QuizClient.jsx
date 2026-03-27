"use client";
// src/app/(app)/quiz/QuizClient.jsx
// Client-side filter/sort wrapper for the quiz page

import { useState, useMemo } from "react";
import Link                  from "next/link";
import {
  Brain, Lock, CheckCircle2, ChevronRight,
  Trophy, Zap, Crown, BookOpen,
  Target, ArrowRight, Clock, Filter,
}                            from "lucide-react";
import { cn }                from "@/lib/utils";

const TC = {
  teal:    { badge:"text-teal-700   bg-teal-50   border-teal-200",   bar:"bg-teal-500",    glow:"shadow-teal-100"   },
  violet:  { badge:"text-violet-700 bg-violet-50 border-violet-200", bar:"bg-violet-500",  glow:"shadow-violet-100" },
  amber:   { badge:"text-amber-700  bg-amber-50  border-amber-200",  bar:"bg-amber-500",   glow:"shadow-amber-100"  },
  rose:    { badge:"text-rose-700   bg-rose-50   border-rose-200",   bar:"bg-rose-500",    glow:"shadow-rose-100"   },
  blue:    { badge:"text-blue-700   bg-blue-50   border-blue-200",   bar:"bg-blue-500",    glow:"shadow-blue-100"   },
  emerald: { badge:"text-emerald-700 bg-emerald-50 border-emerald-200", bar:"bg-emerald-500", glow:"shadow-emerald-100"},
  indigo:  { badge:"text-indigo-700 bg-indigo-50 border-indigo-200", bar:"bg-indigo-500",  glow:"shadow-indigo-100" },
};

function ScoreRing({ score }) {
  const color  = score >= 80 ? "#14b8a6" : score >= 65 ? "#f59e0b" : "#f43f5e";
  const r = 18, c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div className="relative w-12 h-12 shrink-0">
      <svg viewBox="0 0 44 44" className="w-12 h-12 -rotate-90">
        <circle cx="22" cy="22" r={r} strokeWidth="4" fill="none" className="stroke-slate-100"/>
        <circle cx="22" cy="22" r={r} strokeWidth="4" fill="none"
          stroke={color} strokeDasharray={`${dash} ${c}`} strokeLinecap="round"/>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold"
        style={{ color }}>{score}%</span>
    </div>
  );
}

const FILTERS = ["All", "Unlocked", "Passed", "Retry"];

export default function QuizClient({ topicQuizzes, streak }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Flatten all items for filtering
  const filtered = useMemo(() => {
    return topicQuizzes.map(topic => {
      let items = [...topic.items];

      // Sort: unlocked first, locked last
      items.sort((a, b) => {
        if (a.locked === b.locked) return 0;
        return a.locked ? 1 : -1;
      });

      // Apply filter
      if (activeFilter === "Unlocked") items = items.filter(i => !i.locked && !i.premiumLocked);
      if (activeFilter === "Passed")   items = items.filter(i => (i.score ?? 0) >= 65);
      if (activeFilter === "Retry")    items = items.filter(i => i.score !== null && i.score < 65);

      return { ...topic, items };
    }).filter(t => t.items.length > 0);
  }, [topicQuizzes, activeFilter]);

  const allItems     = topicQuizzes.flatMap(t => t.items);
  const bestScore    = allItems.length
    ? Math.max(...allItems.map(i => i.score ?? 0))
    : 0;
  const totalPassed  = allItems.filter(i => (i.score ?? 0) >= 65).length;

  return (
    <div className="space-y-8">
      {/* ── Quick Stats banner ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:"Day Streak",   value: streak,       Icon:Zap,    bg:"bg-amber-50",  border:"border-amber-100",  text:"text-amber-600"  },
          { label:"Total Passed", value: totalPassed,  Icon:Trophy, bg:"bg-teal-50",   border:"border-teal-100",   text:"text-teal-600"   },
          { label:"Best Score",   value: `${bestScore}%`, Icon:Target, bg:"bg-violet-50", border:"border-violet-100", text:"text-violet-600" },
        ].map(({ label, value, Icon, bg, border, text }) => (
          <div key={label} className={`bg-white border ${border} rounded-2xl p-4 text-center`}>
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${bg} ${text} mb-2`}>
              <Icon size={16} />
            </div>
            <p className="text-xl font-bold text-slate-900"
              style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>{value}</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} className="text-slate-400 shrink-0" />
        {FILTERS.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            aria-label={`Filter: ${f}`}
            aria-pressed={activeFilter === f}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all",
              activeFilter === f
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
            )}>
            {f}
          </button>
        ))}
      </div>

      {/* ── Quiz sections by topic ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <Brain size={36} className="mx-auto mb-3 text-slate-300" />
          <p className="text-sm text-slate-400">No quizzes match this filter.</p>
        </div>
      ) : filtered.map(topic => {
        const tc          = TC[topic.color] ?? TC.teal;
        const topicDone   = topic.items.filter(i => i.score !== null).length;
        const topicPassed = topic.items.filter(i => (i.score ?? 0) >= 65).length;

        return (
          <div key={topic.slug} className="space-y-4">
            {/* Topic header */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl border ${tc.badge}`}>
                {topic.icon ?? "📚"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-slate-900"
                    style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
                    {topic.title}
                  </h2>
                  <span className="text-[10px] font-mono text-slate-400">
                    {topicDone}/{topic.items.length} attempted · {topicPassed} passed
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden max-w-32">
                    <div className={`h-full ${tc.bar} rounded-full`}
                      style={{ width:`${topic.items.length ? Math.round(topicDone/topic.items.length*100) : 0}%` }}/>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {topic.items.length ? Math.round(topicDone/topic.items.length*100) : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Quiz cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topic.items.map(({ note, noteDone, score, locked, premiumLocked, quizCount }) => {
                const passed    = (score ?? 0) >= 65;
                const timeEst   = Math.ceil((quizCount * 30) / 60); // minutes

                if (locked) return (
                  <div key={note.id}
                    className="bg-white border border-slate-100 rounded-2xl p-5 opacity-70">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${tc.badge}`}>
                        {topic.icon} {topic.title}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400
                        bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5">
                        <Lock size={9}/> Locked
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-500 mb-1 line-clamp-2"
                      style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
                      {note.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-mono">
                      <span>{quizCount} questions</span>
                      <span className="flex items-center gap-1"><Clock size={10}/> ~{timeEst}m</span>
                    </div>
                    <Link href={`/notes/${note.slug}`}
                      aria-label={`Read note to unlock quiz: ${note.title}`}
                      className="flex items-center gap-1.5 text-xs font-semibold
                        text-teal-600 hover:text-teal-700 transition-colors">
                      <BookOpen size={11}/> Read note to unlock <ChevronRight size={11}/>
                    </Link>
                  </div>
                );

                return (
                  <Link key={note.id}
                    href={premiumLocked ? "/pricing" : `/notes/${note.slug}`}
                    aria-label={`${note.title} quiz${score !== null ? ` — last score: ${score}%` : ""}`}
                    className={`group relative bg-white border border-slate-100 rounded-2xl p-5
                      hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${tc.glow}`}>

                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${tc.badge}`}>
                        {topic.icon} {topic.title}
                      </span>
                      {score !== null ? (
                        <ScoreRing score={score}/>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-violet-700
                          bg-violet-50 border border-violet-200 rounded-full px-2 py-0.5">
                          Ready ✓
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-800 mb-1 line-clamp-2"
                      style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
                      {note.title}
                    </h3>

                    {score !== null && (
                      <div className="my-2.5">
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${passed ? "bg-teal-500" : "bg-rose-400"}`}
                            style={{ width:`${score}%` }}/>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-3">
                      <span className="flex items-center gap-1">
                        <Brain size={11}/> {quizCount} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11}/> ~{timeEst}m
                      </span>
                      {passed && (
                        <span className="flex items-center gap-1 text-teal-600 font-bold">
                          <Trophy size={11}/> Passed
                        </span>
                      )}
                      {score !== null && !passed && (
                        <span className="text-rose-500 font-semibold">Retry?</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                      <span className="text-[10px] font-mono text-slate-400">
                        {score === null ? "Not attempted" : `Last: ${score}%`}
                      </span>
                      <span className={`flex items-center gap-1 text-xs font-bold
                        ${score === null ? "text-violet-600" : passed ? "text-teal-600" : "text-rose-500"}`}>
                        {score === null ? "Start Quiz" : passed ? "Retake" : "Retry"} <ArrowRight size={11}/>
                      </span>
                    </div>

                    {premiumLocked && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] rounded-2xl
                        flex flex-col items-center justify-center gap-2 z-10">
                        <Crown size={20} className="text-amber-500"/>
                        <p className="text-xs font-bold text-slate-700">Premium</p>
                        <p className="text-[10px] text-teal-600 font-semibold">Unlock All Access · ₹99</p>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
