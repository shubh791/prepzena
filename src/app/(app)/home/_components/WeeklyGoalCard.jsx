"use client";
// src/app/(app)/home/_components/WeeklyGoalCard.jsx

import { useState } from "react";
import { CalendarDays, Flame, Target, TrendingUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DAY_SHORT   = ["S","M","T","W","T","F","S"];
const DAY_FULL    = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTH_NAMES = ["January","February","March","April","May","June",
                     "July","August","September","October","November","December"];
const GOAL = 5;

export default function WeeklyGoalCard({ weekActivity, daysThisWeek, todayIdx, calendarData, notesRead }) {
  const [showCal, setShowCal] = useState(false);

  const { activeDates: activeDatesArr, firstDay, daysInMonth, today, month, year } = calendarData;
  const activeDates = new Set(activeDatesArr);

  const goalPct         = Math.min(100, Math.round((daysThisWeek / GOAL) * 100));
  const activeDaysCount = activeDates.size;
  const attendancePct   = today > 0 && notesRead > 0
    ? Math.round((activeDaysCount / today) * 100) : 0;

  // Current streak from today backwards
  let monthStreak = 0;
  for (let d = today; d >= 1; d--) {
    if (activeDates.has(d)) monthStreak++;
    else break;
  }

  const status =
    daysThisWeek >= GOAL ? { label:"Goal reached! 🔥", cls:"text-teal-700 bg-teal-50 border-teal-200" } :
    daysThisWeek >= 3    ? { label:"Good pace ⚡",       cls:"text-amber-700 bg-amber-50 border-amber-200" } :
                           { label:"Keep going 📅",      cls:"text-slate-600 bg-slate-50 border-slate-200" };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">

      {/* ── Weekly section ── */}
      <div className="p-5 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
              <Target size={16} className="text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800"
                style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
                Weekly Goal
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                {daysThisWeek}/{GOAL} days · target {GOAL}/week
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={cn("hidden sm:inline text-xs font-bold px-2.5 py-1 rounded-full border font-mono", status.cls)}>
              {status.label}
            </span>
            <button
              onClick={() => setShowCal(p => !p)}
              aria-label={showCal ? "Close monthly report" : "Show monthly report"}
              className={cn(
                "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all",
                showCal
                  ? "bg-slate-900 text-white border-slate-800"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"
              )}>
              {showCal ? <X size={12} /> : <CalendarDays size={12} />}
              {showCal ? "Close" : "Monthly Report"}
            </button>
          </div>
        </div>

        {/* Goal progress bar */}
        <div className="space-y-1.5">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700",
                daysThisWeek >= GOAL ? "bg-gradient-to-r from-teal-500 to-emerald-500" :
                daysThisWeek >= 3    ? "bg-amber-400" : "bg-slate-300"
              )}
              style={{ width:`${goalPct}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 font-mono text-right">{goalPct}% of weekly goal</p>
        </div>

        {/* Day tiles — fixed 40px tiles, centered row, same on all screen sizes */}
        <div className="flex justify-between gap-1 sm:gap-2 max-w-sm mx-auto w-full">
          {DAY_FULL.map((dayFull, i) => {
            const active   = weekActivity[i];
            const isToday  = i === todayIdx;
            const isFuture = i > todayIdx;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-200",
                  active
                    ? "bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-md shadow-teal-200/60"
                    : isToday
                    ? "bg-white border-2 border-dashed border-teal-400 text-teal-500"
                    : isFuture
                    ? "bg-slate-50 border border-slate-100 text-slate-200"
                    : "bg-rose-50 border border-rose-100 text-rose-300"
                )}>
                  {active ? "✓" : isToday ? "·" : ""}
                </div>
                <span className={cn(
                  "text-[9px] font-mono",
                  isToday ? "text-teal-600 font-bold" : "text-slate-400"
                )}>
                  {DAY_SHORT[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Monthly calendar (toggle) ── */}
      {showCal && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-5 space-y-4">

          {/* Month header + stat chips */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-800"
                style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
                {MONTH_NAMES[month]} {year}
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                {activeDaysCount} active · {attendancePct}% attendance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-teal-700 bg-teal-50 border border-teal-200 rounded-xl px-3 py-1.5">
                <Flame size={11} className="text-teal-500" />
                {monthStreak}d streak
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-violet-700 bg-violet-50 border border-violet-200 rounded-xl px-3 py-1.5">
                <TrendingUp size={11} className="text-violet-500" />
                {activeDaysCount}/{today} days
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-gradient-to-br from-teal-500 to-emerald-500 inline-block" />
              Present
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-rose-100 border border-rose-100 inline-block" />
              Absent
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200 inline-block" />
              Future
            </span>
          </div>

          {/* Calendar — fixed max-width, centered, same on all screens */}
          <div className="max-w-sm mx-auto w-full space-y-1.5">
            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 gap-1">
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                <div key={d} className="text-[10px] font-mono font-semibold text-slate-400 text-center py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Date grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day       = i + 1;
                const isToday   = day === today;
                const isPresent = activeDates.has(day);
                const isPast    = day < today;
                const isFuture  = day > today;

                return (
                  <div
                    key={day}
                    title={
                      isPresent ? "Active" :
                      isToday   ? "Today" :
                      isPast && notesRead > 0 ? "No activity" : ""
                    }
                    className={cn(
                      "aspect-square rounded-lg flex items-center justify-center text-[11px] font-mono font-bold select-none transition-all",
                      isToday && isPresent
                        ? "ring-2 ring-offset-1 ring-teal-400 bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-md shadow-teal-200/50"
                        : isToday
                        ? "ring-2 ring-offset-1 ring-teal-400 bg-white text-teal-600 shadow-sm"
                        : isPresent
                        ? "bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-sm shadow-teal-200/40"
                        : isPast && notesRead > 0
                        ? "bg-rose-50 border border-rose-100 text-rose-400"
                        : isFuture
                        ? "bg-slate-50 text-slate-200"
                        : "bg-slate-50 text-slate-300"
                    )}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
