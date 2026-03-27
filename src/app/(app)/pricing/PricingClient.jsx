"use client";
// src/app/(app)/pricing/PricingClient.jsx
// Two tiers: Free | Premium (₹99 one-time — all access forever)
// Cashfree payment integration

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link                    from "next/link";
import {
  CheckCircle2, X, Zap,
  Star, Sparkles, Users, Shield,
  ChevronRight, BadgeCheck, Infinity,
}                              from "lucide-react";
import { cn }                  from "@/lib/utils";

// ── Plan definitions ─────────────────────────────────────────
const FREE_FEATURES = [
  { text:"Section 1 of every topic",          ok:true  },
  { text:"First 5 notes per topic",            ok:true  },
  { text:"Basic quizzes (section 1 only)",     ok:true  },
  { text:"Code examples & VS Code tips",       ok:true  },
  { text:"Coding practice (easy problems)",    ok:true  },
  { text:"CBSE & university PYQs (questions)", ok:true  },
  { text:"Advanced sections (2, 3, 4...)",     ok:false },
  { text:"Premium quizzes & answers",          ok:false },
  { text:"FAANG interview questions",          ok:false },
  { text:"PYQ solutions",                      ok:false },
  { text:"System design notes",               ok:false },
];

const ALL_FEATURES = [
  { text:"Everything in Free",                 ok:true  },
  { text:"ALL sections unlocked (all topics)", ok:true  },
  { text:"Premium quizzes with full answers",  ok:true  },
  { text:"Top 50 FAANG interview questions",   ok:true  },
  { text:"All PYQ solutions (CBSE + Uni)",     ok:true  },
  { text:"System design patterns",             ok:true  },
  { text:"All future content forever",         ok:true  },
  { text:"Priority support",                   ok:true  },
];

// ── Feature comparison table rows ────────────────────────────
const COMPARE_ROWS = [
  { feature:"Free notes per topic",     free:"5 notes",   all:"All notes"      },
  { feature:"Sections unlocked",        free:"Section 1", all:"All sections"   },
  { feature:"Quiz access",              free:"Basic only",all:"Full + answers" },
  { feature:"FAANG interview Qs",       free:"❌",         all:"✅ All topics"  },
  { feature:"PYQ solutions",            free:"❌",         all:"✅ All"         },
  { feature:"System design",            free:"❌",         all:"✅"             },
  { feature:"Future content",           free:"Free only", all:"✅ Everything"  },
  { feature:"Price",                    free:"₹0",        all:"₹99 lifetime"  },
];

// ── Payment flow ──────────────────────────────────────────────
// Web Checkout (hosted): Cashfree redirects the entire page to their
// payment screen. After payment, they redirect back to our return_url
// (/api/payments/verify) which then redirects to /pricing?payment=success|failed.
async function initCashfree(sessionId) {
  const { load } = await import("@cashfreepayments/cashfree-js");
  const cashfree = await load({
    mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === "production" ? "production" : "sandbox",
  });
  // This call redirects the browser to Cashfree's hosted checkout page.
  // It does NOT return — the page navigates away.
  cashfree.checkout({
    paymentSessionId: sessionId,
    redirectTarget:   "_self",
  });
}

