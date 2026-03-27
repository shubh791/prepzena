// src/app/api/payments/verify/route.js
// Cashfree redirects here after the user completes (or cancels) Web Checkout.
// URL: /api/payments/verify?order_id=PZ_...
// We re-verify with Cashfree's API (never trust the redirect alone).

import { NextResponse } from "next/server";
import { prisma }       from "@/lib/prisma";

export async function GET(req) {
  const appUrl  = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const fail    = () => NextResponse.redirect(new URL("/pricing?payment=failed",  appUrl));
  const success = () => NextResponse.redirect(new URL("/pricing?payment=success", appUrl));

  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");
    if (!orderId) return fail();

    const env     = process.env.CASHFREE_ENV ?? "sandbox";
    const baseUrl = env === "production"
      ? `https://api.cashfree.com/pg/orders/${orderId}`
      : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

    // ── Re-verify order status with Cashfree ─────────────────
    const cfRes = await fetch(baseUrl, {
      headers: {
        "x-api-version":   "2023-08-01",
        "x-client-id":     process.env.CASHFREE_APP_ID     ?? "",
        "x-client-secret": process.env.CASHFREE_SECRET_KEY ?? "",
      },
    });

    if (!cfRes.ok) {
      console.error("[verify] Cashfree fetch failed:", cfRes.status);
      return fail();
    }

    const cf = await cfRes.json();

    // order_status: PAID | ACTIVE | EXPIRED | CANCELLED
    if (cf.order_status !== "PAID") {
      console.warn("[verify] Order not PAID:", cf.order_status, orderId);
      return fail();
    }

    // ── Find our payment record ───────────────────────────────
    const payment = await prisma.payment.findFirst({
      where:  { razorpayOrderId: orderId },
      select: { id: true, userId: true, status: true },
    });

    if (!payment) {
      // Payment record missing — still mark premium using order_tags
      console.warn("[verify] No payment record for orderId:", orderId);
    }

    // Idempotency: skip if already processed
    if (payment?.status === "success") return success();

    const plan = cf.order_tags?.plan ?? "all";

    // ── Update DB ─────────────────────────────────────────────
    const userId = payment?.userId ?? cf.order_tags?.userId;
    if (!userId) { console.error("[verify] No userId found"); return fail(); }

    await Promise.all([
      payment
        ? prisma.payment.update({
            where: { id: payment.id },
            data:  {
              status:            "success",
              razorpayPaymentId: cf.cf_payment_id ?? cf.cf_order_id ?? null,
            },
          })
        : Promise.resolve(),

      plan === "all"
        ? prisma.user.update({
            where: { id: userId },
            data:  { isPremium: true },
          })
        : Promise.resolve(),
    ]);

    return success();
  } catch (err) {
    console.error("[GET /api/payments/verify]", err.message);
    return fail();
  }
}
