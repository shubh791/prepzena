// src/app/not-found.jsx
// Custom 404 — uses router.back() for instant navigation (no page reload)
"use client";

import { useRouter } from "next/navigation";
import Link          from "next/link";
import { ArrowLeft, BookOpen, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">

        {/* Big 404 */}
        <div className="relative">
          <p className="text-[120px] font-black text-slate-100 leading-none select-none"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-lg
              flex items-center justify-center">
              <BookOpen size={36} className="text-teal-500" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            Page not found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            This note or page doesn't exist. It may have been moved or the link is incorrect.
          </p>
        </div>

        {/* Debug hint */}
        <div className="bg-slate-900 rounded-xl p-4 text-left font-mono text-xs text-slate-300 space-y-1">
          <p><span className="text-rose-400">Error:</span> PageNotFoundError</p>
          <p className="text-slate-500">// hint: try /notes instead 👇</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-center">
          {/* Go back — instant, no reload */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
              border border-slate-200 bg-white text-slate-700 font-semibold text-sm
              hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <ArrowLeft size={15} /> Go Back
          </button>

          <Link href="/home"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
              bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm
              transition-all">
            <Home size={15} /> Dashboard
          </Link>

          <Link href="/notes"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
              border border-teal-200 bg-teal-50 text-teal-700 font-semibold text-sm
              hover:bg-teal-100 transition-all">
            <BookOpen size={15} /> Browse Notes
          </Link>
        </div>

      </div>
    </div>
  );
}