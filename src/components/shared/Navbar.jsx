"use client";

// ─────────────────────────────────────────────────────────────
//  src/components/shared/Navbar.jsx
//
//  Route behaviour:
//  /          → anchor nav + Sign in + Start free
//  /sign-in   → logo only + "New here? Get Started"
//  /sign-up   → logo only + "Have an account? Login"
//  /home+app  → logo + Dashboard + UserButton
//
//  Sections:
//  [1] Imports & config
//  [2] Component + state
//  [3] Logo
//  [4] Desktop center nav  (landing only)
//  [5] Desktop right CTAs  (context-aware per route)
//  [6] Mobile hamburger button
//  [7] Mobile dropdown menu
// ─────────────────────────────────────────────────────────────

// ── [1] IMPORTS & CONFIG ─────────────────────────────────────

import { useState, useEffect }        from "react";
import { usePathname, useRouter }     from "next/navigation";
import { useUser, UserButton }        from "@clerk/nextjs";
import { Menu, X, Zap, LayoutDashboard, LogIn, ArrowRight } from "lucide-react";
import { cn }                         from "@/lib/utils";

// Landing page smooth-scroll anchor links
const LANDING_LINKS = [
  { label: "Features",     href: "#features"     },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing",      href: "#pricing"      },
];

// ── [2] COMPONENT & STATE ────────────────────────────────────

