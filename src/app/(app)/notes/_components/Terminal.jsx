"use client";

/**
 * Terminal.jsx
 * ─────────────────────────────────────────────────────────────
 * src/app/(app)/notes/_components/Terminal.jsx
 *
 * Floating terminal overlay for live code execution.
 * - HIDDEN BY DEFAULT (parent sets state to null)
 * - Opens ONLY when user clicks "Try in Terminal" on a CodeBlock
 * - × button calls onClose() → parent sets state to null → disappears
 * - Calls /api/execute → real Piston API execution
 * - Shows real stdout, stderr, exit codes
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { X, RotateCcw, Copy, Check, Play, Loader2, Terminal as TermIcon } from "lucide-react";

export default function Terminal({ code, language, onClose }) {
  const [input,   setInput]   = useState(code ?? "");
  const [result,  setResult]  = useState(null);   // { stdout, stderr, exitCode, error, cannotRun }
  const [running, setRunning] = useState(false);
  const [copied,  setCopied]  = useState(false);
  const textareaRef           = useRef(null);

  // Focus textarea when terminal opens
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // NOTE: NO auto-run on mount — user must click Run or Ctrl+Enter

  /** Execute code via /api/execute → Piston API */
  const handleRun = useCallback(async () => {
    if (!input.trim() || running) return;

    setRunning(true);
    setResult(null);

    try {
      const res  = await fetch("/api/execute", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ code: input, language: language ?? "python" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({ error: data.error ?? "Execution failed" });
      } else {
        setResult(data);
      }
    } catch (err) {
      setResult({ error: `Network error: ${err.message}` });
    } finally {
      setRunning(false);
    }
  }, [input, language, running]);

  /** Copy code to clipboard */
  const handleCopy = async () => {
    await navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /** Reset to original code */
  const handleReset = () => {
    setInput(code ?? "");
    setResult(null);
  };

  /** Tab key inserts 2 spaces instead of changing focus */
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const s   = e.target.selectionStart;
      const val = input.substring(0, s) + "  " + input.substring(e.target.selectionEnd);
      setInput(val);
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = s + 2;
        }
      });
    }
    // Ctrl+Enter or Cmd+Enter → run
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleRun();
    }
  };

  const hasError   = result?.error || result?.stderr || (result?.exitCode > 0);
  const hasSuccess = result && !result.error && !result.cannotRun;

  return (
    /* Fixed floating overlay — bottom of screen, above everything */
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4
        pointer-events-none flex justify-center"
      role="dialog"
      aria-label="Code terminal"
    >
      <div
        className="pointer-events-auto w-full max-w-2xl rounded-2xl
          overflow-hidden border border-slate-700/60
          shadow-2xl shadow-black/60 bg-[#0F1117]
          animate-in slide-in-from-bottom-4 duration-200"
      >

        {/* ── Chrome / Title bar ───────────────────────────── */}
        <div className="flex items-center gap-2 px-4 py-2.5
          bg-slate-800/80 border-b border-slate-700/40">

          {/* Traffic lights */}
          <span className="w-3 h-3 rounded-full bg-rose-500/80 shrink-0" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 shrink-0" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 shrink-0" />

          {/* Label */}
          <div className="flex items-center gap-1.5 ml-2 flex-1">
            <TermIcon size={12} className="text-teal-400" />
            <span className="text-[11px] font-mono text-slate-400">
              terminal — {language ?? "python"}
            </span>
            {running && (
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse ml-1" />
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[10px] font-mono
                text-slate-500 hover:text-slate-300 px-2 py-1 rounded
                hover:bg-white/5 transition-colors"
              aria-label="Copy code"
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? "Copied" : "Copy"}
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[10px] font-mono
                text-slate-500 hover:text-slate-300 px-2 py-1 rounded
                hover:bg-white/5 transition-colors"
              aria-label="Reset to original code"
            >
              <RotateCcw size={11} /> Reset
            </button>

            {/* ── × CLOSE BUTTON ─────────────────────────── */}
            {/* Calls onClose() → parent sets terminal to null → unmounts */}
            <button
              onClick={onClose}
              className="flex items-center justify-center w-6 h-6 rounded
                text-slate-500 hover:text-rose-400 hover:bg-rose-400/10
                transition-colors ml-1"
              aria-label="Close terminal"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* ── Editable code area ───────────────────────────── */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          rows={Math.min(Math.max(input.split("\n").length + 1, 4), 12)}
          className="w-full bg-transparent text-slate-200 font-mono
            text-[13px] leading-[1.8] px-4 pt-3 pb-2
            resize-none focus:outline-none selection:bg-teal-500/30"
          style={{ tabSize: 2 }}
          aria-label="Code editor"
        />

        {/* ── Output ───────────────────────────────────────── */}
        {result && (
          <div className="border-t border-slate-700/40 bg-slate-900/60 px-4 py-3">

            {/* Output label */}
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                result.cannotRun ? "text-amber-400" :
                hasError         ? "text-rose-400"  :
                                   "text-teal-400"
              }`}>
                {result.cannotRun ? "Cannot Execute" : hasError ? "Error" : "Output"}
              </span>

              {result.exitCode !== undefined && !result.cannotRun && (
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  result.exitCode === 0
                    ? "bg-teal-400/10 text-teal-400"
                    : "bg-rose-400/10 text-rose-400"
                }`}>
                  exit {result.exitCode}
                </span>
              )}

              {result.version && (
                <span className="text-[9px] font-mono text-slate-600 ml-auto">
                  {result.language} {result.version}
                </span>
              )}
            </div>

            {/* Cannot run message */}
            {result.cannotRun && (
              <pre className="text-[12px] font-mono text-amber-300 leading-relaxed
                whitespace-pre-wrap max-h-28 overflow-y-auto">
                {result.message}
              </pre>
            )}

            {/* API/network error */}
            {result.error && !result.cannotRun && (
              <pre className="text-[12px] font-mono text-rose-300 leading-relaxed
                whitespace-pre-wrap max-h-28 overflow-y-auto">
                {result.error}
              </pre>
            )}

            {/* Stderr (compile errors, runtime errors) */}
            {result.stderr && result.stderr.trim() && (
              <pre className="text-[12px] font-mono text-rose-300 leading-relaxed
                whitespace-pre-wrap max-h-28 overflow-y-auto">
                {result.stderr}
              </pre>
            )}

            {/* Stdout — the actual program output */}
            {result.stdout !== undefined && !result.error && !result.cannotRun && (
              result.stdout.trim() ? (
                <pre className="text-[13px] font-mono text-emerald-300 leading-[1.8]
                  whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {result.stdout}
                </pre>
              ) : !result.stderr && (
                <p className="text-[12px] font-mono text-slate-500 italic">
                  (no output)
                </p>
              )
            )}
          </div>
        )}

        {/* ── Bottom run bar ───────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-2.5
          bg-slate-800/50 border-t border-slate-700/30">
          <span className="text-[10px] font-mono text-slate-600">
            Ctrl+Enter to run · Edit code above · Esc or × to close
          </span>
          <button
            onClick={handleRun}
            disabled={running || !input.trim()}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400
              active:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed
              text-slate-900 font-bold text-xs px-5 py-2 rounded-lg
              transition-all duration-150"
            aria-label="Run code"
          >
            {running
              ? <Loader2 size={12} className="animate-spin" />
              : <Play size={12} />
            }
            {running ? "Running..." : "Run"}
          </button>
        </div>

      </div>
    </div>
  );
}