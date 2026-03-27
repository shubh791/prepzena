"use client";
// src/app/(app)/home/_components/WeeklyGoalCard.jsx
// Weekly goal strip + togglable monthly calendar — client for state

import { useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DAY_LABELS  = ["S","M","T","W","T","F","S"];
const WEEK_FULL   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function WeeklyGoalCard({ weekActivity, daysThisWeek, todayIdx, calendarData }) {
  const [showCal, setShowCal] = useState(false);

  const { activeDates: activeDatesArr, firstDay, daysInMonth, today, month, year } = calendarData;
  const activeDates = new Set(activeDatesArr);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-800"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            Weekly Goal
          </p>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {daysThisWeek}/7 days studied this week
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-xs font-bold px-2.5 py-1 rounded-full font-mono",
            daysThisWeek >= 5
              ? "text-teal-700 bg-teal-50 border border-teal-200"
              : daysThisWeek >= 3
              ? "text-amber-700 bg-amber-50 border border-amber-200"
              : "text-slate-500 bg-slate-50 border border-slate-200"
          )}>
            {daysThisWeek >= 5 ? "🔥 On fire!" : daysThisWeek >= 3 ? "⚡ Good pace" : "📅 Keep going"}
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

      {/* ── Weekly strip ── */}
      <div className="flex gap-2">
        {DAY_LABELS.map((day, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div className={cn(
              "w-full h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all",
              weekActivity[i]
                ? "bg-teal-500 text-white shadow-sm shadow-teal-200"
                : i === todayIdx
                ? "bg-slate-100 border-2 border-dashed border-teal-300 text-teal-500"
                : "bg-slate-100 text-slate-300"
            )}>
              {weekActivity[i] ? "✓" : i === todayIdx ? "·" : ""}
            </div>
            <span className={cn(
              "text-[10px] font-mono",
              i === todayIdx ? "text-teal-600 font-bold" : "text-slate-400"
            )}>
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* ── Monthly calendar (toggle) ── */}
      {showCal && (
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              {MONTH_NAMES[month]} {year}
              <span className="ml-2 font-mono font-normal text-slate-400">
                · {activeDates.size} active day{activeDates.size !== 1 ? "s" : ""}
              </span>

            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />Present
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300 inline-block" />Absent
              </span>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1">
            {WEEK_FULL.map(d => (
              <div key={d} className="text-[9px] font-mono text-slate-400 text-center pb-1">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day       = i + 1;
              const isToday   = day === today;
              const isPresent = activeDates.has(day);
              const isPast    = day < today;
              return (
                <div key={day} className={cn(
                  "aspect-square rounded-lg flex items-center justify-center text-[11px] font-mono font-semibold",
                  isToday   ? "ring-2 ring-teal-400 ring-offset-1" : "",
                  isPresent ? "bg-blue-500 text-white shadow-sm shadow-blue-200" :
                  isPast    ? "bg-rose-100 text-rose-400" :
                              "bg-slate-50 text-slate-300"
                )}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
