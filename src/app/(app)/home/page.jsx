// src/app/(app)/home/page.jsx
// Server component — always dynamic so stats are always fresh

export const dynamic  = "force-dynamic";
export const revalidate = 0;

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect }          from "next/navigation";
import Link                  from "next/link";
import { prisma }            from "@/lib/prisma";
import {
  BookOpen, Code2, Brain, FileText,
  Flame, Trophy, ChevronRight, ArrowRight,
  Zap, TrendingUp, CheckCircle2, Rocket,
}                            from "lucide-react";
import WeeklyGoalCard        from "./_components/WeeklyGoalCard";

export const metadata = {
  title:       "Dashboard — Prepzena",
  description: "Your personalized learning dashboard.",
};

const COLORS = {
  teal:    { bg:"bg-teal-50",    border:"border-teal-100",    text:"text-teal-700",    bar:"bg-teal-500",    hero:"from-teal-500   to-emerald-500" },
  violet:  { bg:"bg-violet-50",  border:"border-violet-100",  text:"text-violet-700",  bar:"bg-violet-500",  hero:"from-violet-500 to-purple-600"  },
  amber:   { bg:"bg-amber-50",   border:"border-amber-100",   text:"text-amber-700",   bar:"bg-amber-500",   hero:"from-amber-500  to-orange-500"  },
  rose:    { bg:"bg-rose-50",    border:"border-rose-100",    text:"text-rose-700",    bar:"bg-rose-500",    hero:"from-rose-500   to-pink-500"    },
  blue:    { bg:"bg-blue-50",    border:"border-blue-100",    text:"text-blue-700",    bar:"bg-blue-500",    hero:"from-blue-500   to-indigo-500"  },
  emerald: { bg:"bg-emerald-50", border:"border-emerald-100", text:"text-emerald-700", bar:"bg-emerald-500", hero:"from-emerald-500 to-teal-500"  },
  indigo:  { bg:"bg-indigo-50",  border:"border-indigo-100",  text:"text-indigo-700",  bar:"bg-indigo-500",  hero:"from-indigo-500 to-blue-600"   },
};

// Returns array of 7 booleans (Sun→Sat) — only days with actual completed notes this week.
// No streak backfill: must match monthly calendar which uses the same source of truth.
function buildWeekActivity(progressRecords) {
  const now  = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const activeDays = new Set();
  for (const p of progressRecords) {
    if (p.completed && p.updatedAt) {
      const d = new Date(p.updatedAt);
      if (d >= weekStart) activeDays.add(d.getDay());
    }
  }

  return Array.from({ length: 7 }, (_, i) => activeDays.has(i));
}

// Build monthly calendar data
function buildMonthCalendar(progressRecords) {
  const now   = new Date();
  const year  = now.getFullYear();
  const month = now.getMonth();

  // Only mark days where the user actually completed a note — no default "today active"
  const activeDates = new Set();
  for (const p of progressRecords) {
    if (p.completed && p.updatedAt) {
      const d = new Date(p.updatedAt);
      if (d.getFullYear() === year && d.getMonth() === month) {
        activeDates.add(d.getDate());
      }
    }
  }

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return { activeDates, firstDay, daysInMonth, today: now.getDate(), month, year };
}