// ─────────────────────────────────────────────────────────────
//  MAIN CLIENT COMPONENT
// ─────────────────────────────────────────────────────────────
export default function PricingClient({ isPremium, userEmail, userName, paymentStatus }) {
  const router                          = useRouter();
  const [loading,      setLoading]      = useState(null);
  const [showCompare,  setShowCompare]  = useState(false);
  const [toast,        setToast]        = useState(paymentStatus);

  // Bust client-side router cache so all pages show unlocked content immediately
  useEffect(() => {
    if (paymentStatus === "success") router.refresh();
  }, [paymentStatus]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 6000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handlePay = async () => {
    if (isPremium) return;
    setLoading("all");
    try {
      const res = await fetch("/api/payments/create-order", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ plan: "all" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Order creation failed");

      // Redirect to Cashfree hosted checkout — page navigates away here.
      // loading stays "all" until the redirect; the finally block is intentionally
      // absent so there's no spinner reset before the page leaves.
      await initCashfree(data.sessionId);
    } catch (err) {
      console.error("[handlePay]", err.message);
      setLoading(null);
      setToast("failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4]">

      {/* ── TOAST ── */}
      {toast && (
        <div className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3",
          "px-5 py-3 rounded-2xl shadow-xl border text-sm font-semibold",
          "animate-in slide-in-from-top-4 duration-300",
          toast === "success"
            ? "bg-teal-600 text-white border-teal-500"
            : "bg-rose-600 text-white border-rose-500"
        )}>
          {toast === "success"
            ? <><CheckCircle2 size={16}/> Payment successful! Premium unlocked 🎉</>
            : <><X size={16}/> Payment failed. Please try again.</>
          }
          <button onClick={() => setToast(null)} className="ml-2 opacity-70 hover:opacity-100">
            <X size={14}/>
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* ── HERO ── */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200
            rounded-full px-4 py-1.5 text-xs font-bold text-teal-700">
            <Sparkles size={12}/> No subscriptions · Pay once · Access forever
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            Unlock what you need,<br/>
            <span className="text-transparent bg-clip-text
              bg-gradient-to-r from-teal-600 to-emerald-500">
              only what you need.
            </span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Start free. Unlock premium notes, quizzes, and FAANG interview questions
            when you're ready. One-time payment, lifetime access.
          </p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 text-sm text-slate-400 flex-wrap">
            <span className="flex items-center gap-1.5"><Users size={14}/> 2,400+ students</span>
            <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-400 fill-amber-400"/> 4.9/5 rating</span>
            <span className="flex items-center gap-1.5"><Shield size={14}/> Secure · Cashfree</span>
          </div>
        </div>

        {/* ── 2 PLAN CARDS ── */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">

          {/* FREE */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-7 space-y-6">
            <div>
              {!isPremium && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold
                  text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2.5 py-0.5 mb-3">
                  <BadgeCheck size={10}/> Your current plan
                </span>
              )}
              <h2 className="text-2xl font-bold text-slate-900"
                style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>Free</h2>
              <p className="text-sm text-slate-500 mt-1">Get started, no card needed</p>
            </div>
            <div>
              <span className="text-4xl font-black text-slate-900">₹0</span>
              <span className="text-sm text-slate-400 ml-1">forever</span>
            </div>
            <ul className="space-y-2.5">
              {FREE_FEATURES.map(f => (
                <li key={f.text} className="flex items-start gap-2.5 text-sm">
                  {f.ok
                    ? <CheckCircle2 size={15} className="text-teal-500 shrink-0 mt-0.5"/>
                    : <X size={15} className="text-slate-300 shrink-0 mt-0.5"/>}
                  <span className={f.ok ? "text-slate-700" : "text-slate-400"}>{f.text}</span>
                </li>
              ))}
            </ul>
            {!isPremium && (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-center">
                <p className="text-sm font-semibold text-slate-500">Currently active</p>
              </div>
            )}
          </div>

          {/* ALL ACCESS */}
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800
            border-2 border-teal-500 rounded-3xl p-7 space-y-6 shadow-2xl shadow-teal-500/10">
            <div className="absolute inset-0 rounded-3xl opacity-[0.07]"
              style={{ backgroundImage:"radial-gradient(circle at 50% 0%,#14b8a6,transparent 60%)" }}/>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900
                bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full px-4 py-1.5 shadow-lg">
                <Zap size={11}/> Best Value · One-time
              </span>
            </div>
            <div className="relative z-10 pt-2">
              {isPremium && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold
                  text-teal-400 bg-teal-400/10 border border-teal-400/30 rounded-full px-2.5 py-0.5 mb-3">
                  <BadgeCheck size={10}/> Your current plan
                </span>
              )}
              <h2 className="text-2xl font-bold text-white"
                style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>All Access</h2>
              <p className="text-sm text-slate-400 mt-1">Everything, forever. No renewal.</p>
            </div>
            <div className="relative z-10">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">₹99</span>
                <span className="text-sm text-slate-400">one-time</span>
              </div>
              <p className="text-xs text-teal-400 font-mono mt-1 flex items-center gap-1">
                <Infinity size={11}/> Lifetime access · No subscription
              </p>
            </div>
            <ul className="space-y-2.5 relative z-10">
              {ALL_FEATURES.map(f => (
                <li key={f.text} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 size={15} className="text-teal-400 shrink-0 mt-0.5"/>
                  <span className="text-slate-300">{f.text}</span>
                </li>
              ))}
            </ul>
            <div className="relative z-10">
              {isPremium ? (
                <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl
                  bg-teal-500/20 border border-teal-500/30 text-teal-400 font-bold text-sm">
                  <CheckCircle2 size={16}/> You have All Access
                </div>
              ) : (
                <button onClick={handlePay} disabled={!!loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl
                    bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400
                    text-slate-900 font-bold text-sm transition-all hover:-translate-y-px
                    shadow-lg shadow-teal-500/30 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading === "all"
                    ? <><div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"/> Processing...</>
                    : <><Zap size={15}/> Unlock All Access · ₹99</>}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── COMPARISON TABLE ── */}
        <div>
          <button onClick={() => setShowCompare(p => !p)}
            className="flex items-center gap-2 mx-auto text-sm font-semibold
              text-slate-600 hover:text-slate-900 transition-colors mb-6">
            {showCompare ? "Hide" : "Show"} comparison table
            <ChevronRight size={14} className={cn("transition-transform", showCompare && "rotate-90")}/>
          </button>
          {showCompare && (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm max-w-2xl mx-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-5 py-4 text-slate-500 font-semibold">Feature</th>
                    <th className="px-4 py-4 text-center text-slate-700 font-bold">Free</th>
                    <th className="px-4 py-4 text-center text-teal-700 font-bold bg-teal-50/50">All Access ⭐</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, i) => (
                    <tr key={row.feature} className={cn("border-b border-slate-50 last:border-b-0",
                      i % 2 === 0 ? "bg-white" : "bg-slate-50/30")}>
                      <td className="px-5 py-3 text-slate-700 font-medium">{row.feature}</td>
                      <td className="px-4 py-3 text-center text-slate-500 font-mono text-xs">{row.free}</td>
                      <td className="px-4 py-3 text-center text-teal-600 font-mono text-xs font-bold bg-teal-50/30">{row.all}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── FAQs ── */}
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-xl font-bold text-slate-900 text-center mb-6"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            Frequently asked questions
          </h2>
          {[
            { q:"Is there a subscription?",            a:"No. All payments are one-time only. Pay once, access forever with no renewal." },
            { q:"What payment methods work?",          a:"UPI (GPay, PhonePe, Paytm), all debit/credit cards, net banking, and wallets — powered by Cashfree." },
            { q:"Can I get a refund?",                 a:"Yes. If you face any issue within 24 hours of purchase, reach out and we'll refund you instantly." },
            { q:"Is ₹99 a one-time payment?",            a:"Yes — ₹99 is a single one-time payment. No subscription, no renewal. You unlock everything permanently." },
            { q:"Is my payment secure?",               a:"Yes — Cashfree is PCI-DSS Level 1 certified. We never store your card details." },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-sm transition-shadow">
              <p className="text-sm font-bold text-slate-800 mb-1">{q}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}