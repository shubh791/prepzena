// src/app/(marketing)/terms/page.jsx

export const metadata = {
  title:       "Terms of Use — Prepzena",
  description: "Terms and conditions for using the Prepzena platform.",
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-10">

      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs font-mono tracking-widest uppercase text-teal-600">Legal</p>
        <h1 className="text-3xl font-bold text-slate-900"
          style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
          Terms of Use
        </h1>
        <p className="text-sm text-slate-400 font-mono">Last updated: March 2026</p>
      </div>

      <div className="space-y-8">

        <Section title="1. Acceptance of terms">
          <p>
            By creating an account or using Prepzena (&ldquo;the platform&rdquo;), you agree to these
            Terms of Use. If you do not agree, please do not use the platform.
          </p>
        </Section>

        <Section title="2. Description of service">
          <p>
            Prepzena provides structured study notes, coding exercises, quizzes, and previous year
            question papers for CS/IT students. Some features are available for free; others require
            a one-time ₹99 All Access purchase.
          </p>
        </Section>

        <Section title="3. Accounts">
          <ul>
            <li>You must be at least 13 years old to create an account.</li>
            <li>You are responsible for maintaining the security of your account credentials.</li>
            <li>You may not create accounts for others or share your account.</li>
            <li>We reserve the right to suspend accounts that violate these terms.</li>
          </ul>
        </Section>

        <Section title="4. Payments and refunds">
          <ul>
            <li>The All Access plan is a <strong>one-time payment of ₹99</strong> that grants lifetime access to all premium content.</li>
            <li>Payments are processed securely by Cashfree. We do not store your card details.</li>
            <li>Due to the digital nature of the content, <strong>refunds are not provided</strong> once premium access has been granted, unless required by applicable law.</li>
            <li>If you experience a payment issue, contact us at{" "}
              <a href="mailto:support@prepzena.com" className="text-teal-600 hover:text-teal-700 font-medium">
                support@prepzena.com
              </a>{" "}within 7 days.
            </li>
          </ul>
        </Section>

        <Section title="5. Intellectual property">
          <ul>
            <li>All content on Prepzena — notes, problems, solutions, quizzes, and code — is owned by Prepzena or its content contributors and is protected by copyright.</li>
            <li>You may use the content for personal, non-commercial study purposes only.</li>
            <li>You may not reproduce, redistribute, sell, or sublicense any content from the platform.</li>
            <li>Scraping or automated extraction of content is strictly prohibited.</li>
          </ul>
        </Section>

        <Section title="6. Acceptable use">
          <p>You agree not to:</p>
          <ul>
            <li>Share your account credentials or premium access with others.</li>
            <li>Attempt to bypass authentication, payment, or access controls.</li>
            <li>Upload or transmit malicious code or content.</li>
            <li>Use the platform in any way that violates applicable law.</li>
          </ul>
        </Section>

        <Section title="7. Availability">
          <p>
            We aim to keep the platform available at all times but cannot guarantee uninterrupted
            access. We may perform maintenance, updates, or experience outages. We are not liable
            for losses resulting from downtime.
          </p>
        </Section>

        <Section title="8. Disclaimer of warranties">
          <p>
            Prepzena is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied.
            We do not guarantee that the content is error-free or that use of the platform will
            guarantee specific academic or career outcomes.
          </p>
        </Section>

        <Section title="9. Limitation of liability">
          <p>
            To the maximum extent permitted by law, Prepzena and its founder shall not be liable
            for any indirect, incidental, or consequential damages arising from your use of the
            platform. Our total liability to you shall not exceed the amount you paid us in the
            12 months preceding the claim.
          </p>
        </Section>

        <Section title="10. Changes to terms">
          <p>
            We may update these terms at any time. We will notify you of significant changes via
            email or an in-app notice. Continued use of the platform after changes constitutes
            your acceptance of the revised terms.
          </p>
        </Section>

        <Section title="11. Governing law">
          <p>
            These terms are governed by the laws of India. Any disputes shall be subject to the
            jurisdiction of courts in India.
          </p>
        </Section>

        <Section title="12. Contact">
          <p>
            Questions about these terms? Email us at{" "}
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
