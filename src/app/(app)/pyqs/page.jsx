"use client";
// src/app/(app)/pyqs/page.jsx
// University sections with paper cards — original UI style, DB-backed via API

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText, Lock, Download, Eye, GraduationCap,
  Calendar, BookOpen, ChevronRight, Zap, Star,
  Clock, Search, Crown, CheckCircle2, ArrowRight,
  Trophy, Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── University brand config ────────────────────────────────
const UNI_CONFIG = {
  VTU:       { color:"#1e40af",  bg:"from-blue-800 to-blue-600",   badge:"bg-blue-50 text-blue-700 border-blue-200",   logoBg:"bg-blue-600",   emoji:"🎓", desc:"Visvesvaraya Technological University" },
  Mumbai:    { color:"#c2410c",  bg:"from-orange-700 to-amber-600",badge:"bg-orange-50 text-orange-700 border-orange-200",logoBg:"bg-orange-600",emoji:"🏛️", desc:"University of Mumbai" },
  SPPU:      { color:"#15803d",  bg:"from-green-800 to-emerald-600",badge:"bg-green-50 text-green-700 border-green-200", logoBg:"bg-green-600",  emoji:"📚", desc:"Savitribai Phule Pune University" },
  "Anna Uni":{ color:"#4338ca",  bg:"from-indigo-800 to-violet-600",badge:"bg-indigo-50 text-indigo-700 border-indigo-200",logoBg:"bg-indigo-600",emoji:"🏫", desc:"Anna University Chennai" },
  AKTU:      { color:"#b91c1c",  bg:"from-red-800 to-rose-600",    badge:"bg-red-50 text-red-700 border-red-200",       logoBg:"bg-red-600",    emoji:"🔬", desc:"Dr. APJ Abdul Kalam Technical University" },
  JNTU:      { color:"#6d28d9",  bg:"from-purple-800 to-violet-600",badge:"bg-purple-50 text-purple-700 border-purple-200",logoBg:"bg-purple-600",emoji:"🎯", desc:"Jawaharlal Nehru Technological University" },
  PIET:      { color:"#0f766e",  bg:"from-teal-800 to-cyan-600",   badge:"bg-teal-50 text-teal-700 border-teal-200",    logoBg:"bg-teal-600",   emoji:"⚙️", desc:"Panipat Institute of Engineering & Technology" },
  KUK:       { color:"#92400e",  bg:"from-amber-800 to-yellow-600",badge:"bg-amber-50 text-amber-700 border-amber-200", logoBg:"bg-amber-600",  emoji:"🏛️", desc:"Kurukshetra University Kurukshetra" },
  CBSE:      { color:"#be185d",  bg:"from-rose-800 to-pink-600",   badge:"bg-rose-50 text-rose-700 border-rose-200",    logoBg:"bg-rose-600",   emoji:"📋", desc:"Central Board of Secondary Education" },
};

function getCfg(uni) {
  return UNI_CONFIG[uni] ?? { color:"#475569", bg:"from-slate-700 to-slate-600", badge:"bg-slate-50 text-slate-700 border-slate-200", logoBg:"bg-slate-600", emoji:"🎓", desc:uni };
}

