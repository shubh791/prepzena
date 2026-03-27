"use client";

/**
 * CodeBlock.jsx
 * ─────────────────────────────────────────────────────────────
 * src/app/(app)/notes/_components/CodeBlock.jsx
 *
 * Displays a syntax-highlighted code block with:
 * - Copy button in the chrome bar
 * - "Try in Terminal" button BELOW the code (not inside it)
 *   → clicking calls onTryInTerminal(code, lang) in parent
 *   → parent sets terminal state → Terminal overlay appears
 *
 * Terminal is NOT rendered here. This component only triggers it.
 */

import { useState } from "react";
import { Copy, Check, Play } from "lucide-react";

/** Display labels for languages */
const LANG_LABELS = {
  python: "Python", javascript: "JavaScript", js: "JavaScript",
  typescript: "TypeScript", ts: "TypeScript", java: "Java",
  cpp: "C++", c: "C", html: "HTML", css: "CSS",
  sql: "SQL", bash: "Bash", shell: "Shell", jsx: "React JSX",
};

/** File extensions */
const LANG_EXT = {
  python: "py", javascript: "js", js: "js", typescript: "ts", ts: "ts",
  java: "java", cpp: "cpp", c: "c", html: "html", css: "css",
  sql: "sql", bash: "sh", shell: "sh", jsx: "jsx",
};

/** Languages that can actually run in terminal */
const RUNNABLE = ["python","javascript","js","typescript","ts","bash","shell"];

export default function CodeBlock({
  code,
  language = "python",
  filename,
  onTryInTerminal,   // (code: string, lang: string) => void — opens Terminal in parent
}) {
  const [copied, setCopied] = useState(false);

  const lang    = language.toLowerCase();
  const label   = LANG_LABELS[lang] ?? lang;
  const ext     = LANG_EXT[lang]    ?? lang;
  const file    = filename ?? `example.${ext}`;
  const canRun  = RUNNABLE.includes(lang) && !!onTryInTerminal;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/50 my-4">

      {/* ── Chrome / Title bar ─────────────────────────────── */}
      <div className="flex items-center gap-2 px-4 py-2.5
        bg-slate-800 border-b border-slate-700/40">

        {/* Traffic lights */}
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 shrink-0" />

        {/* Filename */}
        <span className="ml-2 text-[11px] font-mono text-slate-500 flex-1 truncate">
          {file}
        </span>

        {/* Language badge */}
        <span className="text-[10px] font-mono text-slate-600
          bg-slate-700/50 px-2 py-0.5 rounded shrink-0">
          {label}
        </span>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] font-mono ml-2
            text-slate-500 hover:text-slate-200 px-2 py-1 rounded
            hover:bg-white/5 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* ── Code body ──────────────────────────────────────── */}
      <pre className="bg-[#0F1117] overflow-x-auto p-5 m-0">
        <code className="text-[13px] font-mono leading-[1.8] text-slate-200
          whitespace-pre">
          {code}
        </code>
      </pre>

      {/* ── "Try in Terminal" — BELOW the code, not inside it ── */}
      {canRun && (
        <div className="bg-[#0F1117] border-t border-slate-700/40 px-5 py-3
          flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-600">
            Run this code live in your browser
          </span>
          <button
            onClick={() => onTryInTerminal(code, lang)}
            className="flex items-center gap-2 text-[11px] font-mono font-semibold
              text-teal-400 hover:text-teal-300
              bg-teal-400/10 hover:bg-teal-400/20
              border border-teal-400/20 hover:border-teal-400/30
              px-3 py-1.5 rounded-lg transition-all"
            aria-label="Try this code in the terminal"
          >
            <Play size={11} />
            Try in Terminal
          </button>
        </div>
      )}

    </div>
  );
}