const DAY_LABELS   = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES  = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default async function HomePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const clerkUser = await currentUser();
  const firstName = clerkUser?.firstName ?? "there";

  const [dbUser, topics, completedProgress, recentlyCompleted] = await Promise.all([
    prisma.user.findUnique({
      where:  { clerkId: userId },
      select: { isPremium: true, streak: true, lastSeen: true },
    }).catch(() => null),

    prisma.topic.findMany({
      orderBy: { order: "asc" },
      select: {
        id:          true,
        title:       true,
        slug:        true,
        description: true,
        icon:        true,
        color:       true,
        order:       true,
        notes: {
          select:  { id: true, slug: true, title: true, order: true, isPremium: true },
          orderBy: { order: "asc" },
        },
        _count: { select: { notes: true } },
      },
    }).catch(() => []),

    // All progress including updatedAt for week/month tracking
    prisma.progress.findMany({
      where: { user: { clerkId: userId } },
      select: { noteId: true, quizScore: true, completed: true, updatedAt: true },
    }).catch(() => []),

    // Recently completed — parallel with everything else
    prisma.progress.findMany({
      where:   { user: { clerkId: userId }, completed: true },
      orderBy: { updatedAt: "desc" },
      take:    3,
      select:  {
        updatedAt: true,
        note: {
          select: {
            id:    true,
            title: true,
            slug:  true,
            topic: { select: { title: true, slug: true, color: true, icon: true } },
          },
        },
      },
    }).catch(() => []),
  ]);

  const isPremium = dbUser?.isPremium ?? false;
  const streak    = dbUser?.streak    ?? 0;

  const completedSet  = new Set(completedProgress.filter(p => p.completed).map(p => p.noteId));
  const notesRead     = completedSet.size;
  const quizScores    = completedProgress.filter(p => p.quizScore != null);
  const avgScore      = quizScores.length
    ? Math.round(quizScores.reduce((s, p) => s + p.quizScore, 0) / quizScores.length)
    : 0;

  const weekActivity = buildWeekActivity(completedProgress);
  const daysThisWeek = weekActivity.filter(Boolean).length;
  const todayIdx     = new Date().getDay();
  const calendarData = buildMonthCalendar(completedProgress);

  const topicStats = topics.map(topic => {
    const total     = topic.notes.length;
    const completed = topic.notes.filter(n => completedSet.has(n.id)).length;
    const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { ...topic, completed, total, pct };
  });

  const ongoingTopic =
    topicStats.find(t => t.pct > 0 && t.pct < 100) ??
    topicStats.find(t => t.pct === 0) ??
    topicStats[0] ??
    null;

  const nextNote = ongoingTopic?.notes.find(n => !completedSet.has(n.id)) ?? null;

  const isNewUser = notesRead === 0;

  const STATS = [
    { label:"Day Streak",  value: streak,          unit:"days",      Icon:Flame,      bg:"bg-amber-50",  text:"text-amber-600",  border:"border-amber-100",  href:null          },
    { label:"Notes Done",  value: notesRead,        unit:"completed", Icon:BookOpen,   bg:"bg-teal-50",   text:"text-teal-600",   border:"border-teal-100",   href:"/notes"      },
    { label:"Quiz Avg",    value:`${avgScore}%`,    unit:"accuracy",  Icon:Trophy,     bg:"bg-violet-50", text:"text-violet-600", border:"border-violet-100", href:"/quiz"       },
    { label:"Topics",      value: topics.length,    unit:"available", Icon:TrendingUp, bg:"bg-rose-50",   text:"text-rose-600",   border:"border-rose-100",   href:"/notes"      },
  ];

  const oc = ongoingTopic ? (COLORS[ongoingTopic.color] ?? COLORS.teal) : COLORS.teal;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-mono tracking-widest uppercase text-slate-400">Dashboard</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-sm text-slate-500">
            {streak > 0
              ? `🔥 ${streak}-day streak — keep it going!`
              : "Start reading a note to build your streak 🚀"}
          </p>
        </div>
        {!isPremium && (
          <Link href="/pricing" aria-label="Unlock Premium"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600
              hover:from-teal-700 hover:to-emerald-700 text-white text-sm font-bold
              px-5 py-2.5 rounded-xl shadow-md shadow-teal-200/50 hover:-translate-y-px
              transition-all shrink-0">
            <Zap size={14} /> Unlock All Access · ₹99
          </Link>
        )}
      </div>

      {/* ── STATS (clickable) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, unit, Icon, bg, text, border, href }) => {
          const card = (
            <div className={`bg-white border ${border} rounded-2xl p-5
              hover:shadow-md transition-shadow ${href ? "cursor-pointer" : ""}`}>
              <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${bg} ${text} mb-3`}>
                <Icon size={17} />
              </div>
              <p className="text-2xl font-bold text-slate-900 leading-none mb-1"
                style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>{value}</p>
              <p className="text-xs text-slate-400 font-mono">{unit}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
            </div>
          );
          return href
            ? <Link key={label} href={href} aria-label={`${label}: ${value}`}>{card}</Link>
            : <div key={label}>{card}</div>;
        })}
      </div>

      {/* ── PROGRESS SUMMARY — mobile only (top position) ── */}
      {notesRead > 0 && (
        <div className="lg:hidden bg-white border border-slate-100 rounded-2xl p-6">
          <h2 className="text-base font-bold text-slate-900 mb-5"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            Progress Summary
          </h2>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-teal-600"
                style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>{notesRead}</p>
              <p className="text-xs text-slate-400 font-mono mt-1">Notes completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-violet-600"
                style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>{avgScore}%</p>
              <p className="text-xs text-slate-400 font-mono mt-1">Quiz average</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600"
                style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
                {topicStats.filter(t => t.pct === 100).length}
              </p>
              <p className="text-xs text-slate-400 font-mono mt-1">Topics finished</p>
            </div>
          </div>
        </div>
      )}

      {/* ── WEEKLY GOAL + MONTHLY CALENDAR TOGGLE ── */}
      <WeeklyGoalCard
        weekActivity={weekActivity}
        daysThisWeek={daysThisWeek}
        todayIdx={todayIdx}
        notesRead={notesRead}
        calendarData={{
          activeDates: Array.from(calendarData.activeDates),
          firstDay:    calendarData.firstDay,
          daysInMonth: calendarData.daysInMonth,
          today:       calendarData.today,
          month:       calendarData.month,
          year:        calendarData.year,
        }}
      />

      {/* ── ONBOARDING CARD (new users) OR CONTINUE LEARNING ── */}
      {isNewUser ? (
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-6
          flex flex-col sm:flex-row sm:items-center gap-5 relative overflow-hidden shadow-lg">
          <div className="absolute right-0 top-0 w-64 h-full opacity-[0.07]"
            style={{ backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"20px 20px" }} />
          <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30
            flex items-center justify-center text-3xl shrink-0">
            <Rocket size={28} className="text-white" />
          </div>
          <div className="flex-1 relative z-10">
            <p className="text-xs font-mono text-white/60 uppercase tracking-widest mb-1">Getting started</p>
            <h3 className="text-xl font-bold text-white mb-1"
              style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
              Start your learning journey 🚀
            </h3>
            <p className="text-sm text-white/70">
              Pick a topic, read your first note, and mark it complete to begin tracking your progress.
            </p>
          </div>
          <Link href="/notes" aria-label="Start learning"
            className="inline-flex items-center gap-2 bg-white hover:bg-white/90
              text-slate-900 font-bold text-sm px-5 py-3 rounded-xl
              transition-all hover:-translate-y-px shrink-0 relative z-10 shadow-md">
            Start Learning <ArrowRight size={15} />
          </Link>
        </div>
      ) : ongoingTopic ? (
        <div className={`bg-gradient-to-r ${oc.hero} rounded-2xl p-6
          flex flex-col sm:flex-row sm:items-center gap-5
          relative overflow-hidden shadow-lg`}>
          <div className="absolute right-0 top-0 w-64 h-full opacity-[0.07]"
            style={{ backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize:"20px 20px" }} />

          <span className="text-5xl shrink-0">{ongoingTopic.icon ?? "📚"}</span>

          <div className="flex-1 space-y-2 relative z-10 min-w-0">
            <p className="text-xs font-mono text-white/60 uppercase tracking-widest">
              {ongoingTopic.pct > 0 ? "Continue where you left off" : "Start learning"}
            </p>
            <h3 className="text-xl font-bold text-white"
              style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
              {ongoingTopic.title}
            </h3>
            {nextNote && (
              <p className="text-sm text-white/70 truncate">Next: {nextNote.title}</p>
            )}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width:`${ongoingTopic.pct}%` }} />
              </div>
              <span className="text-sm font-bold text-white shrink-0">{ongoingTopic.pct}%</span>
            </div>
            <p className="text-xs text-white/50 font-mono">
              {ongoingTopic.completed}/{ongoingTopic.total} notes completed
            </p>
          </div>

          <Link
            href={nextNote ? `/notes/${nextNote.slug}` : `/notes?topic=${ongoingTopic.slug}`}
            aria-label={ongoingTopic.pct > 0 ? "Continue learning" : "Start learning"}
            className="inline-flex items-center gap-2 bg-white hover:bg-white/90
              text-slate-900 font-bold text-sm px-5 py-3 rounded-xl
              transition-all hover:-translate-y-px shrink-0 relative z-10 shadow-md">
            {ongoingTopic.pct > 0 ? "Continue" : "Start"} <ArrowRight size={15} />
          </Link>
        </div>
      ) : null}

      {/* ── RECENTLY COMPLETED ── */}
      {recentlyCompleted.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900"
              style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
              Recently Completed
            </h2>
            <Link href="/notes" className="flex items-center gap-1 text-sm text-teal-600 font-semibold hover:text-teal-700">
              All notes <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {recentlyCompleted.map(({ note, updatedAt }) => {
              if (!note) return null;
              const c = COLORS[note.topic?.color] ?? COLORS.teal;
              return (
                <Link key={note.id} href={`/notes/${note.slug}`}
                  aria-label={`Re-read ${note.title}`}
                  className="group flex items-center gap-3 bg-white border border-slate-100
                    rounded-2xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className={`w-9 h-9 rounded-xl ${c.bg} border ${c.border}
                    flex items-center justify-center text-lg shrink-0`}>
                    {note.topic?.icon ?? "📚"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{note.title}</p>
                    <p className="text-xs text-slate-400 truncate">{note.topic?.title}</p>
                  </div>
                  <CheckCircle2 size={15} className="text-teal-500 shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ALL TOPICS with REAL progress bars ── */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            All Topics
          </h2>
          <Link href="/notes" aria-label="Browse all topics"
            className="flex items-center gap-1 text-sm text-teal-600 font-semibold hover:text-teal-700">
            Browse all <ChevronRight size={14} />
          </Link>
        </div>

        {topics.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
            <BookOpen size={36} className="mx-auto mb-3 text-slate-300" />
            <p className="text-sm text-slate-400">
              No topics yet — run{" "}
              <code className="text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">npx prisma db seed</code>
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicStats.map(topic => {
              const c = COLORS[topic.color] ?? COLORS.teal;
              return (
                <Link key={topic.slug} href={`/notes?topic=${topic.slug}`}
                  aria-label={`${topic.title} — ${topic.pct}% complete`}
                  className="group bg-white border border-slate-100 rounded-2xl p-5
                    hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border}
                      flex items-center justify-center text-xl`}>
                      {topic.icon ?? "📚"}
                    </div>
                    {topic.pct === 100 ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-semibold
                        text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2 py-0.5">
                        <CheckCircle2 size={9} /> Done
                      </span>
                    ) : (
                      <span className={`text-[10px] font-mono font-semibold
                        ${c.text} ${c.bg} border ${c.border} rounded-full px-2 py-0.5`}>
                        {topic._count.notes} notes
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 mb-1"
                    style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
                    {topic.title}
                  </h3>
                  {topic.description && (
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                      {topic.description}
                    </p>
                  )}

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>{topic.completed}/{topic.total} completed</span>
                      <span>{topic.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${c.bar} rounded-full transition-all duration-500`}
                        style={{ width: `${topic.pct}%` }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ── PRACTICE ── */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-5"
          style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
          Practice
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label:"Coding",  sub:"Solve problems live",     href:"/coding", Icon:Code2,    bg:"bg-violet-50", border:"border-violet-100", ic:"text-violet-600" },
            { label:"Quizzes", sub:"Test your knowledge",     href:"/quiz",   Icon:Brain,    bg:"bg-amber-50",  border:"border-amber-100",  ic:"text-amber-600"  },
            { label:"PYQs",    sub:"University past papers",  href:"/pyqs",   Icon:FileText, bg:"bg-rose-50",   border:"border-rose-100",   ic:"text-rose-600"   },
          ].map(({ label, sub, href, Icon, bg, border, ic }) => (
            <Link key={href} href={href} aria-label={label}
              className="group flex items-center gap-4 bg-white border border-slate-100
                rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className={`w-11 h-11 rounded-xl ${bg} border ${border} flex items-center justify-center shrink-0`}>
                <Icon size={20} className={ic} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800">{label}</p>
                <p className="text-xs text-slate-400">{sub}</p>
              </div>
              <ArrowRight size={15} className="text-slate-200 group-hover:text-teal-500
                group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* ── OVERALL PROGRESS SUMMARY — desktop only (bottom position) ── */}
      {notesRead > 0 && (
        <div className="hidden lg:block bg-white border border-slate-100 rounded-2xl p-6">
          <h2 className="text-base font-bold text-slate-900 mb-5"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            Progress Summary
          </h2>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-teal-600"
                style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>{notesRead}</p>
              <p className="text-xs text-slate-400 font-mono mt-1">Notes completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-violet-600"
                style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>{avgScore}%</p>
              <p className="text-xs text-slate-400 font-mono mt-1">Quiz average</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600"
                style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
                {topicStats.filter(t => t.pct === 100).length}
              </p>
              <p className="text-xs text-slate-400 font-mono mt-1">Topics finished</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
