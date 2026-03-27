// src/app/(app)/quiz/page.jsx

import { auth }     from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma }   from "@/lib/prisma";
import { Lock }     from "lucide-react";
import QuizClient   from "./QuizClient";

export const metadata = {
  title:       "Quizzes — Prepzena",
  description: "Test your knowledge. Read a note first to unlock its quiz.",
};

export default async function QuizPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const [topics, dbUser, allProgress] = await Promise.all([
    prisma.topic.findMany({
      orderBy: { order:"asc" },
      include: {
        notes: {
          include: {
            quizzes: { select:{ id:true, isPremium:true } },
          },
          orderBy: { order:"asc" },
        },
      },
    }).catch(() => []),
    prisma.user.findUnique({
      where:  { clerkId:userId },
      select: { isPremium:true, streak:true },
    }).catch(() => null),
    prisma.progress.findMany({
      where:  { user:{ clerkId:userId } },
      select: { noteId:true, completed:true, quizScore:true },
    }).catch(() => []),
  ]);

  const isPremium   = dbUser?.isPremium  ?? false;
  const streak      = dbUser?.streak     ?? 0;
  const progressMap = Object.fromEntries(allProgress.map(p => [p.noteId, p]));

  const topicQuizzes = topics.map(topic => ({
    ...topic,
    items: topic.notes
      .filter(n => n.quizzes.length > 0)
      .map(note => {
        const prog     = progressMap[note.id];
        const noteDone = prog?.completed ?? false;
        const score    = prog?.quizScore ?? null;
        return {
          note, noteDone, score,
          locked:        !noteDone,
          premiumLocked: note.isPremium && !isPremium,
          quizCount:     note.quizzes.length,
        };
      }),
  })).filter(t => t.items.length > 0);

  const allItems  = topicQuizzes.flatMap(t => t.items);
  const total     = allItems.length;
  const attempted = allItems.filter(i => i.score !== null).length;
  const passed    = allItems.filter(i => (i.score ?? 0) >= 65).length;
  const avgScore  = attempted
    ? Math.round(allItems.filter(i => i.score !== null).reduce((s, i) => s + i.score, 0) / attempted)
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

      {/* Header */}
      <div>
        <p className="text-xs font-mono tracking-widest uppercase text-slate-400 mb-1">Practice</p>
        <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
          Quizzes
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Read a note to unlock its quiz. Pass 65%+ to progress to the next section.
        </p>
      </div>

      {/* Hero stats bar */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"20px 20px" }}/>
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { label:"Total Quizzes", value:total     },
            { label:"Attempted",     value:attempted  },
            { label:"Passed (65%+)", value:passed     },
            { label:"Avg Score",     value:`${avgScore}%` },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-2xl font-bold" style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>{value}</p>
              <p className="text-xs text-white/70 font-mono mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Unlock info banner */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <Lock size={15} className="text-amber-600 shrink-0 mt-0.5"/>
        <div>
          <p className="text-sm font-bold text-amber-800">How quizzes unlock</p>
          <p className="text-xs text-amber-600 mt-0.5">
            Read a note and click &ldquo;Mark as Complete&rdquo; → quiz unlocks instantly. Pass 65%+ → next section unlocks.
          </p>
        </div>
      </div>

      {/* Client component handles filter + sort */}
      {topicQuizzes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
          <p className="text-sm text-slate-400">No quizzes yet. Seed the database first.</p>
        </div>
      ) : (
        <QuizClient topicQuizzes={topicQuizzes} streak={streak} />
      )}

    </div>
  );
}
