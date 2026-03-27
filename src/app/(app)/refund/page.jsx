// src/app/(app)/refund/page.jsx
// Refund & Cancellation Policy — required by Cashfree

export const metadata = {
  title:       "Refund Policy — Prepzena",
  description: "Refund and cancellation policy for Prepzena payments.",
};

const LAST_UPDATED = "25 March 2026";

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      <div className="mb-8">
        <p className="text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">Legal</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-2"
          style={{ fontFamily:"var(--font-sora,'Sora',sans-serif)" }}>
          Refund &amp; Cancellation Policy
        </h1>
        <p className="text-sm text-slate-400 font-mono">Last updated: {LAST_UPDATED}</p>
      </div>

      {/* Quick summary card */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 mb-8">
        <p className="text-sm font-bold text-teal-800 mb-2">📋 Quick Summary</p>
        <ul className="space-y-1.5 text-sm text-teal-700">
          <li>✅ Full refund within <strong>7 days</strong> of purchase — no questions asked</li>
          <li>✅ Instant refund if you were charged but didn't get access</li>
          <li>✅ Contact us at support@prepzena.com for any payment issues</li>
          <li>⚡ Refunds processed within <strong>5–7 business days</strong></li>
        </ul>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-8
        [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mb-3
        [&_p]:text-sm [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-3
        [&_ul]:space-y-1.5 [&_ul]:mb-4
        [&_li]:text-sm [&_li]:text-slate-600 [&_li]:leading-relaxed">

        <section>
          <h2>1. Our Refund Promise</h2>
          <p>At Prepzena, we want you to be completely satisfied with your purchase. If you're not happy for any reason, we offer a straightforward refund policy.</p>
        </section>

        <section>
          <h2>2. Eligibility for Refund</h2>
          <p>You are eligible for a full refund if:</p>
          <ul className="list-disc pl-5">
            <li>You request a refund within <strong>7 days</strong> of your purchase date</li>
            <li>You were charged but premium access was not activated on your account</li>
            <li>You experienced a technical issue that prevented you from accessing the content</li>
            <li>You were charged twice for the same purchase (duplicate payment)</li>
          </ul>
        </section>

        <section>
          <h2>3. Non-Refundable Cases</h2>
          <p>Refunds will not be issued if:</p>
          <ul className="list-disc pl-5">
            <li>More than 7 days have passed since the purchase</li>
            <li>You have accessed and downloaded a significant portion of the premium content</li>
            <li>The request is due to change of mind after extensively using the premium content</li>
          </ul>
        </section>

        <section>
          <h2>4. How to Request a Refund</h2>
          <p>To request a refund, email us at <a href="mailto:support@prepzena.com" className="text-teal-600 font-semibold hover:underline">support@prepzena.com</a> with:</p>
          <ul className="list-disc pl-5">
            <li>Your registered email address</li>
            <li>Order ID or transaction ID (from your email receipt)</li>
            <li>Reason for refund (optional but helpful)</li>
          </ul>
          <p>We will respond within <strong>24 hours</strong> and process approved refunds within <strong>5–7 business days</strong>.</p>
        </section>

        <section>
          <h2>5. Refund Process</h2>
          <ul className="list-disc pl-5">
            <li>Refunds are credited back to the original payment method</li>
            <li>UPI refunds: 1–3 business days</li>
            <li>Card refunds: 5–7 business days (depends on your bank)</li>
            <li>Net banking: 3–5 business days</li>
          </ul>
        </section>

        <section>
          <h2>6. Cancellation Policy</h2>
          <p>Prepzena does not offer subscription plans — all purchases are one-time payments. Therefore, there is nothing to "cancel." Your access remains active indefinitely after purchase.</p>
          <p>If you wish to cancel a payment that is in progress, you may close the payment window. No amount will be charged if the payment is not completed.</p>
        </section>

        <section>
          <h2>7. Failed Payments</h2>
          <p>If your payment failed but your account was debited, the amount will be automatically reversed by your bank or payment provider within 5–7 business days. If it is not reversed, contact us immediately at <a href="mailto:support@prepzena.com" className="text-teal-600 font-semibold hover:underline">support@prepzena.com</a>.</p>
        </section>

        <section>
          <h2>8. Contact Us</h2>
          <p>For any payment or refund related queries:</p>
          <ul className="list-disc pl-5">
            <li>Email: <a href="mailto:support@prepzena.com" className="text-teal-600 font-semibold">support@prepzena.com</a></li>
            <li>Response time: Within 24 hours on working days</li>
          </ul>
        </section>
      </div>
    </div>
  );
}