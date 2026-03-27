"use client";
// src/app/(app)/notes/_components/NotesHub.jsx

import { useState, useMemo }            from "react";
import { useRouter }                    from "next/navigation";
import Link                             from "next/link";
import { useMutation, useQuery,
         useQueryClient }               from "@tanstack/react-query";
import {
  BookOpen, Lock, CheckCircle2, ChevronRight, ChevronLeft,
  Crown, Zap, Brain, Trophy,
  ChevronDown, ChevronUp, Clock, Search, X,
  PartyPopper,
}                                       from "lucide-react";
import { cn }                           from "@/lib/utils";

const SECTION_SIZE = 5;
const PASS_SCORE   = 65;

const TC = {
  teal:    { text:"text-teal-700",    bg:"bg-teal-50",    border:"border-teal-200",   ring:"ring-teal-300",   dot:"bg-teal-500",    bar:"bg-teal-500",    hero:"from-teal-500    to-emerald-500" },
  violet:  { text:"text-violet-700",  bg:"bg-violet-50",  border:"border-violet-200", ring:"ring-violet-300", dot:"bg-violet-500",  bar:"bg-violet-500",  hero:"from-violet-500  to-purple-600"  },
  amber:   { text:"text-amber-700",   bg:"bg-amber-50",   border:"border-amber-200",  ring:"ring-amber-300",  dot:"bg-amber-500",   bar:"bg-amber-500",   hero:"from-amber-500   to-orange-500"  },
  rose:    { text:"text-rose-700",    bg:"bg-rose-50",    border:"border-rose-200",   ring:"ring-rose-300",   dot:"bg-rose-500",    bar:"bg-rose-500",    hero:"from-rose-500    to-pink-500"    },
  blue:    { text:"text-blue-700",    bg:"bg-blue-50",    border:"border-blue-200",   ring:"ring-blue-300",   dot:"bg-blue-500",    bar:"bg-blue-500",    hero:"from-blue-500    to-indigo-500"  },
  emerald: { text:"text-emerald-700", bg:"bg-emerald-50", border:"border-emerald-200",ring:"ring-emerald-300",dot:"bg-emerald-500", bar:"bg-emerald-500", hero:"from-emerald-500 to-teal-500"   },
  indigo:  { text:"text-indigo-700",  bg:"bg-indigo-50",  border:"border-indigo-200", ring:"ring-indigo-300", dot:"bg-indigo-500",  bar:"bg-indigo-500",  hero:"from-indigo-500  to-blue-600"   },
};

