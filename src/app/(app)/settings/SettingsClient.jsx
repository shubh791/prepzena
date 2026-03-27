"use client";
// src/app/(app)/settings/SettingsClient.jsx

import { useState } from "react";
import Link         from "next/link";
import {
  User, Mail, GraduationCap, Shield,
  Flame, BookOpen, Crown, CheckCircle2,
  Zap, ExternalLink, Trash2, AlertTriangle,
  Save, Loader2,
}                   from "lucide-react";
import { cn }       from "@/lib/utils";

function InitialsAvatar({ name }) {
  const initials = name
    .split(" ")
    .map(w => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600
      flex items-center justify-center text-white text-xl font-bold shadow-lg">
      {initials}
    </div>
  );
}

export default function SettingsClient({ user }) {
  const [university,  setUniversity]  = useState(user.university ?? "");
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);
  const [saveError,   setSaveError]   = useState(null);
  const [showDelete,  setShowDelete]  = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [deleting,    setDeleting]    = useState(false);

  const handleSaveUniversity = async () => {
    setSaving(true);
    setSaved(false);
    setSaveError(null);
    try {
      const res = await fetch("/api/user/update", {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ university }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteInput !== "DELETE") return;
    setDeleting(true);
    try {
      const res = await fetch("/api/user/delete", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      window.location.href = "/";
    } catch {
      setDeleting(false);
      setShowDelete(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8">

      {/* ── HEADER ── */}
      <div>
        <p className="text-xs font-mono tracking-widest uppercase text-slate-400 mb-1">Account</p>
        <h1 className="text-2xl font-bold text-slate-900"
          style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
          Settings
        </h1>
      </div>

      {/* ── PROFILE CARD ── */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-100 shadow-lg" />
          ) : (
            <InitialsAvatar name={user.name} />
          )}
          <div>
            <h2 className="text-lg font-bold text-slate-900"
              style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
              {user.name}
            </h2>
            <p className="text-sm text-slate-400">{user.email}</p>
            <p className="text-xs font-mono text-slate-300 mt-0.5">Member since {user.memberSince}</p>
          </div>
        </div>

        {/* Read-only fields */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
            <User size={15} className="text-slate-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Full Name</p>
              <p className="text-sm font-semibold text-slate-700 truncate">{user.name}</p>
            </div>
            <a href="https://accounts.clerk.com/user" target="_blank" rel="noopener noreferrer"
              aria-label="Edit name in Clerk"
              className="flex items-center gap-1 text-[10px] font-mono text-teal-600 hover:text-teal-700">
              Edit <ExternalLink size={10} />
            </a>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
            <Mail size={15} className="text-slate-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Email</p>
              <p className="text-sm font-semibold text-slate-700 truncate">{user.email}</p>
            </div>
            <a href="https://accounts.clerk.com/user" target="_blank" rel="noopener noreferrer"
              aria-label="Edit email in Clerk"
              className="flex items-center gap-1 text-[10px] font-mono text-teal-600 hover:text-teal-700">
              Edit <ExternalLink size={10} />
            </a>
          </div>

          {/* Editable: university */}
          <div className="space-y-2">
            <label htmlFor="university" className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest">
              <GraduationCap size={12} /> University / College
            </label>
            <div className="flex gap-2">
              <input
                id="university"
                type="text"
                value={university}
                onChange={e => setUniversity(e.target.value)}
                placeholder="e.g. IIT Delhi, VIT Vellore..."
                className="flex-1 px-4 py-2.5 text-sm bg-white border border-slate-200
                  rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400
                  focus:border-transparent placeholder:text-slate-300 text-slate-700"
              />
              <button
                onClick={handleSaveUniversity}
                disabled={saving}
                aria-label="Save university"
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
                  saved
                    ? "bg-teal-500 text-white"
                    : "bg-slate-900 hover:bg-slate-800 text-white",
                  "disabled:opacity-60"
                )}>
                {saving
                  ? <Loader2 size={14} className="animate-spin" />
                  : saved
                  ? <><CheckCircle2 size={14} /> Saved</>
                  : <><Save size={14} /> Save</>
                }
              </button>
            </div>
            {saveError && (
              <p className="text-xs text-rose-500 font-mono">{saveError}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── PREMIUM STATUS ── */}
      <div className={cn(
        "rounded-2xl p-6 border",
        user.isPremium
          ? "bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200"
          : "bg-white border-slate-100"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              user.isPremium ? "bg-teal-500" : "bg-slate-100"
            )}>
              {user.isPremium
                ? <Crown size={18} className="text-white" />
                : <Shield size={18} className="text-slate-400" />
              }
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Premium Status</p>
              <p className="text-xs text-slate-400">
                {user.isPremium ? "Lifetime all-access plan" : "Free plan — limited content"}
              </p>
            </div>
          </div>
          {user.isPremium ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-teal-700
              bg-teal-100 border border-teal-300 rounded-full px-3 py-1.5">
              <CheckCircle2 size={11} /> Active
            </span>
          ) : (
            <Link href="/pricing" aria-label="Upgrade to premium"
              className="flex items-center gap-1.5 text-xs font-bold text-white
                bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700
                rounded-xl px-4 py-2 transition-all hover:-translate-y-px">
              <Zap size={11} /> Upgrade · ₹99
            </Link>
          )}
        </div>
      </div>

      {/* ── STATS SUMMARY ── */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-800 mb-4"
          style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
          Your Stats
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label:"Day Streak",     value:user.streak,   Icon:Flame,    color:"text-amber-500",  bg:"bg-amber-50"  },
            { label:"Notes Completed",value:user.notesRead,Icon:BookOpen, color:"text-teal-500",   bg:"bg-teal-50"   },
          ].map(({ label, value, Icon, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-4 flex items-center gap-3`}>
              <Icon size={18} className={color} />
              <div>
                <p className="text-xl font-bold text-slate-900"
                  style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>{value}</p>
                <p className="text-xs text-slate-400 font-mono">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DANGER ZONE ── */}
      <div className="bg-white border border-rose-100 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-rose-500" />
          <h3 className="text-sm font-bold text-rose-700">Danger Zone</h3>
        </div>
        <p className="text-xs text-slate-500">
          Permanently deletes your account, all progress, and payment history. This cannot be undone.
        </p>
        <button
          onClick={() => setShowDelete(true)}
          aria-label="Delete account"
          className="flex items-center gap-2 text-sm font-bold text-rose-600
            border border-rose-200 hover:border-rose-400 hover:bg-rose-50
            px-4 py-2.5 rounded-xl transition-all">
          <Trash2 size={14} /> Delete my account
        </button>
      </div>

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {showDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm
          flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                <Trash2 size={18} className="text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete account?</h3>
                <p className="text-xs text-slate-400">This is permanent and irreversible.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Type <span className="font-mono font-bold text-rose-600">DELETE</span> to confirm.
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={e => setDeleteInput(e.target.value)}
              placeholder="Type DELETE"
              aria-label="Confirm deletion"
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-rose-400 font-mono"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDelete(false); setDeleteInput(""); }}
                className="flex-1 py-2.5 text-sm font-bold text-slate-600
                  border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteInput !== "DELETE" || deleting}
                aria-label="Confirm delete account"
                className="flex-1 py-2.5 text-sm font-bold text-white
                  bg-rose-600 hover:bg-rose-700 rounded-xl transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
