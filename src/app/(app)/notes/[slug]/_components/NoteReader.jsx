"use client";
// src/app/(app)/notes/[slug]/_components/NoteReader.jsx
// Mark as Complete ↔ Mark as Incomplete toggle — instant via onMutate
// After completing: fetches streak + shows celebration toast if >= 2

import { useState, useEffect }        from "react";
import Link                            from "next/link";
import { useRouter }                   from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2, Crown, Clock, ChevronLeft,
  ChevronRight, Zap, Brain, Trophy,
  Copy, Check, Code2, MonitorPlay,
  ChevronDown, ChevronUp, ArrowRight, Flame,
  X,
}                                      from "lucide-react";
import { cn }                          from "@/lib/utils";

const LANG_THEME = {
  python:     { bg:"#0d1117", bar:"#1f2937", accent:"#3b82f6", label:"Python",     ext:"py"   },
  javascript: { bg:"#1a1a00", bar:"#2d2d00", accent:"#eab308", label:"JavaScript", ext:"js"   },
  typescript: { bg:"#00001a", bar:"#00002d", accent:"#60a5fa", label:"TypeScript", ext:"ts"   },
  java:       { bg:"#1a0800", bar:"#2d1200", accent:"#f97316", label:"Java",       ext:"java" },
  cpp:        { bg:"#00001a", bar:"#00002d", accent:"#818cf8", label:"C++",        ext:"cpp"  },
  html:       { bg:"#1a0800", bar:"#2d1200", accent:"#f97316", label:"HTML",       ext:"html" },
  css:        { bg:"#00061a", bar:"#000e2d", accent:"#818cf8", label:"CSS",        ext:"css"  },
  sql:        { bg:"#0d0d1a", bar:"#1a1a2d", accent:"#fb923c", label:"SQL",        ext:"sql"  },
  bash:       { bg:"#001a00", bar:"#002800", accent:"#4ade80", label:"Bash",       ext:"sh"   },
};