export default function PYQsPage() {
  const [papers,    setPapers]    = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [activeUni, setActiveUni] = useState("All");

  useEffect(() => {
    fetch("/api/pyqs")
      .then(r => r.json())
      .then(d => {
        setPapers(d.papers ?? []);
        setIsPremium(d.isPremium ?? false);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // All university names (excluding CBSE for main tabs)
  const universities = ["All", ...Array.from(new Set(papers.filter(p => p.university !== "CBSE").map(p => p.university)))];

  const filtered = papers.filter(p => {
    const matchUni  = activeUni === "All" || p.university === activeUni;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.subject.toLowerCase().includes(search.toLowerCase());
    return matchUni && matchSearch && p.university !== "CBSE";
  });

  const cbsePapers = papers.filter(p => p.university === "CBSE" && (!search || p.title.toLowerCase().includes(search.toLowerCase())));

  // Group filtered papers by university
  const grouped = filtered.reduce((acc, p) => {
    if (!acc[p.university]) acc[p.university] = [];
    acc[p.university].push(p);
    return acc;
  }, {});

  const totalPapers = papers.length;
  const uniCount    = new Set(papers.map(p => p.university)).size;
  const freePapers  = papers.filter(p => !p.isPremium).length;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-pulse">
        <div className="h-8 w-64 bg-slate-200 rounded-xl mx-auto"/>
        <div className="flex gap-2 justify-center flex-wrap">
          {[...Array(6)].map((_,i) => <div key={i} className="h-9 w-24 bg-slate-200 rounded-xl"/>)}
        </div>
        <div className="space-y-8">
          {[...Array(3)].map((_,i) => (
            <div key={i} className="rounded-3xl overflow-hidden">
              <div className="h-24 bg-slate-300"/>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-white border border-slate-100">
                {[...Array(3)].map((_,j) => <div key={j} className="h-40 bg-slate-100 rounded-2xl"/>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* ── Hero ── */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200
            rounded-full px-4 py-1.5 text-xs font-mono font-bold text-teal-700">
            <Zap size={11}/> Real exam questions · With model answers
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            Previous Year Questions
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            Actual exam papers from top universities and CBSE — with step-by-step model answers.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 text-sm text-slate-400 flex-wrap pt-1">
            <span className="flex items-center gap-1.5"><FileText size={13}/> {totalPapers} papers</span>
            <span className="flex items-center gap-1.5"><GraduationCap size={13}/> {uniCount} universities</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-teal-500"/> {freePapers} free</span>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="relative max-w-md mx-auto">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search papers or subjects…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl
              bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30
              focus:border-teal-400 placeholder:text-slate-400"
          />
        </div>

        {/* ── University filter tabs ── */}
        <div className="flex flex-wrap gap-2 justify-center">
          {universities.map(uni => {
            const cfg = getCfg(uni);
            const active = activeUni === uni;
            return (
              <button
                key={uni}
                onClick={() => setActiveUni(uni)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-semibold transition-all",
                  active
                    ? "text-white border-transparent shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                )}
                style={active && uni !== "All" ? { backgroundColor: cfg.color, borderColor: cfg.color } : active ? { backgroundColor: "#1e293b" } : {}}
              >
                {uni !== "All" && <span className="text-base leading-none">{cfg.emoji}</span>}
                {uni}
              </button>
            );
          })}
        </div>

        {/* ── University sections ── */}
        {Object.entries(grouped).length === 0 && !cbsePapers.length ? (
          <div className="text-center py-16 text-slate-400">
            <FileText size={40} className="mx-auto mb-3 opacity-30"/>
            <p className="font-semibold">No papers found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([uni, uniPapers]) => {
              const cfg = getCfg(uni);
              return (
                <UniSection key={uni} uni={uni} cfg={cfg} papers={uniPapers} isPremium={isPremium}/>
              );
            })}

            {/* CBSE section */}
            {cbsePapers.length > 0 && (activeUni === "All" || activeUni === "CBSE") && (
              <UniSection uni="CBSE" cfg={getCfg("CBSE")} papers={cbsePapers} isPremium={isPremium}/>
            )}
          </div>
        )}

        {/* ── Premium CTA ── */}
        {!isPremium && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8
            border border-teal-500/30 text-center space-y-4 max-w-2xl mx-auto">
            <Crown size={28} className="text-teal-400 mx-auto"/>
            <h3 className="text-xl font-bold text-white"
              style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
              Unlock All Papers & Model Answers
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
              Get full access to every paper with step-by-step model answers —
              one ₹99 payment, lifetime access, no subscriptions.
            </p>
            <Link href="/pricing"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500
                hover:from-teal-400 hover:to-emerald-400 text-slate-900 font-bold px-6 py-3
                rounded-xl transition-all hover:-translate-y-px shadow-lg shadow-teal-500/30 text-sm">
              <Zap size={14}/> Unlock All Access · ₹99
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

// ── University Section ────────────────────────────────────
function UniSection({ uni, cfg, papers, isPremium }) {
  return (
    <div className="rounded-3xl overflow-hidden shadow-sm border border-white/50">
      {/* Coloured header */}
      <div className={`bg-gradient-to-r ${cfg.bg} px-6 py-5 flex items-center gap-4`}>
        <div className={`${cfg.logoBg} bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center
          border border-white/20 shadow-md flex-shrink-0`}>
          <span className="text-2xl">{cfg.emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-white leading-tight"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            {uni}
          </h2>
          <p className="text-white/70 text-xs mt-0.5 truncate">{cfg.desc}</p>
        </div>
        <span className="text-xs font-mono font-bold bg-white/10 border border-white/20
          text-white rounded-full px-3 py-1 flex-shrink-0">
          {papers.length} paper{papers.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Paper cards grid */}
      <div className="bg-white border-x border-b border-slate-100 p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {papers.map(paper => (
          <PaperCard key={paper.id} paper={paper} cfg={cfg} isPremium={isPremium}/>
        ))}
      </div>
    </div>
  );
}

// ── Paper Card ────────────────────────────────────────────
function PaperCard({ paper, cfg, isPremium }) {
  const accessible = !paper.isPremium || isPremium;
  const qCount     = Array.isArray(paper.questions) ? paper.questions.length : 0;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md
      transition-all hover:-translate-y-0.5 flex flex-col gap-4">

      {/* Subject + premium badge */}
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[10px] font-mono font-bold border rounded-full px-2.5 py-0.5 ${cfg.badge}`}>
          {paper.subject}
        </span>
        {paper.isPremium ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600
            bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
            <Crown size={9}/> Premium
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-bold text-teal-600
            bg-teal-50 border border-teal-200 rounded-full px-2 py-0.5">
            <CheckCircle2 size={9}/> Free
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-800 leading-snug flex-1">{paper.title}</h3>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-1"><Calendar size={11}/>{paper.year}</span>
        <span className="flex items-center gap-1"><FileText size={11}/>{qCount} Q{qCount !== 1 ? "s" : ""}</span>
        {!paper.isPremium && (
          <span className="flex items-center gap-1 text-teal-500"><CheckCircle2 size={11}/>Solutions</span>
        )}
      </div>

      {/* CTA */}
      {accessible ? (
        <Link href={`/pyqs/${paper.slug}`}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl
            bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold text-xs
            border border-teal-200 transition-colors mt-auto">
          <Eye size={13}/> View Paper <ChevronRight size={12}/>
        </Link>
      ) : (
        <Link href="/pricing"
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl
            bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold text-xs
            border border-amber-200 transition-all mt-auto">
          <Lock size={13}/> Unlock · ₹99
        </Link>
      )}
    </div>
  );
}
