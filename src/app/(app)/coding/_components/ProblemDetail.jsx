"use client";

// src/app/(app)/coding/_components/ProblemDetail.jsx

import { useState }                                           from "react";
import { Code2, Lightbulb, Eye, EyeOff, Lock, CheckCircle2,
         Terminal, ChevronRight }                             from "lucide-react";
import { cn }                                                 from "@/lib/utils";

const DIFF_STYLE = {
  easy:   "text-emerald-700 bg-emerald-50 border-emerald-200",
  medium: "text-amber-700   bg-amber-50   border-amber-200",
  hard:   "text-rose-700    bg-rose-50    border-rose-200",
};

export default function ProblemDetail({
  problem, lang,
  onMarkSolved, onSolveInEditor, editorOpen, userIsPremium = false,
}) {
  const [showHint,     setShowHint]     = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [marked,       setMarked]       = useState(false);

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 text-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
          <Code2 size={28} className="text-slate-400" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-sm font-bold text-slate-700"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            Select a problem
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
            Choose from the list on the left to see description
          </p>
        </div>
      </div>
    );
  }

  const handleMarkSolved = () => {
    setMarked(true);
    onMarkSolved?.();
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-5 space-y-5">

        {/* Header */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <span className={cn(
              "text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border capitalize",
              DIFF_STYLE[problem.difficulty] ?? "text-slate-600 bg-slate-100 border-slate-200"
            )}>
              {problem.difficulty}
            </span>
            {problem.isPremium && (
              <span className="flex items-center gap-1 text-[11px] font-mono font-semibold
                text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
                <Lock size={9} /> Premium
              </span>
            )}
            {marked && (
              <span className="flex items-center gap-1 text-[11px] font-mono font-semibold
                text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2.5 py-1">
                <CheckCircle2 size={9} /> Solved
              </span>
            )}
          </div>

          <h2 className="text-lg font-bold text-slate-900 leading-snug"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            {problem.title}
          </h2>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <p className="text-sm text-slate-600 leading-relaxed">{problem.description}</p>
        </div>

        {/* Examples */}
        {problem.examples?.length > 0 && (
          <div className="space-y-2">
            <p className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Examples
            </p>
            <div className="space-y-2">
              {problem.examples.map((ex, i) => (
                <div key={i} className="bg-slate-900 rounded-xl overflow-hidden">
                  <div className="px-3 py-1.5 bg-slate-800/60 border-b border-slate-700/40">
                    <span className="text-[10px] font-mono text-slate-500">Example {i+1}</span>
                  </div>
                  <div className="p-3 font-mono text-xs space-y-1">
                    <p><span className="text-slate-500">Input:  </span><span className="text-teal-300">{ex.input}</span></p>
                    <p><span className="text-slate-500">Output: </span><span className="text-emerald-300">{ex.output}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hint */}
        {problem.hint && (
          <div className="space-y-2">
            <button onClick={() => setShowHint(p=>!p)}
              className="flex items-center gap-2 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors">
              <Lightbulb size={13} />
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
            {showHint && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5">
                <p className="text-xs text-amber-700 leading-relaxed">💡 {problem.hint}</p>
              </div>
            )}
          </div>
        )}

        {/* Solution */}
        {problem.solution && (
          <div className="space-y-2">
            <button onClick={() => setShowSolution(p=>!p)}
              className="flex items-center gap-2 text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors">
              {showSolution ? <EyeOff size={13} /> : <Eye size={13} />}
              {showSolution ? "Hide Solution" : "View Solution"}
            </button>
            {showSolution && (
              <div className="bg-[#0F1117] rounded-xl overflow-hidden">
                <div className="px-4 py-2 bg-slate-800/60 border-b border-slate-700/40 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono text-slate-500">solution · {lang}</span>
                </div>
                <pre className="p-4 text-[12px] font-mono text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {problem.solution}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* ── Action buttons ── */}
        {(!problem.isPremium || userIsPremium) && (
          <div className="space-y-2 pt-2">

            {/* Solve in Editor — opens the code editor */}
            {!editorOpen ? (
              <button onClick={onSolveInEditor}
                className="flex items-center justify-center gap-2 w-full
                  bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm
                  py-3 rounded-xl transition-all">
                <Terminal size={15} />
                Solve in Editor
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 w-full
                bg-teal-50 border border-teal-200 text-teal-700 font-semibold text-sm
                py-3 rounded-xl">
                <Terminal size={15} />
                Editor is open →
              </div>
            )}

            {/* Mark as Solved */}
            {!marked ? (
              <button onClick={handleMarkSolved}
                className="flex items-center justify-center gap-2 w-full
                  border border-slate-200 hover:border-teal-300 hover:bg-teal-50
                  text-slate-600 hover:text-teal-700 font-semibold text-sm
                  py-2.5 rounded-xl transition-all">
                <CheckCircle2 size={15} />
                Mark as Solved
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 w-full
                bg-teal-50 border border-teal-200 text-teal-600 font-semibold text-sm
                py-2.5 rounded-xl">
                <CheckCircle2 size={15} className="fill-teal-100" />
                Solved ✓
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}