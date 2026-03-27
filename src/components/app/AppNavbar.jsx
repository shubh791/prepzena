"use client";

// ─────────────────────────────────────────────────────────────
//  src/components/app/AppNavbar.jsx
//  Top navbar for all authenticated app pages
//  Shows: Logo · Nav links · Search (⌘K) · Name + Avatar
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname, useRouter }      from "next/navigation";
import { useUser, UserButton }         from "@clerk/nextjs";
import {
  Menu, X, Search,
  BookOpen, Code2, Brain,
  FileText, LayoutDashboard, Loader2, Crown,
}                                      from "lucide-react";
import { cn }                          from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home",   href: "/home",   icon: LayoutDashboard },
  { label: "Notes",  href: "/notes",  icon: BookOpen        },
  { label: "Coding", href: "/coding", icon: Code2           },
  { label: "Quiz",   href: "/quiz",   icon: Brain           },
  { label: "PYQs",   href: "/pyqs",   icon: FileText        },
];

// Topic color → text/bg classes
const TC_BADGE = {
  teal:    "text-teal-700    bg-teal-50",
  violet:  "text-violet-700  bg-violet-50",
  amber:   "text-amber-700   bg-amber-50",
  rose:    "text-rose-700    bg-rose-50",
  blue:    "text-blue-700    bg-blue-50",
  emerald: "text-emerald-700 bg-emerald-50",
  indigo:  "text-indigo-700  bg-indigo-50",
};