function sectionDiff(idx) {
  if (idx < 2) return { label:"Beginner",     cls:"text-emerald-700 bg-emerald-50 border-emerald-200" };
  if (idx < 4) return { label:"Intermediate", cls:"text-amber-700   bg-amber-50   border-amber-200"   };
  return               { label:"Advanced",     cls:"text-rose-700    bg-rose-50    border-rose-200"    };
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

// ── Inline section quiz ───────────────────────────────────────
const QUIZ_Q = [
  { q:"What is O(1) time complexity?",         opts:["Linear","Constant","Quadratic","Log"], ans:1 },
  { q:"Which structure uses LIFO?",            opts:["Queue","Stack","Graph","Heap"],         ans:1 },
  { q:"What does DRY stand for?",              opts:["Don't Repeat Yourself","Do Run Yearly","Data Relay","Define Reuse"], ans:0 },
  { q:"What is a pure function?",              opts:["Uses globals","Same in=same out","Side effects","Modifies state"], ans:1 },
  { q:"Which HTTP method creates a resource?", opts:["GET","PUT","POST","DELETE"],             ans:2 },
];

function SectionQuiz({ sectionIdx, onPass }) {
  const [cur,         setCur]         = useState(0);
  const [selected,    setSelected]    = useState(null);
  const [answers,     setAnswers]     = useState([]);
  const [done,        setDone]        = useState(false);
  const [score,       setScore]       = useState(null);
  const [showResults, setShowResults] = useState(false);

  const mutation = useMutation({
    mutationFn: async (pct) => fetch("/api/progress/quiz", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ sectionIndex:sectionIdx, score:pct }),
    }).then(r => r.json()).catch(() => ({})),
  });

  const q = QUIZ_Q[cur];

  const handleNext = () => {
    if (selected === null) return;
    const next = [...answers, selected];
    setAnswers(next);
    const isLast = cur === QUIZ_Q.length - 1;
    if (isLast) {
      const correct = next.filter((a,i) => a === QUIZ_Q[i].ans).length;
      const pct = Math.round((correct / QUIZ_Q.length) * 100);
      setScore(pct); setDone(true);
      mutation.mutate(pct);
      if (pct >= PASS_SCORE) onPass?.();
    } else { setCur(c=>c+1); setSelected(null); }
  };

  if (done) {
    const passed = score >= PASS_SCORE;
    return (
      <div className="space-y-3">
        {passed ? (
          <div className="flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3">
            <Trophy size={16} className="text-teal-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-teal-700">Passed {score}%! Next section unlocked 🎉</p>
            </div>
            <button onClick={() => setShowResults(p => !p)}
              className="text-xs font-bold text-teal-600 underline hover:text-teal-800 shrink-0">
              {showResults ? "Hide" : "Check Results"}
            </button>
          </div>
        ) : (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-rose-700">Score: {score}% — Need {PASS_SCORE}%+</p>
              <button onClick={() => setShowResults(p => !p)}
                className="text-xs font-bold text-rose-500 underline hover:text-rose-700">
                {showResults ? "Hide" : "Check Results"}
              </button>
            </div>
            <button onClick={() => { setCur(0); setSelected(null); setAnswers([]); setDone(false); setScore(null); setShowResults(false); }}
              className="text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 px-3 py-1.5 rounded-lg">
              Retry
            </button>
          </div>
        )}
        {showResults && (
          <div className="rounded-xl overflow-hidden border border-slate-200">
            {QUIZ_Q.map((qs, i) => {
              const userAns = answers[i];
              const isRight = userAns === qs.ans;
              return (
                <div key={i} className={cn("p-3 border-b border-slate-100 last:border-b-0",
                  isRight ? "bg-teal-50/60" : "bg-rose-50/60")}>
                  <p className="text-xs font-bold text-slate-700 mb-1.5">
                    <span className={cn("mr-1", isRight ? "text-teal-600" : "text-rose-500")}>
                      {isRight ? "✓" : "✗"}
                    </span>
                    Q{i+1}: {qs.q}
                  </p>
                  <div className="space-y-0.5 ml-3">
                    {qs.opts.map((opt, oi) => (
                      <div key={oi} className={cn("text-xs px-2 py-0.5 rounded",
                        oi === qs.ans ? "bg-teal-100 text-teal-800 font-semibold" :
                        oi === userAns && !isRight ? "bg-rose-100 text-rose-700 line-through" :
                        "text-slate-400")}>
                        {oi === qs.ans ? "✓ " : oi === userAns && !isRight ? "✗ " : "  "}{opt}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-violet-100 rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain size={14} className="text-white" />
          <span className="text-xs font-bold text-white">Section Quiz · Q{cur+1}/{QUIZ_Q.length}</span>
        </div>
        <div className="flex gap-1">
          {QUIZ_Q.map((_, i) => (
            <div key={i} className={cn("h-1 w-5 rounded-full",
              i < cur ? "bg-white" : i === cur ? "bg-white/60" : "bg-white/20")} />
          ))}
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm font-semibold text-slate-800">{q.q}</p>
        <div className="space-y-1.5">
          {q.opts.map((opt, i) => (
            <button key={i} onClick={() => setSelected(i)}
              aria-label={`Option ${String.fromCharCode(65+i)}: ${opt}`}
              className={cn("flex w-full items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm text-left transition-all",
                selected === i ? "border-violet-500 bg-violet-50 text-violet-800 font-medium"
                               : "border-slate-200 text-slate-600 hover:border-violet-200 hover:bg-violet-50/30")}>
              <span className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shrink-0",
                selected === i ? "border-violet-500 bg-violet-500 text-white" : "border-slate-300 text-slate-400")}>
                {String.fromCharCode(65+i)}
              </span>
              {opt}
            </button>
          ))}
        </div>
        <button onClick={handleNext} disabled={selected === null}
          className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white font-bold text-sm rounded-xl transition-colors">
          {cur === QUIZ_Q.length-1 ? "Submit Quiz" : "Next →"}
        </button>
      </div>
    </div>
  );
}

// ── Section row ───────────────────────────────────────────────
function SectionRow({ notes, sectionIdx, sectionNum, isLocked, progressMap, isPremium, topicColor, quizPassed, onQuizPass, noteFilter }) {
  const [open,     setOpen]     = useState(sectionIdx === 0);
  const [showQuiz, setShowQuiz] = useState(false);

  const c            = TC[topicColor] ?? TC.teal;
  const diff         = sectionDiff(sectionIdx);
  const completedCnt = notes.filter(n => progressMap[n.id]?.completed).length;
  const allDone      = completedCnt === notes.length;
  const pct          = notes.length ? Math.round((completedCnt / notes.length) * 100) : 0;

  // Estimated remaining time
  const remainingMins = notes
    .filter(n => !progressMap[n.id]?.completed)
    .reduce((sum, n) => sum + (n.readTime ?? 5), 0);

  // Filter notes by search query
  const visibleNotes = noteFilter
    ? notes.filter(n => n.title.toLowerCase().includes(noteFilter.toLowerCase()))
    : notes;

  return (
    <div className={cn("bg-white border rounded-2xl overflow-hidden transition-all shadow-sm",
      isLocked ? "border-slate-200 opacity-80" : "border-slate-100 hover:shadow-md")}>

      <button onClick={() => !isLocked && setOpen(p => !p)} disabled={isLocked}
        aria-expanded={open}
        aria-label={`Section ${sectionNum}${isLocked ? " (locked)" : ""}`}
        className="w-full flex items-center gap-4 p-4 text-left">

        {/* Number bubble */}
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base shrink-0",
          isLocked ? "bg-slate-100 text-slate-400" : `${c.bg} ${c.text}`)}>
          {isLocked ? <Lock size={16} /> : sectionNum}
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-slate-800">Section {sectionNum}</span>
            <span className={cn("text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border", diff.cls)}>
              {diff.label}
            </span>
            {/* Note count badge */}
            <span className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 rounded-full px-2 py-0.5">
              {completedCnt}/{notes.length} done
            </span>
            {quizPassed && !isLocked && (
              <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2 py-0.5">
                <CheckCircle2 size={9} /> Passed
              </span>
            )}
            {isLocked && (
              <span className="text-[10px] font-mono text-slate-400">
                Pass section {sectionNum-1} quiz to unlock
              </span>
            )}
          </div>
          {!isLocked && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full transition-all", c.bar)}
                  style={{ width:`${pct}%` }} />
              </div>
              <span className="text-[10px] font-mono text-slate-400 shrink-0">{completedCnt}/{notes.length}</span>
              {remainingMins > 0 && (
                <span className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-slate-400 shrink-0">
                  <Clock size={9}/> ~{remainingMins}m left
                </span>
              )}
            </div>
          )}
        </div>

        {!isLocked && (open
          ? <ChevronUp size={16} className="text-slate-400 shrink-0" />
          : <ChevronDown size={16} className="text-slate-400 shrink-0" />
        )}
      </button>

      {open && !isLocked && (
        <div className="border-t border-slate-100">
          {visibleNotes.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-slate-400">
              No notes match &ldquo;{noteFilter}&rdquo;
            </div>
          ) : visibleNotes.map((note, i) => {
            const done   = progressMap[note.id]?.completed ?? false;
            const locked = note.isPremium && !isPremium;
            return (
              <Link key={note.id} href={locked ? "/pricing" : `/notes/${note.slug}`}
                aria-label={`${note.title}${done ? " (completed)" : ""}${locked ? " (premium)" : ""}`}
                className={cn("flex items-center gap-3 px-4 py-3.5 transition-colors group",
                  i < visibleNotes.length-1 && "border-b border-slate-50",
                  "hover:bg-slate-50/80")}>

                {/* Completion dot */}
                <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                  done ? `${c.dot} border-transparent` : "border-slate-200 group-hover:border-slate-300")}>
                  {done && <CheckCircle2 size={12} className="text-white" />}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium truncate",
                    done ? "text-slate-400 line-through" : "text-slate-700 group-hover:text-slate-900")}>
                    {note.title}
                  </p>
                  {note.summary && (
                    <p className="text-xs text-slate-400 truncate mt-0.5">{note.summary}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {note.readTime && (
                    <span className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                      <Clock size={10} /> {note.readTime}m
                    </span>
                  )}
                  {locked ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-teal-600 bg-teal-50 border border-teal-200 rounded-full px-2 py-0.5">
                      <Crown size={8} /> Premium
                    </span>
                  ) : (
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
                  )}
                </div>
              </Link>
            );
          })}

          {/* Quiz gate at bottom of section */}
          <div className="border-t border-slate-100 bg-slate-50/40 px-4 py-4 space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
                  <Brain size={12} className="text-violet-600" />
                </div>
                <span className="text-sm font-bold text-slate-700">Section {sectionNum} Quiz</span>
                {!allDone && (
                  <span className="text-xs text-slate-400 font-mono">
                    {completedCnt}/{notes.length} notes done
                  </span>
                )}
              </div>
              {!quizPassed && (
                <button onClick={() => allDone && setShowQuiz(p => !p)}
                  disabled={!allDone}
                  aria-label={showQuiz ? "Hide quiz" : "Take section quiz"}
                  title={!allDone ? `Complete all ${notes.length} notes to unlock quiz` : ""}
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors",
                    allDone
                      ? "text-white bg-violet-600 hover:bg-violet-700"
                      : "text-slate-400 bg-slate-100 cursor-not-allowed"
                  )}>
                  <Trophy size={11} />
                  {showQuiz ? "Hide Quiz" : "Take Quiz"}
                </button>
              )}
            </div>

            {showQuiz && allDone && !quizPassed && (
              <SectionQuiz sectionIdx={sectionIdx}
                onPass={() => { setShowQuiz(false); onQuizPass(sectionIdx); }} />
            )}

            {quizPassed && (
              <div className="flex items-center gap-2 text-xs text-teal-700 font-semibold bg-teal-50 border border-teal-200 rounded-xl px-3 py-2">
                <CheckCircle2 size={12} /> Quiz passed — next section unlocked!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sidebar topic card ────────────────────────────────────────
function TopicCard({ topic, progressMap, isActive, onClick }) {
  const c     = TC[topic.color] ?? TC.teal;
  const total = topic.notes.length;
  const done  = topic.notes.filter(n => progressMap[n.id]?.completed).length;
  const pct   = total ? Math.round((done / total) * 100) : 0;

  return (
    <button onClick={onClick}
      aria-label={`${topic.title} — ${pct}% complete`}
      aria-pressed={isActive}
      className={cn("w-full text-left p-3.5 rounded-2xl border transition-all duration-200",
        isActive
          ? `${c.bg} ${c.border} ring-2 ${c.ring} shadow-sm`
          : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm")}>
      <div className="flex items-center gap-3 mb-2.5">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0",
          isActive ? "bg-white/70" : c.bg)}>
          {topic.icon ?? "📚"}
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-bold truncate", isActive ? c.text : "text-slate-800")}>
            {topic.title}
          </p>
          <p className="text-[10px] font-mono text-slate-400">{total} notes · {pct}%</p>
        </div>
        {pct === 100 && <CheckCircle2 size={14} className="text-teal-500 shrink-0" />}
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", c.bar)} style={{ width:`${pct}%` }} />
      </div>
    </button>
  );
}

// ── Premium section ───────────────────────────────────────────
function PremiumSection({ topicTitle }) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"18px 18px" }} />
      <div className="relative z-10 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
              <Crown size={16} className="text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Premium — {topicTitle}</p>
              <p className="text-xs text-slate-400">Interview-ready content</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-teal-400 bg-teal-400/10 border border-teal-400/20 rounded-full px-2.5 py-1">Premium</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[["⭐","Top 50 FAANG Qs"],["🎯","Advanced deep-dives"],["🔥","Premium quiz"],["💡","System design"]].map(([icon,text]) => (
            <div key={text} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
              <span className="text-sm">{icon}</span>
              <span className="text-xs text-slate-300">{text}</span>
            </div>
          ))}
        </div>
        <Link href="/pricing" aria-label="Unlock premium content"
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-900 font-bold text-sm px-5 py-3 rounded-xl transition-all hover:-translate-y-px">
          <Zap size={15} /> Unlock with Premium Plan · ₹99
        </Link>
      </div>
    </div>
  );
}

