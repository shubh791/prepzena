"use client";

// src/app/(app)/coding/_components/LanguageTabs.jsx

import { cn } from "@/lib/utils";

const LANGUAGES = [
  { id: "python",     label: "Python",     icon: "🐍" },
  { id: "javascript", label: "JavaScript", icon: "⚡" },
  { id: "java",       label: "Java",       icon: "☕" },
  { id: "cpp",        label: "C++",        icon: "⚙️" },
  { id: "c",          label: "C",          icon: "🔧" },
];

export default function LanguageTabs({ activeLang, onChange }) {
  return (
    <div className="bg-white border-b border-slate-200 shrink-0">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none px-4 py-2">
        {LANGUAGES.map((l) => (
          <button
            key={l.id}
            onClick={() => onChange(l.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0",
              activeLang === l.id
                ? "bg-slate-900 text-white"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            )}
          >
            <span className="text-sm leading-none">{l.icon}</span>
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}