export default function AppNavbar({ isPremium = false }) {
  const pathname            = usePathname();
  const router              = useRouter();
  const { user, isLoaded }  = useUser();

  const [menuOpen,      setMenuOpen]      = useState(false);
  const [searchOpen,    setSearchOpen]    = useState(false);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [results,       setResults]       = useState([]);
  const [loading,       setLoading]       = useState(false);
  const [activeIdx,     setActiveIdx]     = useState(-1);

  const searchRef    = useRef(null);
  const inputRef     = useRef(null);
  const debounceRef  = useRef(null);

  // ── Close search on outside click ─────────────────────────
  useEffect(() => {
    const fn = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        closeSearch();
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // ── Keyboard shortcuts ─────────────────────────────────────
  useEffect(() => {
    const fn = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((p) => !p);
      }
      if (e.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  // ── Close menu on route change ─────────────────────────────
  useEffect(() => setMenuOpen(false), [pathname]);

  // ── Focus input when search opens ─────────────────────────
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setResults([]);
    setActiveIdx(-1);
  };

  // ── Debounced search fetch ─────────────────────────────────
  const fetchResults = useCallback(async (q) => {
    if (!q.trim()) { setResults([]); setLoading(false); return; }
    setLoading(true);
    try {
      const res  = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setActiveIdx(-1);
    clearTimeout(debounceRef.current);
    if (val.trim()) {
      setLoading(true);
      debounceRef.current = setTimeout(() => fetchResults(val), 300);
    } else {
      setResults([]);
      setLoading(false);
    }
  };

  // ── Keyboard navigation in results ────────────────────────
  const handleKeyDown = (e) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && results[activeIdx]) {
        navigateToNote(results[activeIdx].slug);
      } else if (results[0]) {
        navigateToNote(results[0].slug);
      }
    }
  };

  const navigateToNote = (slug) => {
    router.push(`/notes/${slug}`);
    closeSearch();
  };

  const isActive = (href) =>
    href === "/home" ? pathname === href : pathname.startsWith(href);

  const showDropdown = searchOpen && (loading || results.length > 0 || searchQuery.trim().length > 0);

  return (
    <>
      {/* ── MAIN HEADER ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-white border-b
        border-slate-200 shadow-sm shadow-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 gap-4">

            {/* ── LOGO ──────────────────────────────────────── */}
            <button
              onClick={() => router.push("/home")}
              aria-label="Go to dashboard"
              className="flex items-center gap-2 group shrink-0"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500
                group-hover:scale-110 transition-transform duration-200" />
              <span
                className="text-[17px] font-bold tracking-tight text-slate-900"
                style={{ fontFamily: "var(--font-sora,'Sora',sans-serif)" }}
              >
                Prep<span className="text-teal-600">zena</span>
              </span>
            </button>

            {/* ── DESKTOP NAV ───────────────────────────────── */}
            <nav className="hidden md:flex items-center gap-0.5 flex-1" aria-label="Main navigation">
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
                <button
                  key={href}
                  onClick={() => router.push(href)}
                  aria-label={`Navigate to ${label}`}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                    isActive(href)
                      ? "text-teal-700 bg-teal-50"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </nav>

            {/* ── DESKTOP RIGHT ─────────────────────────────── */}
            <div className="hidden md:flex items-center gap-3 ml-auto shrink-0">

              {/* Search pill */}
              <button
                onClick={() => setSearchOpen((p) => !p)}
                aria-label="Open search (Ctrl+K)"
                className="flex items-center gap-2 px-3 py-2 h-9 rounded-lg
                  text-slate-400 border border-slate-200 bg-slate-50
                  hover:bg-white hover:border-slate-300 hover:text-slate-600
                  transition-all w-40 text-sm"
              >
                <Search size={14} />
                <span className="text-xs flex-1 text-left">Search...</span>
                <kbd className="text-[10px] font-mono bg-slate-200
                  text-slate-400 px-1.5 py-0.5 rounded">⌘K</kbd>
              </button>

              {/* Divider */}
              <div className="w-px h-5 bg-slate-200" />

              {/* ── NAME + CLERK AVATAR ────────────────────── */}
              <div className="flex items-center gap-2.5">
                {isLoaded && user && (
                  <div className="hidden lg:flex items-center gap-1.5">
                    {isPremium && (
                      <Crown size={13} className="text-amber-500 shrink-0" aria-label="Premium member" />
                    )}
                    <span className="text-sm font-semibold text-slate-700">
                      {user.firstName ?? user.username ?? "User"}
                    </span>
                  </div>
                )}
                <div className="relative">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8 ring-2 ring-teal-100 ring-offset-1",
                      },
                    }}
                  />
                  {isPremium && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-400
                      rounded-full flex items-center justify-center pointer-events-none"
                      aria-hidden="true">
                      <Crown size={9} className="text-white" />
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* ── MOBILE RIGHT ──────────────────────────────── */}
            <div className="md:hidden flex items-center gap-2 ml-auto">
              <button
                onClick={() => setSearchOpen((p) => !p)}
                aria-label="Open search"
                className="w-9 h-9 flex items-center justify-center rounded-lg
                  text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <Search size={18} />
              </button>
              <UserButton afterSignOutUrl="/" />
              <button
                onClick={() => setMenuOpen((p) => !p)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="w-9 h-9 flex items-center justify-center rounded-lg
                  text-slate-500 hover:bg-slate-100 transition-colors"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── SEARCH OVERLAY ──────────────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm
          flex items-start justify-center pt-[15vh] px-4">
          <div
            ref={searchRef}
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl
              border border-slate-200 overflow-hidden"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-haspopup="listbox"
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
              {loading
                ? <Loader2 size={17} className="text-slate-400 shrink-0 animate-spin" />
                : <Search size={17} className="text-slate-400 shrink-0" />
              }
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                placeholder="Search notes, topics..."
                aria-label="Search notes"
                aria-autocomplete="list"
                className="flex-1 text-sm text-slate-900
                  placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              <kbd
                className="text-[10px] font-mono text-slate-400
                  bg-slate-100 px-2 py-1 rounded cursor-pointer"
                onClick={closeSearch}
                role="button"
                aria-label="Close search"
              >
                ESC
              </kbd>
            </div>

            {/* Results dropdown */}
            {searchQuery.trim() ? (
              <div role="listbox" aria-label="Search results">
                {loading && (
                  <div className="px-4 py-6 text-center text-sm text-slate-400">
                    Searching...
                  </div>
                )}
                {!loading && results.length === 0 && (
                  <div className="px-4 py-6 text-center text-sm text-slate-400">
                    No results for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
                {!loading && results.length > 0 && (
                  <div className="p-2">
                    <p className="text-[10px] font-mono tracking-widest uppercase
                      text-slate-400 px-3 py-2">Results</p>
                    {results.map((note, idx) => {
                      const badgeCls = TC_BADGE[note.topic?.color] ?? TC_BADGE.teal;
                      return (
                        <button
                          key={note.id}
                          role="option"
                          aria-selected={activeIdx === idx}
                          onClick={() => navigateToNote(note.slug)}
                          className={cn(
                            "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl",
                            "text-sm text-slate-600 transition-colors text-left",
                            activeIdx === idx
                              ? "bg-teal-50 text-teal-800"
                              : "hover:bg-slate-50 hover:text-slate-900"
                          )}
                        >
                          <span className={cn(
                            "text-base shrink-0 w-7 h-7 rounded-lg flex items-center justify-center",
                            badgeCls
                          )}>
                            {note.topic?.icon ?? "📚"}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate">{note.title}</p>
                            <p className="text-xs text-slate-400 truncate">{note.topic?.title}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* Quick links when no query */
              <div className="p-2">
                <p className="text-[10px] font-mono tracking-widest uppercase
                  text-slate-400 px-3 py-2">Quick access</p>
                {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
                  <button
                    key={href}
                    type="button"
                    onClick={() => { router.push(href); closeSearch(); }}
                    aria-label={`Go to ${label}`}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl
                      text-sm text-slate-600 hover:bg-slate-50
                      hover:text-slate-900 transition-colors"
                  >
                    <Icon size={15} className="text-slate-400" />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MOBILE DRAWER ───────────────────────────────────── */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-900/20"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-16 left-0 right-0 bg-white
              border-b border-slate-200 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
              {/* Premium badge row in mobile menu */}
              {isPremium && isLoaded && user && (
                <div className="flex items-center gap-2 px-3 py-2 mb-1
                  bg-amber-50 border border-amber-200 rounded-xl">
                  <Crown size={13} className="text-amber-500 shrink-0" />
                  <span className="text-xs font-semibold text-amber-700">
                    {user.firstName ?? "You"} · Premium Member
                  </span>
                </div>
              )}
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
                <button
                  key={href}
                  onClick={() => router.push(href)}
                  aria-label={`Navigate to ${label}`}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors",
                    isActive(href)
                      ? "text-teal-700 bg-teal-50"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
