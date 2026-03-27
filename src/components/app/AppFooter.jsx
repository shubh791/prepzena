// src/components/app/AppFooter.jsx

import Link from "next/link";
import { Zap, Shield } from "lucide-react";

const LINKS = {
  Learn: [
    { label:"Notes",    href:"/notes"   },
    { label:"Coding",   href:"/coding"  },
    { label:"Quizzes",  href:"/quiz"    },
    { label:"PYQs",     href:"/pyqs"    },
  ],
  Product: [
    { label:"Dashboard", href:"/home"    },
    { label:"Pricing",   href:"/pricing" },
    { label:"Settings",  href:"/settings"},
  ],
  Legal: [
    { label:"Privacy Policy", href:"/privacy" },
    { label:"Terms of Use",   href:"/terms"   },
    { label:"Refund Policy",  href:"/refund"  },
    { label:"Contact Us",     href:"/contact" },
  ],
};

const FOUNDER = [
  {
    label: "LinkedIn",
    href:  "https://www.linkedin.com/in/shubham-panghal",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href:  "https://github.com/shubh791",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
];

export default function AppFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 space-y-4">
            <Link href="/home" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center
                group-hover:bg-teal-400 transition-colors">
                <span className="text-slate-900 font-black text-sm">P</span>
              </div>
              <span className="text-white font-bold text-lg"
                style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
                Prepzena
              </span>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Structured notes, coding exercises and PYQs for students who want
              results fast. Learn smarter, not harder.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {["Free to start","One-time payment","Lifetime access"].map(f => (
                <span key={f}
                  className="flex items-center gap-1 text-[10px] font-mono font-semibold
                    text-teal-400 bg-teal-400/10 border border-teal-400/20
                    rounded-full px-2.5 py-1">
                  <Shield size={9} /> {f}
                </span>
              ))}
            </div>

            {/* Founder contact */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Founder</p>
              <div className="flex items-center gap-2">
                {FOUNDER.map(({ label, href, icon }) => (
                  <a key={label} href={href}
                    target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10
                      flex items-center justify-center
                      text-slate-400 hover:text-white hover:bg-white/10
                      hover:border-white/20 transition-all">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section} className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href}
                      className="text-sm text-slate-400 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Premium CTA strip ── */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4
            bg-gradient-to-r from-teal-500/10 to-emerald-500/10
            border border-teal-500/20 rounded-2xl px-6 py-5">
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Ready to unlock premium content?</p>
              <p className="text-xs text-slate-400 mt-0.5">
                One-time payment · Lifetime access · No subscription ever.
              </p>
            </div>
            <Link href="/pricing"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400
                text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl
                transition-all hover:-translate-y-px shrink-0">
              <Zap size={14} /> View pricing
            </Link>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3
          text-xs text-slate-600 font-mono">
          <span>© {new Date().getFullYear()} Prepzena. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse inline-block" />
              All systems operational
            </span>
            <span>Secured by Cashfree</span>
          </div>
        </div>

      </div>
    </footer>
  );
}