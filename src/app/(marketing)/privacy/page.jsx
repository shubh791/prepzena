// src/app/(marketing)/privacy/page.jsx

export const metadata = {
  title:       "Privacy Policy — Prepzena",
  description: "How Prepzena collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-10">

      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs font-mono tracking-widest uppercase text-teal-600">Legal</p>
        <h1 className="text-3xl font-bold text-slate-900"
          style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400 font-mono">Last updated: March 2026</p>
      </div>

      <div className="prose prose-slate prose-sm max-w-none space-y-8">

        <Section title="1. Who we are">
          <p>
            Prepzena (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is an ed-tech platform at{" "}
            <strong>prepzena.com</strong> that provides structured study notes, coding exercises,
            quizzes, and previous year question papers for CS/IT students. The platform is operated
            by its founder independently.
          </p>
        </Section>

        <Section title="2. What data we collect">
          <ul>
            <li><strong>Account data</strong> — your name, email address, and profile picture provided when you sign up via Google or email through Clerk.</li>
            <li><strong>Progress data</strong> — notes you mark complete, quiz scores, and your learning streak.</li>
            <li><strong>Payment data</strong> — when you purchase the ₹99 All Access plan, payment is processed by Cashfree. We do not store your card details.</li>
            <li><strong>Usage data</strong> — pages visited, features used, and session timestamps for improving the product.</li>
          </ul>
        </Section>

        <Section title="3. How we use your data">
          <ul>
            <li>To authenticate you and maintain your session securely.</li>
            <li>To track and display your learning progress across topics.</li>
            <li>To process payments and grant premium access.</li>
            <li>To send transactional emails (e.g. receipt after purchase). We do not send marketing emails without consent.</li>
            <li>To improve the platform based on aggregated, anonymised usage patterns.</li>
          </ul>
        </Section>

        <Section title="4. Third-party services">
          <ul>
            <li><strong>Clerk</strong> — handles authentication. Your credentials are managed by Clerk under their privacy policy.</li>
            <li><strong>Cashfree</strong> — handles payment processing. Payment data is governed by Cashfree&apos;s privacy policy.</li>
            <li><strong>Neon / Vercel</strong> — database and hosting infrastructure. Data is stored in secure, encrypted environments.</li>
          </ul>
          <p>We do not sell your data to any third party, ever.</p>
        </Section>

        <Section title="5. Data retention">
          <p>
            We retain your account and progress data for as long as your account is active. You may
            request deletion of your account and all associated data at any time by emailing{" "}
            <a href="mailto:support@prepzena.com" className="text-teal-600 hover:text-teal-700 font-medium">
              support@prepzena.com
            </a>.
          </p>
        </Section>

        <Section title="6. Cookies">
          <p>
            We use essential session cookies required for authentication (set by Clerk). We do not
            use tracking cookies or third-party advertising cookies.
          </p>
        </Section>

        <Section title="7. Your rights">
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your account and data.</li>
            <li>Export your progress data on request.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:support@prepzena.com" className="text-teal-600 hover:text-teal-700 font-medium">
              support@prepzena.com
            </a>.
          </p>
        </Section>

        <Section title="8. Security">
          <p>
            All data is transmitted over HTTPS. Database access is restricted and credentials are
            never stored in plain text. We follow industry-standard practices to protect your
            information, though no system can guarantee absolute security.
          </p>
        </Section>

        <Section title="9. Changes to this policy">
          <p>
            We may update this policy from time to time. Significant changes will be communicated
            via email or a notice on the platform. Continued use of Prepzena after changes
            constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            Questions about this policy? Email us at{" "}
            <a href="mailto:support@prepzena.com" className="text-teal-600 hover:text-teal-700 font-medium">
              support@prepzena.com
            </a>.
          </p>
        </Section>

      </div>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-bold text-slate-800"
        style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
        {title}
      </h2>
      <div className="text-sm text-slate-600 leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}
