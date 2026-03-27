// src/app/(app)/pyqs/[slug]/page.jsx
// Server component — individual PYQ paper viewer
import { prisma }     from "@/lib/prisma";
import { auth }       from "@clerk/nextjs/server";
import Link           from "next/link";
import { notFound }   from "next/navigation";
import {
  ArrowLeft, Calendar, FileText,
  Lock, Crown, CheckCircle2, Zap,
  BookOpen, GraduationCap,
} from "lucide-react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const paper = await prisma.pYQ.findUnique({
    where: { slug },
    select: { title: true },
  });
  return { title: paper ? `${paper.title} | Prepzena PYQs` : "PYQ | Prepzena" };
}

export default async function PYQPaperPage({ params }) {
  const { slug } = await params;
  const { userId } = await auth();

  const paper = await prisma.pYQ.findUnique({ where: { slug } });
  if (!paper) notFound();

  // Check access
  let isPremiumUser = false;
  let hasUnlock     = false;
  if (userId) {
    const [user, unlock] = await Promise.all([
      prisma.user.findUnique({ where: { clerkId: userId }, select: { isPremium: true } }),
      prisma.unlock.findFirst({ where: { userId, pyqId: paper.id } }),
    ]);
    isPremiumUser = user?.isPremium ?? false;
    hasUnlock     = !!unlock;
  }

  const canSeeAnswers = !paper.isPremium || isPremiumUser || hasUnlock;
  const questions     = Array.isArray(paper.questions) ? paper.questions : [];

  const totalMarks = questions.reduce((s, q) => s + (q.marks ?? 0), 0);

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* ── Back ── */}
        <Link href="/pyqs"
          className="inline-flex items-center gap-2 text-sm text-slate-500
            hover:text-slate-800 transition-colors">
          <ArrowLeft size={15}/> All Papers
        </Link>

        {/* ── Paper header ── */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold bg-teal-50 text-teal-700
              border border-teal-200 rounded-full px-3 py-0.5">
              {paper.university}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Calendar size={11}/> {paper.year}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <FileText size={11}/> {questions.length} questions · {totalMarks} marks
            </span>
            {paper.isPremium && (
              <span className="flex items-center gap-1 text-xs font-bold text-amber-600
                bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5">
                <Crown size={10}/> Premium
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            {paper.title}
          </h1>

          {canSeeAnswers ? (
            <div className="flex items-center gap-2 text-sm text-teal-700 bg-teal-50
              border border-teal-200 rounded-xl px-4 py-2.5 w-fit">
              <CheckCircle2 size={15}/> Model answers are visible below each question
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50
              border border-amber-200 rounded-xl px-4 py-2.5 w-fit">
              <Lock size={15}/> Upgrade to see model answers
            </div>
          )}
        </div>

        {/* ── Questions ── */}
        <div className="space-y-5">
          {questions.map((q, i) => (
            <QuestionCard
              key={i}
              num={i + 1}
              question={q}
              canSeeAnswer={canSeeAnswers}
            />
          ))}
        </div>

        {/* ── Upgrade CTA (locked papers) ── */}
        {!canSeeAnswers && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8
            border border-teal-500/30 text-center space-y-4">
            <Crown size={28} className="text-teal-400 mx-auto"/>
            <h2 className="text-xl font-bold text-white"
              style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
              Unlock Model Answers
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
              Get step-by-step model answers for every question in all papers — with a
              single ₹99 one-time payment. Lifetime access, no renewals.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/pricing"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500
                  hover:from-teal-400 hover:to-emerald-400 text-slate-900 font-bold px-6 py-3
                  rounded-xl transition-all hover:-translate-y-px shadow-lg shadow-teal-500/30 text-sm">
                <Zap size={14}/> Unlock All Access · ₹99
              </Link>
              <Link href="/pyqs"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10
                  text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-xl transition-all text-sm">
                <BookOpen size={14}/> Browse Free Papers
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Question Card ────────────────────────────────────────
function QuestionCard({ num, question, canSeeAnswer }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      {/* Question */}
      <div className="p-5 sm:p-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-50 border border-teal-200
              flex items-center justify-center text-xs font-bold text-teal-700 mt-0.5">
              {num}
            </span>
            <p className="text-slate-800 font-medium text-sm leading-relaxed whitespace-pre-wrap">
              {question.text}
            </p>
          </div>
          {question.marks && (
            <span className="flex-shrink-0 text-xs font-mono font-bold text-slate-500
              bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
              [{question.marks} marks]
            </span>
          )}
        </div>
      </div>

      {/* Answer */}
      {canSeeAnswer ? (
        <div className="border-t border-teal-100 bg-teal-50/40 p-5 sm:p-6">
          <p className="text-xs font-mono font-bold text-teal-600 mb-3 flex items-center gap-1.5">
            <CheckCircle2 size={12}/> Model Answer
          </p>
          <pre className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-sans">
            {question.answer ?? "Answer available — see textbook references."}
          </pre>
        </div>
      ) : (
        <div className="border-t border-amber-100 bg-amber-50/40 p-4 flex items-center gap-2">
          <Lock size={13} className="text-amber-500 flex-shrink-0"/>
          <p className="text-xs text-amber-700 font-medium">
            Model answer hidden.{" "}
            <Link href="/pricing" className="underline underline-offset-2 font-bold">
              Unlock All Access · ₹99
            </Link>{" "}
            to reveal answers for every paper.
          </p>
        </div>
      )}
    </div>
  );
}