function CodeBlock({ code, language = "python", filename }) {
  const [copied, setCopied] = useState(false);
  const lang  = (language ?? "python").toLowerCase();
  const theme = LANG_THEME[lang] ?? LANG_THEME.python;
  const file  = filename ?? `example.${theme.ext}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl my-5" style={{ background:theme.bg }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background:theme.bar }}>
        <span className="w-3 h-3 rounded-full bg-rose-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-[11px] font-mono text-slate-400 flex-1 truncate">{file}</span>
        <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full"
          style={{ background:theme.accent+"22", color:theme.accent }}>{theme.label}</span>
        <button onClick={handleCopy} aria-label={copied ? "Copied" : "Copy code"}
          className="flex items-center gap-1 ml-2 text-[10px] font-mono text-slate-500
            hover:text-slate-200 px-2 py-1 rounded-lg hover:bg-white/10 transition-colors">
          {copied ? <Check size={11}/> : <Copy size={11}/>}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-5 m-0 overflow-x-auto text-[13px] font-mono leading-[1.85] text-slate-200 whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

function VSCodeTip({ steps }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-6 bg-blue-50 border border-blue-200 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(p=>!p)} aria-label={open ? "Hide VS Code guide" : "Show VS Code guide"}
        aria-expanded={open}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-blue-100/50 transition-colors">
        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
          <MonitorPlay size={15} className="text-white"/>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-blue-800">Run this in VS Code</p>
          <p className="text-xs text-blue-500">Step-by-step guide</p>
        </div>
        {open ? <ChevronUp size={15} className="text-blue-400"/> : <ChevronDown size={15} className="text-blue-400"/>}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-blue-100">
          <ol className="space-y-3 mt-4">
            {steps.map((step,i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                <span className="text-sm text-blue-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function NoteQuiz({ quizzes, noteId, quizScore }) {
  const [cur, setCur]           = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers]   = useState([]);
  const [submitted, setSubmitted] = useState(!!quizScore);
  const [score, setScore]       = useState(quizScore);
  const queryClient             = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (pct) => {
      const r = await fetch("/api/progress", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ noteId, quizScore:pct }),
      });
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["progress"] }),
  });

  if (!quizzes?.length) return null;

  const q = quizzes[cur];
  const options = Array.isArray(q.options) ? q.options
    : typeof q.options === "string"
      ? (() => { try { return JSON.parse(q.options); } catch { return []; } })()
      : [];
  const isLast = cur === quizzes.length - 1;

  const handleNext = () => {
    if (selected === null) return;
    const next = [...answers, { questionId:q.id, selected }];
    setAnswers(next);
    if (isLast) {
      const correct = next.filter((a,i) => a.selected === quizzes[i].answer).length;
      const pct = Math.round((correct/quizzes.length)*100);
      setScore(pct); setSubmitted(true); mutation.mutate(pct);
    } else { setCur(c=>c+1); setSelected(null); }
  };

  if (submitted) {
    const passed = score >= 65;
    return (
      <div className={cn("rounded-2xl p-6 text-center border",
        passed ? "bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200" : "bg-rose-50 border-rose-200")}>
        <div className={cn("text-4xl font-bold mb-2", passed ? "text-teal-600" : "text-rose-500")}
          style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>{score}%</div>
        <p className="text-sm font-semibold text-slate-700 mb-1">
          {passed ? "🎉 Passed! Next section unlocked." : "📚 Need 65%+ to pass"}
        </p>
        {passed && <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-teal-600 font-semibold"><Trophy size={13}/> Keep it up!</div>}
        {!passed && (
          <button className="mt-3 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-xl"
            onClick={() => { setCur(0); setSelected(null); setAnswers([]); setSubmitted(false); setScore(null); }}>
            Retry Quiz
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-4">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-2"><Brain size={16} className="text-white"/><span className="text-sm font-bold text-white">Section Quiz</span></div>
          <div className="flex gap-1">
            {quizzes.map((_,i) => (
              <div key={i} className={cn("h-1.5 w-6 rounded-full", i<cur?"bg-white":i===cur?"bg-white/60":"bg-white/25")}/>
            ))}
          </div>
        </div>
        <p className="text-xs text-violet-200 font-mono">Q{cur+1}/{quizzes.length} · Pass 65%+ to unlock next section</p>
      </div>
      <div className="p-5 space-y-4">
        <p className="text-sm font-semibold text-slate-800 leading-relaxed">{q.question}</p>
        <div className="space-y-2">
          {options.map((opt,i) => (
            <button key={i} onClick={() => setSelected(i)}
              aria-label={`Option ${String.fromCharCode(65+i)}: ${opt}`}
              className={cn("flex w-full items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all",
                selected===i ? "border-violet-500 bg-violet-50 text-violet-800 font-medium shadow-sm"
                             : "border-slate-200 text-slate-600 hover:border-violet-200 hover:bg-violet-50/30")}>
              <span className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] font-bold shrink-0",
                selected===i ? "border-violet-500 bg-violet-500 text-white" : "border-slate-300 text-slate-400")}>
                {String.fromCharCode(65+i)}
              </span>
              {opt}
            </button>
          ))}
        </div>
        <button onClick={handleNext} disabled={selected===null}
          className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white font-bold text-sm rounded-xl transition-colors">
          {isLast ? "Submit Quiz →" : "Next Question →"}
        </button>
      </div>
    </div>
  );
}

// ── Streak celebration toast ───────────────────────────────────
function StreakToast({ streak, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3
      bg-gradient-to-r from-teal-600 to-amber-500 text-white
      px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20
      animate-in slide-in-from-bottom-4 duration-300 max-w-xs">
      <Flame size={20} className="text-amber-200 shrink-0 animate-pulse" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold leading-tight">🔥 {streak} day streak!</p>
        <p className="text-xs text-white/80 mt-0.5">Keep it up — you&apos;re on a roll!</p>
      </div>
      <button onClick={onClose} aria-label="Dismiss streak toast"
        className="text-white/70 hover:text-white transition-colors shrink-0">
        <X size={16} />
      </button>
    </div>
  );
}

const TC = {
  teal:    { hero:"from-teal-500   to-emerald-500" },
  violet:  { hero:"from-violet-500 to-purple-600"  },
  amber:   { hero:"from-amber-500  to-orange-500"  },
  rose:    { hero:"from-rose-500   to-pink-500"    },
  blue:    { hero:"from-blue-500   to-indigo-500"  },
  emerald: { hero:"from-emerald-500 to-teal-500"   },
  indigo:  { hero:"from-indigo-500 to-blue-600"    },
};

export default function NoteReader({ note, canRead, completed:initialCompleted, quizScore, prevNote, nextNote }) {
  const queryClient   = useQueryClient();
  const router        = useRouter();
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [streakToast, setStreakToast] = useState(null); // streak count or null

  // Toggle completed/uncompleted — both via same API
  const markMutation = useMutation({
    mutationFn: async (newState) => {
      const r = await fetch("/api/progress", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ noteId:note.id, completed:newState }),
      });
      if (!r.ok) throw new Error("Failed");
      return r.json();
    },
    onMutate:  (newState) => setIsCompleted(newState),
    onSuccess: async (_, newState) => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      // Bust the Next.js router cache so home/notes server components show fresh data
      router.refresh();
      // Show streak toast only when completing
      if (newState) {
        try {
          const res  = await fetch("/api/user/streak");
          const data = await res.json();
          if (data.streak >= 2) setStreakToast(data.streak);
        } catch { /* ignore */ }
      }
    },
    onError: (_, newState) => setIsCompleted(!newState),
  });

  const tc = TC[note.topic?.color] ?? TC.teal;

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 font-mono flex-wrap">
          <Link href="/notes" className="hover:text-teal-600 transition-colors">Notes</Link>
          <ChevronRight size={11}/>
          <Link href={`/notes?topic=${note.topic?.slug}`} className="hover:text-teal-600 transition-colors">
            {note.topic?.title}
          </Link>
          <ChevronRight size={11}/>
          <span className="text-slate-600 truncate max-w-[200px]">{note.title}</span>
        </nav>

        {/* Hero */}
        <div className={cn(`bg-gradient-to-r ${tc.hero}`, "rounded-2xl p-6 text-white shadow-lg")}>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-white/20 text-white border border-white/30">
              {note.topic?.icon} {note.topic?.title}
            </span>
            {note.isPremium && (
              <span className="flex items-center gap-1 text-[11px] font-mono font-semibold text-amber-700 bg-amber-100 border border-amber-300 rounded-full px-2.5 py-1">
                <Crown size={9}/> Premium
              </span>
            )}
            {isCompleted && (
              <span className="flex items-center gap-1 text-[11px] font-mono font-semibold text-white bg-white/20 border border-white/30 rounded-full px-2.5 py-1">
                <CheckCircle2 size={9}/> Completed
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            {note.title}
          </h1>

          {note.summary && <p className="text-white/80 text-sm leading-relaxed mb-4">{note.summary}</p>}

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1 text-xs text-white/70 font-mono">
              <Clock size={12}/> {note.readTime ?? 5} min read
            </div>

            {canRead && (
              isCompleted ? (
                <button
                  onClick={() => markMutation.mutate(false)}
                  disabled={markMutation.isPending}
                  aria-label="Mark as incomplete"
                  className="flex items-center gap-2 text-sm font-semibold
                    text-white bg-white/20 hover:bg-white/30
                    border border-white/30 px-4 py-2 rounded-xl transition-all group">
                  <CheckCircle2 size={15} className="fill-white/30"/>
                  <span>Completed</span>
                  <span className="hidden group-hover:inline text-white/70 text-xs">· Undo?</span>
                </button>
              ) : (
                <button
                  onClick={() => markMutation.mutate(true)}
                  disabled={markMutation.isPending}
                  aria-label="Mark as complete"
                  className="flex items-center gap-2 text-sm font-semibold
                    text-white bg-white/15 hover:bg-white/25
                    border border-white/30 px-4 py-2 rounded-xl transition-all">
                  <CheckCircle2 size={15}/>
                  Mark as Complete
                </button>
              )
            )}
          </div>
        </div>

        {canRead ? (
          <>
            <article className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 sm:px-10 py-8">
                <div className="
                  [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-4
                  [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-slate-100 [&_h2:first-child]:mt-0
                  [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-6 [&_h3]:mb-3
                  [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:my-3 [&_p]:text-[15px]
                  [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:list-none [&_ul]:pl-0
                  [&_ol]:my-4 [&_ol]:space-y-2 [&_ol]:list-none [&_ol]:pl-0
                  [&_li]:text-slate-600 [&_li]:text-[15px] [&_li]:leading-relaxed
                  [&_li]:flex [&_li]:items-start [&_li]:gap-2
                  [&_li]:before:content-['▸'] [&_li]:before:text-teal-500 [&_li]:before:font-bold [&_li]:before:shrink-0 [&_li]:before:mt-0.5
                  [&_strong]:text-slate-800 [&_strong]:font-bold
                  [&_code]:bg-slate-100 [&_code]:text-teal-700 [&_code]:rounded-md
                  [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[12.5px] [&_code]:font-mono
                  [&_pre]:bg-slate-900 [&_pre]:rounded-xl [&_pre]:p-5 [&_pre]:overflow-x-auto
                  [&_pre_code]:bg-transparent [&_pre_code]:text-slate-200 [&_pre_code]:px-0 [&_pre_code]:py-0 [&_pre_code]:text-[13px] [&_pre_code]:leading-[1.85]
                  [&_blockquote]:border-l-4 [&_blockquote]:border-teal-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-500 [&_blockquote]:my-4
                "
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />
              </div>

              <div className="px-6 sm:px-10 pb-8 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center">
                    <Code2 size={13} className="text-teal-400"/>
                  </div>
                  <p className="text-sm font-bold text-slate-800">Try it yourself</p>
                </div>
                <p className="text-xs text-slate-400 mb-4 ml-9">Type (don&apos;t copy!) — builds muscle memory</p>
                <CodeBlock language="python" filename="example.py"
                  code={`# Practice typing this — understanding grows when you write code!\ndef greet(name, language="Python"):\n    return f"Hello, {name}! You're learning {language} 🚀"\n\nprint(greet("Alice"))\nprint(greet("Bob", "JavaScript"))\nprint(greet("You", "TypeScript"))`} />
                <VSCodeTip steps={[
                  "Open VS Code → File → New File → save as 'example.py'",
                  "Type (not copy!) the code above",
                  "Open terminal: View → Terminal  (Ctrl + `)",
                  "Run: python example.py",
                  "Try changing values and run again",
                ]}/>
              </div>
            </article>

            {note.quizzes?.length > 0 && (
              <NoteQuiz quizzes={note.quizzes} noteId={note.id} quizScore={quizScore}/>
            )}

            {nextNote && (
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5
                flex items-center gap-4 border border-slate-700 shadow-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-slate-400 mb-1 uppercase tracking-wider">Up next</p>
                  <p className="text-base font-bold text-white truncate">{nextNote.title}</p>
                </div>
                <Link href={`/notes/${nextNote.slug}`} aria-label={`Go to next note: ${nextNote.title}`}
                  className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400
                    text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl
                    transition-all shrink-0 shadow-md shadow-teal-500/20">
                  Next <ArrowRight size={15}/>
                </Link>
              </div>
            )}

            {prevNote && (
              <Link href={`/notes/${prevNote.slug}`} aria-label={`Go to previous note: ${prevNote.title}`}
                className="flex items-center gap-2 p-4 bg-white border border-slate-100
                  rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all group
                  text-slate-500 hover:text-slate-700 w-fit">
                <ChevronLeft size={14}/>
                <span className="text-xs font-mono uppercase tracking-wider">Previous:</span>
                <span className="text-sm font-semibold group-hover:text-teal-600 transition-colors">
                  {prevNote.title}
                </span>
              </Link>
            )}
          </>
        ) : (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-center space-y-5 border border-slate-700">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto">
              <Crown size={28} className="text-amber-400"/>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>Premium Note</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                Get the Premium Plan for ₹99 — lifetime access to all notes, quizzes &amp; PYQ solutions.
              </p>
            </div>
            <Link href="/pricing" aria-label="Unlock premium note"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400
                text-slate-900 font-bold text-sm px-8 py-3 rounded-xl transition-all hover:-translate-y-px">
              <Zap size={15}/> Unlock All Access · ₹99
            </Link>
          </div>
        )}
      </div>

      {/* ── Streak toast ── */}
      {streakToast !== null && (
        <StreakToast streak={streakToast} onClose={() => setStreakToast(null)} />
      )}
    </div>
  );
}
