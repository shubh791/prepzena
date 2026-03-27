"use client";

// ─────────────────────────────────────────────────────────────
//  src/app/(app)/coding/_components/CodeEditor.jsx
//  Real code execution via /api/execute → OneCompiler API
// ─────────────────────────────────────────────────────────────

import { useState, useRef } from "react";
import {
  Copy, Check, RotateCcw,
  Play, X, Terminal,
  AlertCircle, CheckCircle2,
}                            from "lucide-react";
import { cn }                from "@/lib/utils";

// File extension map
const EXT_MAP = {
  python: "py", javascript: "js", typescript: "ts",
  java: "Main.java", cpp: "main.cpp", c: "main.c",
  html: "html", css: "css", sql: "sql",
  bash: "sh", git: "sh", react: "jsx",
  nextjs: "jsx", jquery: "js",
};

// Languages that can actually run
const RUNNABLE = [
  "python", "javascript", "typescript",
  "java", "cpp", "c", "bash",
];

// Languages that can't execute
const NOT_RUNNABLE = ["html", "css", "react", "nextjs", "git", "sql", "jquery"];

export default function CodeEditor({
  code, onChange, language, onRun,
  running, output, onClearOutput, filename,
}) {
  const [copied,   setCopied]   = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [result,   setResult]   = useState(null); // { stdout, stderr, exitCode, error, cannotRun }
  const textareaRef = useRef(null);

  const ext      = EXT_MAP[language] ?? "txt";
  const file     = `${filename ?? "solution"}.${ext}`;
  const canRun   = !NOT_RUNNABLE.includes(language);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    onChange("");
    setResult(null);
  };

  // ── Execution via OneCompiler API ────────────────────────
  const handleRun = async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setResult(null);

    try {
      const res  = await fetch("/api/execute", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ code, language }),
      });
      const data = await res.json();
      // Always show the result (error or success) — never swallow
      setResult(res.ok ? data : { error: data.error ?? `Server error ${res.status}` });
    } catch (err) {
      setResult({ error: `Network error — ${err.message}` });
    } finally {
      setIsRunning(false);
    }
  };

  // Determine output status
  const hasError   = result?.stderr || result?.error || result?.exitCode > 0;
  const hasSuccess = result && !hasError;
  const cannotRun  = result?.cannotRun;

  return (
    <div className="flex flex-col h-full bg-[#0F1117]">

      {/* ── Chrome bar ───────────────────────────────────── */}
      <div className="flex items-center gap-2 px-4 py-2.5
        bg-slate-800/70 border-b border-slate-700/40 shrink-0">
        {/* Traffic lights */}
        <span className="w-3 h-3 rounded-full bg-rose-500/80" />
        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />

        {/* Filename */}
        <span className="ml-2 text-[11px] font-mono text-slate-500 flex-1 truncate">
          {file}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button onClick={handleCopy}
            className="flex items-center gap-1 text-[10px] font-mono
              text-slate-500 hover:text-slate-200 px-2 py-1.5 rounded
              hover:bg-white/5 transition-colors">
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button onClick={handleReset}
            className="flex items-center gap-1 text-[10px] font-mono
              text-slate-500 hover:text-slate-200 px-2 py-1.5 rounded
              hover:bg-white/5 transition-colors">
            <RotateCcw size={11} /> Reset
          </button>
        </div>
      </div>

      {/* ── Code textarea ─────────────────────────────────── */}
      <div className="flex-1 overflow-hidden relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={`// Write your ${language} solution here...`}
          className="absolute inset-0 w-full h-full bg-transparent
            text-slate-200 font-mono text-[13px] leading-[1.8]
            p-4 resize-none focus:outline-none selection:bg-teal-500/30
            placeholder:text-slate-700"
          style={{ tabSize: 2 }}
          onKeyDown={(e) => {
            // Tab → 2 spaces
            if (e.key === "Tab") {
              e.preventDefault();
              const s   = e.target.selectionStart;
              const end = e.target.selectionEnd;
              const val = code.substring(0, s) + "  " + code.substring(end);
              onChange(val);
              requestAnimationFrame(() => {
                e.target.selectionStart = e.target.selectionEnd = s + 2;
              });
            }
            // Ctrl/Cmd + Enter → run
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              if (canRun && !isRunning) handleRun();
            }
          }}
        />
      </div>

      {/* ── Output panel ──────────────────────────────────── */}
      {result && (
        <div className="border-t border-slate-700/40 bg-slate-900 shrink-0
          max-h-60 flex flex-col">

          {/* Output header */}
          <div className="flex items-center gap-2 px-4 py-2
            border-b border-slate-700/30 shrink-0">
            <div className="flex items-center gap-2 flex-1">
              <Terminal size={12} className={
                cannotRun  ? "text-amber-400" :
                hasError   ? "text-rose-400"  :
                             "text-teal-400"
              } />
              <span className={cn(
                "text-[10px] font-mono uppercase tracking-wider font-semibold",
                cannotRun  ? "text-amber-400" :
                hasError   ? "text-rose-400"  :
                             "text-teal-400"
              )}>
                {cannotRun  ? "Cannot Execute" :
                 hasError   ? "Error"          :
                              "Output"}
              </span>
              {result.exitCode !== undefined && result.exitCode !== null && (
                <span className={cn(
                  "text-[9px] font-mono px-1.5 py-0.5 rounded",
                  result.exitCode === 0
                    ? "text-teal-400 bg-teal-400/10"
                    : "text-rose-400 bg-rose-400/10"
                )}>
                  exit {result.exitCode}
                </span>
              )}
              {result.version && (
                <span className="text-[9px] font-mono text-slate-600">
                  {result.language} {result.version}
                </span>
              )}
            </div>
            {/* Close output */}
            <button
              onClick={() => setResult(null)}
              className="text-slate-600 hover:text-rose-400 transition-colors
                w-5 h-5 flex items-center justify-center rounded
                hover:bg-rose-400/10"
              aria-label="Close output"
            >
              <X size={13} />
            </button>
          </div>

          {/* Output content */}
          <div className="overflow-y-auto flex-1 p-4 space-y-2">

            {/* Cannot run message */}
            {cannotRun && (
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <pre className="text-[12px] font-mono text-amber-300 leading-relaxed
                  whitespace-pre-wrap">
                  {result.message}
                </pre>
              </div>
            )}

            {/* Network/API error */}
            {result.error && !cannotRun && (
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-rose-400 shrink-0 mt-0.5" />
                <p className="text-[12px] font-mono text-rose-300">{result.error}</p>
              </div>
            )}

            {/* Stderr / compile errors */}
            {result.stderr && (
              <div>
                {result.stderr.trim() && (
                  <pre className="text-[12px] font-mono text-rose-300 leading-relaxed
                    whitespace-pre-wrap">
                    {result.stderr}
                  </pre>
                )}
              </div>
            )}

            {/* Stdout — actual program output */}
            {result.stdout !== undefined && result.stdout !== null && (
              <div>
                {result.stdout.trim() ? (
                  <pre className="text-[13px] font-mono text-emerald-300 leading-[1.8]
                    whitespace-pre-wrap">
                    {result.stdout}
                  </pre>
                ) : (
                  !result.stderr && !result.error && !cannotRun && (
                    <p className="text-[12px] font-mono text-slate-500 italic">
                      (no output)
                    </p>
                  )
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* ── Bottom run bar ────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2.5
        bg-slate-800/50 border-t border-slate-700/30 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-slate-600">
            {canRun ? "Ctrl+Enter to run · Tab for indent" : `${language} runs locally only`}
          </span>
        </div>

        {canRun ? (
          <button
            onClick={handleRun}
            disabled={isRunning || !code.trim()}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400
              active:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed
              text-slate-900 font-bold text-xs px-5 py-2 rounded-lg
              transition-all duration-150 min-w-20 justify-center"
          >
            {isRunning ? (
              <>
                <span className="w-3 h-3 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin shrink-0" />
                Running
              </>
            ) : (
              <>
                <Play size={12} />
                Run
              </>
            )}
          </button>
        ) : (
          <span className="text-[10px] font-mono text-slate-600 bg-slate-800
            border border-slate-700 px-3 py-1.5 rounded-lg">
            Use local editor
          </span>
        )}
      </div>

    </div>
  );
}