// ── Confetti celebration card ─────────────────────────────────
function TopicCompleteCard({ topicTitle }) {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-6 text-center shadow-lg">
      <PartyPopper size={36} className="text-white mx-auto mb-3" />
      <h3 className="text-lg font-bold text-white mb-1"
        style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
        🎉 {topicTitle} Complete!
      </h3>
      <p className="text-sm text-white/80">
        You&apos;ve finished all sections. Head to Quizzes to test your mastery.
      </p>
      <Link href="/quiz" aria-label="Go to quizzes"
        className="inline-flex items-center gap-2 mt-4 bg-white hover:bg-white/90
          text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:-translate-y-px">
        <Trophy size={14}/> Take Final Quiz
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
export default function NotesHub({ topics, progressMap: initialProgressMap, isPremium, activeTopicSlug }) {
  const router = useRouter();
  const [activeTopic,   setActiveTopic]   = useState(topics.find(t => t.slug === activeTopicSlug) ?? topics[0] ?? null);
  const [sessionPassed, setSessionPassed] = useState({});
  const [noteFilter,    setNoteFilter]    = useState("");
  const [mobileView,    setMobileView]    = useState(activeTopicSlug ? "notes" : "topics");

  // Live progress — uses server-provided data as initialData so first render is instant,
  // then stays fresh via React Query; any mutation (mark complete/undo) re-fetches automatically
  const { data: liveProgress } = useQuery({
    queryKey: ["progress"],
    queryFn:  () => fetch("/api/progress").then(r => r.json()),
    initialData: Object.entries(initialProgressMap).map(([noteId, p]) => ({ noteId, ...p })),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  // Rebuild progressMap from live array
  const progressMap = useMemo(() => {
    if (!liveProgress) return initialProgressMap;
    return Object.fromEntries(
      (Array.isArray(liveProgress) ? liveProgress : []).map(p => [p.noteId, p])
    );
  }, [liveProgress, initialProgressMap]);

  const freeNotes = useMemo(() => (activeTopic?.notes ?? []).filter(n => !n.isPremium), [activeTopic]);
  const sections  = useMemo(() => chunk(freeNotes, SECTION_SIZE), [freeNotes]);
  const c         = TC[activeTopic?.color] ?? TC.teal;

  const completedTotal = (activeTopic?.notes ?? []).filter(n => progressMap[n.id]?.completed).length;
  const pctTotal       = activeTopic?.notes.length ? Math.round((completedTotal / activeTopic.notes.length) * 100) : 0;
  const allTopicDone   = pctTotal === 100 && activeTopic?.notes.length > 0;

  const isSectionLocked = (idx) => {
    if (idx === 0) return false;
    const prev   = sections[idx-1] ?? [];
    const allDone = prev.every(n => progressMap[n.id]?.completed);
    if (!allDone) return true;
    return !(sessionPassed[idx-1] || (progressMap[`section-quiz-${idx-1}`]?.quizScore ?? 0) >= PASS_SCORE);
  };

  if (!topics.length) return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <BookOpen size={40} className="mx-auto mb-3 text-slate-300" />
      <p className="text-sm text-slate-400">No topics yet. Run <code className="text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">npx prisma db seed</code></p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-mono tracking-widest uppercase text-slate-400 mb-1.5">Learning Center</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
          Study Notes
        </h1>
        <p className="text-sm text-slate-500">Complete 5 notes per section → pass the quiz → unlock the next section.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className={cn("lg:w-64 shrink-0", mobileView === "notes" ? "hidden lg:block" : "block")} aria-label="Topics">
          <p className="text-xs font-mono tracking-widest uppercase text-slate-400 mb-3">Topics</p>
          <div className="space-y-2">
            {topics.map(topic => (
              <TopicCard key={topic.slug} topic={topic} progressMap={progressMap}
                isActive={activeTopic?.slug === topic.slug}
                onClick={() => {
                  setActiveTopic(topic);
                  setNoteFilter("");
                  setMobileView("notes");
                  router.push(`/notes?topic=${topic.slug}`, { scroll:false });
                }} />
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className={cn("flex-1 min-w-0 space-y-4", mobileView === "topics" ? "hidden lg:block" : "block")} aria-label="Notes content">
          {/* Back button — mobile only */}
          <button onClick={() => setMobileView("topics")}
            aria-label="Back to topics"
            className="lg:hidden flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-1 -mt-1">
            <ChevronLeft size={16} /> Back to Topics
          </button>
          {/* Topic banner */}
          {activeTopic && (
            <div className={cn(`bg-gradient-to-r ${c.hero}`, "rounded-2xl p-5 text-white shadow-lg")}>
              <div className="flex items-center gap-4">
                <span className="text-4xl shrink-0">{activeTopic.icon ?? "📚"}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold" style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
                    {activeTopic.title}
                  </h2>
                  {activeTopic.description && (
                    <p className="text-sm text-white/70 mt-0.5 line-clamp-1">{activeTopic.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full transition-all" style={{ width:`${pctTotal}%` }} />
                    </div>
                    <span className="text-sm font-bold text-white shrink-0">{pctTotal}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Search bar for filtering notes within topic ── */}
          {sections.length > 0 && (
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={noteFilter}
                onChange={e => setNoteFilter(e.target.value)}
                placeholder={`Search notes in ${activeTopic?.title ?? "this topic"}...`}
                aria-label="Filter notes"
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200
                  rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent
                  placeholder:text-slate-300 text-slate-700"
              />
              {noteFilter && (
                <button onClick={() => setNoteFilter("")} aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {/* Confetti card when topic is 100% done */}
          {allTopicDone && (
            <TopicCompleteCard topicTitle={activeTopic?.title ?? "Topic"} />
          )}

          {/* Sections */}
          {sections.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
              <BookOpen size={36} className="mx-auto mb-3 text-slate-300" />
              <p className="text-sm text-slate-400">No notes in this topic yet.</p>
            </div>
          ) : sections.map((notes, idx) => (
            <SectionRow key={idx} notes={notes} sectionIdx={idx} sectionNum={idx+1}
              isLocked={isSectionLocked(idx)} progressMap={progressMap}
              isPremium={isPremium} topicColor={activeTopic?.color ?? "teal"}
              quizPassed={sessionPassed[idx] || (progressMap[`section-quiz-${idx}`]?.quizScore ?? 0) >= PASS_SCORE}
              onQuizPass={(i) => setSessionPassed(prev => ({ ...prev, [i]: true }))}
              noteFilter={noteFilter} />
          ))}

          {/* Premium section */}
          {!isPremium && activeTopic && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 shrink-0">
                  <Crown size={10} /> Premium Section
                </span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <PremiumSection topicTitle={activeTopic.title} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
