// src/app/(app)/privacy/page.jsx

export const metadata = {
  title:       "Privacy Policy — Prepzena",
  description: "How Prepzena collects and uses your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      <div className="mb-8">
        <p className="text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">Legal</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-2"
          style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400 font-mono">Last updated: 25 March 2026</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-8
        [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mb-3
        [&_p]:text-sm [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-3
        [&_li]:text-sm [&_li]:text-slate-600 [&_li]:leading-relaxed">

        <section>
          <h2>1. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Account data:</strong> Name and email address when you sign up via Clerk</li>
            <li><strong>Learning data:</strong> Notes you've read, quiz scores, progress</li>
            <li><strong>Payment data:</strong> Order ID and transaction status (we never store card details — handled by Cashfree)</li>
            <li><strong>Usage data:</strong> Pages visited, features used — to improve the platform</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>To provide and personalise your learning experience</li>
            <li>To process payments and grant premium access</li>
            <li>To send important account and payment notifications</li>
            <li>To improve our content and platform features</li>
          </ul>
        </section>

        <section>
          <h2>3. Data Sharing</h2>
          <p>We do not sell your personal data. We share data only with:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Clerk:</strong> For authentication and account management</li>
            <li><strong>Cashfree:</strong> For payment processing</li>
            <li><strong>Vercel:</strong> For hosting the platform</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Security</h2>
          <p>We use industry-standard encryption and security practices. Passwords are never stored — authentication is handled by Clerk. Payment data is handled by PCI-DSS certified Cashfree.</p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Request a copy of your data</li>
            <li>Request deletion of your account and data</li>
            <li>Opt out of non-essential communications</li>
          </ul>
          <p>Email <a href="mailto:support@prepzena.com" className="text-teal-600 font-semibold hover:underline">support@prepzena.com</a> to exercise any of these rights.</p>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <p>We use only essential cookies required for authentication and session management. We do not use advertising or tracking cookies.</p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>Questions about privacy? Email us at <a href="mailto:support@prepzena.com" className="text-teal-600 font-semibold hover:underline">support@prepzena.com</a></p>
        </section>
      </div>
    </div>
  );
}