export default function Navbar() {
  const pathname          = usePathname();
  const router            = useRouter();
  const { isSignedIn }    = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Route flags
  const isLanding  = pathname === "/";
  const isSignIn   = pathname.startsWith("/sign-in");
  const isSignUp   = pathname.startsWith("/sign-up");
  const isAuthPage = isSignIn || isSignUp;
  const isAppPage  = !isLanding && !isAuthPage;

  // Scroll listener — only active on landing page
  useEffect(() => {
    if (!isLanding) return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLanding]);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  // Smooth scroll to section ID
  const scrollTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  // Dynamic header background
  const headerBg = isLanding
    ? scrolled
      ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm shadow-slate-100/80"
      : "bg-transparent border-b border-transparent"
    : "bg-white/95 backdrop-blur-md border-b border-slate-200";

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", headerBg)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* ── [3] LOGO ──────────────────────────────────────── */}
          <button
            onClick={() => router.push("/")}
            aria-label="Go to homepage"
            className="flex items-center gap-2 group shrink-0 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
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

          {/* ── [4] DESKTOP CENTER NAV — landing page only ────── */}
          {isLanding && (
            <nav className="hidden md:flex items-center gap-0.5" aria-label="Page sections">
              {LANDING_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-500
                    hover:text-slate-900 hover:bg-slate-100/80 transition-colors duration-150"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* ── [5] DESKTOP RIGHT CTAs — context-aware ────────── */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">

            {/* — SIGN-IN PAGE: show "New here? Get Started" — */}
            {isSignIn && (
              <div className="flex items-center gap-2.5">
                <span className="text-sm text-slate-400">New here?</span>
                <button
                  onClick={() => router.push("/sign-up")}
                  className="flex items-center gap-1.5 text-sm font-bold text-white
                    bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-xl
                    shadow-sm shadow-teal-100/80 hover:-translate-y-px
                    transition-all duration-150"
                >
                  <Zap size={13} />
                  Get Started
                </button>
              </div>
            )}

            {/* — SIGN-UP PAGE: "Have an account? Login" or "Go to Home" — */}
            {isSignUp && (
              <div className="flex items-center gap-2.5">
                {isSignedIn ? (
                  <>
                    <span className="text-sm text-slate-400">Already signed in</span>
                    <button
                      onClick={() => router.push("/home")}
                      className="flex items-center gap-1.5 text-sm font-bold text-white
                        bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-xl
                        shadow-sm shadow-teal-100/80 hover:-translate-y-px transition-all"
                    >
                      <LayoutDashboard size={13} />
                      Go to Home
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-sm text-slate-400">Have an account?</span>
                    <button
                      onClick={() => router.push("/sign-in")}
                      className="flex items-center gap-1.5 text-sm font-semibold
                        text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl
                        border border-slate-200 bg-white hover:bg-slate-50
                        transition-all duration-150"
                    >
                      <LogIn size={13} />
                      Login
                    </button>
                  </>
                )}
              </div>
            )}

            {/* — LANDING + SIGNED OUT: Sign in + Start free — */}
            {isLanding && !isSignedIn && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push("/sign-in")}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900
                    px-4 py-2 rounded-xl border border-slate-200 bg-white/80
                    hover:bg-white transition-all duration-150"
                >
                  Sign in
                </button>
                <button
                  onClick={() => router.push("/sign-up")}
                  className="flex items-center gap-1.5 text-sm font-bold text-white
                    bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-xl
                    shadow-sm shadow-teal-200 hover:-translate-y-px transition-all duration-150"
                >
                  <Zap size={13} />
                  Start free
                </button>
              </div>
            )}

            {/* — LANDING + SIGNED IN: Dashboard + UserButton — */}
            {isLanding && isSignedIn && (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => router.push("/home")}
                  className="flex items-center gap-1.5 text-sm font-semibold
                    text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg
                    hover:bg-slate-100/80 transition-colors"
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </button>
                <UserButton afterSignOutUrl="/" />
              </div>
            )}

            {/* — APP PAGES (/home etc): Dashboard + UserButton — */}
            {isAppPage && (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => router.push("/home")}
                  className="flex items-center gap-1.5 text-sm font-semibold
                    text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg
                    hover:bg-slate-100/80 transition-colors"
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </button>
                {isSignedIn && <UserButton afterSignOutUrl="/" />}
              </div>
            )}

          </div>

          {/* ── [6] MOBILE HAMBURGER BUTTON ───────────────────── */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg
              text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* ── [7] MOBILE DROPDOWN MENU ──────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">

            {/* Landing anchor links */}
            {isLanding && (
              <div className="space-y-0.5 pb-3 border-b border-slate-100">
                {LANDING_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="flex w-full items-center px-3 py-2.5 rounded-xl text-sm
                      font-medium text-slate-600 hover:text-slate-900
                      hover:bg-slate-50 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}

            {/* Auth CTAs */}
            <div className="space-y-2 pt-2">

              {/* Sign-in page mobile */}
              {isSignIn && (
                <button
                  onClick={() => router.push("/sign-up")}
                  className="flex w-full items-center justify-center gap-1.5 text-sm
                    font-bold text-white bg-teal-600 py-3 rounded-xl hover:bg-teal-700"
                >
                  <Zap size={13} /> Get Started Free
                </button>
              )}

              {/* Sign-up page mobile */}
              {isSignUp && !isSignedIn && (
                <button
                  onClick={() => router.push("/sign-in")}
                  className="flex w-full items-center justify-center gap-1.5 text-sm
                    font-semibold text-slate-700 border border-slate-200
                    py-3 rounded-xl hover:bg-slate-50"
                >
                  <LogIn size={13} /> Login to your account
                </button>
              )}

              {/* Landing signed out */}
              {isLanding && !isSignedIn && (
                <>
                  <button
                    onClick={() => router.push("/sign-in")}
                    className="flex w-full items-center justify-center text-sm
                      font-semibold text-slate-700 border border-slate-200
                      py-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => router.push("/sign-up")}
                    className="flex w-full items-center justify-center gap-1.5 text-sm
                      font-bold text-white bg-teal-600 py-3 rounded-xl
                      hover:bg-teal-700 transition-colors"
                  >
                    <Zap size={13} /> Start free
                  </button>
                </>
              )}

              {/* Signed in — any page */}
              {isSignedIn && (
                <div className="flex items-center justify-between px-3 py-2
                  bg-slate-50 rounded-xl">
                  <button
                    onClick={() => router.push("/home")}
                    className="flex items-center gap-1.5 text-sm font-semibold text-teal-700
                      hover:text-teal-800 transition-colors"
                  >
                    <ArrowRight size={14} />
                    Go to Dashboard
                  </button>
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </header>
  );
}