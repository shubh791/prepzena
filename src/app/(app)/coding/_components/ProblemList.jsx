"use client";

// src/app/(app)/coding/_components/ProblemList.jsx

import { CheckCircle2, Lock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DIFF_COLOR = {
  easy:   "text-emerald-600",
  medium: "text-amber-600",
  hard:   "text-rose-600",
};

const GROUP_LABEL = {
  basics:       "Basics",
  intermediate: "Intermediate",
  advanced:     "Advanced",
};

export default function ProblemList({
  groups, activeGroup, onGroupChange,
  problems, selected, onSelect,
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Group tabs ── */}
      <div className="flex gap-1.5 p-3 border-b border-slate-100 shrink-0 flex-wrap">
        {groups.map(([key]) => (
          <button
            key={key}
            onClick={() => onGroupChange(key)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all",
              activeGroup === key
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
            )}
          >
            {GROUP_LABEL[key] ?? key}
          </button>
        ))}
      </div>

      {/* ── Problem list ── */}
      <div className="flex-1 overflow-y-auto">
        {problems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-24 gap-1">
            <p className="text-xs text-slate-400">No problems yet</p>
          </div>
        ) : (
          problems.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left",
                "border-b border-slate-50 transition-colors hover:bg-slate-50",
                selected?.id === p.id
                  ? "bg-teal-50 border-l-2 border-l-teal-500"
                  : ""
              )}
            >
              {/* Number */}
              <span className="text-[10px] font-mono text-slate-400 w-5 shrink-0">
                {i + 1}.
              </span>

              {/* Title + difficulty */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {p.solved && (
                    <CheckCircle2 size={11} className="text-teal-500 shrink-0" />
                  )}
                  {p.isPremium && (
                    <Lock size={10} className="text-amber-500 shrink-0" />
                  )}
                  <span className={cn(
                    "text-xs font-medium truncate",
                    selected?.id === p.id ? "text-teal-700" : "text-slate-700"
                  )}>
                    {p.title}
                  </span>
                </div>
                <span className={cn(
                  "text-[10px] font-mono capitalize font-semibold",
                  DIFF_COLOR[p.difficulty] ?? "text-slate-400"
                )}>
                  {p.difficulty}
                </span>
              </div>

              <ChevronRight size={13} className={cn(
                "shrink-0",
                selected?.id === p.id ? "text-teal-500" : "text-slate-300"
              )} />
            </button>
          ))
        )}
      </div>
    </div>
  );
}