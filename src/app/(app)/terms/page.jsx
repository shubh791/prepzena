// src/app/(app)/terms/page.jsx
// Terms & Conditions — required by Cashfree

export const metadata = {
  title:       "Terms & Conditions — Prepzena",
  description: "Terms and conditions for using Prepzena.",
};

const LAST_UPDATED = "25 March 2026";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      <div className="mb-8">
        <p className="text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">Legal</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-2"
          style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-slate-400 font-mono">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-8
        [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mb-3
        [&_p]:text-sm [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-3
        [&_ul]:space-y-1.5 [&_ul]:mb-4 [&_ul]:pl-0 [&_ul]:list-none
        [&_li]:text-sm [&_li]:text-slate-600 [&_li]:pl-4 [&_li]:relative
        [&_li]:before:content-['▸'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-teal-500">

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using Prepzena ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
        </section>

        <section>
          <h2>2. About Prepzena</h2>
          <p>Prepzena is a digital education platform offering structured study notes, coding exercises, quizzes, and previous year question papers for students preparing for technical examinations and interviews.</p>
        </section>

        <section>
          <h2>3. User Accounts</h2>
          <ul>
            <li>You must create an account to access the platform</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You must be at least 13 years old to use this platform</li>
            <li>One account per person — sharing accounts is not permitted</li>
          </ul>
        </section>

        <section>
          <h2>4. Premium Content &amp; Payments</h2>
          <ul>
            <li>Some content on Prepzena requires a one-time payment to access</li>
            <li>All payments are processed securely via Cashfree Payments</li>
            <li>Prices are listed in Indian Rupees (INR)</li>
            <li>Access is granted immediately upon successful payment confirmation</li>
            <li>Purchased access is permanent — no expiry date</li>
            <li>Payments are non-transferable between accounts</li>
          </ul>
        </section>

        <section>
          <h2>5. Intellectual Property</h2>
          <p>All content on Prepzena — including notes, code examples, quizzes, and question papers — is owned by Prepzena or its content creators. You may not:</p>
          <ul>
            <li>Copy, reproduce or redistribute any content without written permission</li>
            <li>Use our content for commercial purposes</li>
            <li>Share premium content with non-paying users</li>
          </ul>
        </section>

        <section>
          <h2>6. Acceptable Use</h2>
          <p>You agree not to use Prepzena to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Upload or transmit malicious code or harmful content</li>
            <li>Harass, abuse, or harm other users</li>
          </ul>
        </section>

        <section>
          <h2>7. Disclaimer of Warranties</h2>
          <p>Prepzena is provided "as is" without warranties of any kind. We do not guarantee that the platform will be error-free, uninterrupted, or meet your specific requirements.</p>
        </section>

        <section>
          <h2>8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Prepzena shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.</p>
        </section>

        <section>
          <h2>9. Privacy</h2>
          <p>Your use of Prepzena is also governed by our Privacy Policy. We collect only the data necessary to provide our services and do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2>10. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of significant changes via email.</p>
        </section>

        <section>
          <h2>11. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.</p>
        </section>

        <section>
          <h2>12. Contact</h2>
          <p>For questions about these terms, contact us at: <a href="mailto:support@prepzena.com" className="text-teal-600 font-semibold hover:underline">support@prepzena.com</a></p>
        </section>
      </div>
    </div>
  );
}