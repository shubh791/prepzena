// src/app/(app)/contact/page.jsx
// Contact Us — required by Cashfree for payment gateway approval

import Link from "next/link";
import { Mail, MessageSquare, Clock, MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title:       "Contact Us — Prepzena",
  description: "Get in touch with the Prepzena team.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">

      {/* Header */}
      <div>
        <p className="text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">Support</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-3"
          style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
          Contact Us
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
          Have a question, issue or feedback? We're here to help.
          Reach out and we'll respond within 24 hours.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">

        {/* Contact cards */}
        <div className="space-y-4">
          {[
            {
              icon:<Mail size={20}/>,
              label:"Email",
              value:"support@prepzena.com",
              sub:"We reply within 24 hours",
              href:"mailto:support@prepzena.com",
              color:"text-teal-600 bg-teal-50 border-teal-200",
            },
            {
              icon:<MessageSquare size={20}/>,
              label:"General Enquiries",
              value:"hi@prepzena.com",
              sub:"Partnerships, feedback, suggestions",
              href:"mailto:hi@prepzena.com",
              color:"text-violet-600 bg-violet-50 border-violet-200",
            },
            {
              icon:<Clock size={20}/>,
              label:"Support Hours",
              value:"Mon–Sat, 10am–7pm IST",
              sub:"We'll get back to you ASAP",
              color:"text-amber-600 bg-amber-50 border-amber-200",
            },
            {
              icon:<MapPin size={20}/>,
              label:"Business Address",
              value:"India",
              sub:"Prepzena — Digital Education Platform",
              color:"text-rose-600 bg-rose-50 border-rose-200",
            },
          ].map(({ icon, label, value, sub, href, color }) => (
            <div key={label}
              className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${color}`}>
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 mb-0.5">{label}</p>
                  {href ? (
                    <a href={href}
                      className="text-sm font-bold text-slate-800 hover:text-teal-600 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-bold text-slate-800">{value}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-5"
            style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
            Send a message
          </h2>
          <form
            action="mailto:support@prepzena.com"
            method="get"
            encType="text/plain"
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Your name</label>
              <input name="name" type="text" placeholder="Alice"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl
                  text-sm text-slate-700 placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email address</label>
              <input name="email" type="email" placeholder="alice@example.com"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl
                  text-sm text-slate-700 placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Subject</label>
              <input name="subject" type="text" placeholder="Payment issue / Question / Feedback"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl
                  text-sm text-slate-700 placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Message</label>
              <textarea name="body" rows={4} placeholder="Describe your issue or question..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl
                  text-sm text-slate-700 placeholder:text-slate-400 resize-none
                  focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"/>
            </div>
            <button type="submit"
              className="flex items-center gap-2 w-full justify-center
                bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm
                py-3 rounded-xl transition-all">
              Send Message <ArrowRight size={14}/>
            </button>
          </form>
        </div>
      </div>

      {/* Payment issues */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <p className="text-sm font-bold text-amber-800 mb-1">Payment issues?</p>
        <p className="text-sm text-amber-700 leading-relaxed">
          If you were charged but didn't get access, email us at{" "}
          <a href="mailto:support@prepzena.com" className="font-bold underline">
            support@prepzena.com
          </a>{" "}
          with your order ID and we'll resolve it within 2 hours.
        </p>
      </div>
    </div>
  );
}