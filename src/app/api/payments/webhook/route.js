// src/app/api/payments/webhook/route.js
// Cashfree sends server-to-server payment notifications here (notify_url).
// This is a belt-and-suspenders backup — the main verification happens in /verify.
// Cashfree signs the payload with a timestamp + signature header.

import { NextResponse } from "next/server";
import { prisma }       from "@/lib/prisma";
import crypto           from "crypto";

export async function POST(req) {
  try {
    const rawBody  = await req.text();
    const payload  = JSON.parse(rawBody);

    // ── Verify Cashfree signature ─────────────────────────────
    const timestamp = req.headers.get("x-webhook-timestamp");
    const signature = req.headers.get("x-webhook-signature");
    const secret    = process.env.CASHFREE_SECRET_KEY ?? "";

    if (timestamp && signature && secret) {
      const signedPayload = `${timestamp}${rawBody}`;
      const expected = crypto
        .createHmac("sha256", secret)
        .update(signedPayload)
        .digest("base64");

      if (expected !== signature) {
        console.warn("[webhook] Signature mismatch — ignoring");
        return NextResponse.json({ ok: false }, { status: 401 });
      }
    }

    // ── Process payment event ─────────────────────────────────
    const event  = payload?.type;            // e.g. "PAYMENT_SUCCESS_WEBHOOK"
    const data   = payload?.data ?? {};
    const order  = data.order ?? {};
    const orderId = order.order_id;

    if (!orderId || event !== "PAYMENT_SUCCESS_WEBHOOK") {
      // Acknowledge non-payment events silently
      return NextResponse.json({ ok: true });
    }

    // Find our payment record
    const payment = await prisma.payment.findFirst({
      where:  { razorpayOrderId: orderId },
      select: { id: true, userId: true, status: true },
    });

    // Idempotency check
    if (payment?.status === "success") {
      return NextResponse.json({ ok: true });
    }

    const plan   = order.order_tags?.plan ?? "all";
    const userId = payment?.userId ?? order.order_tags?.userId;

    if (userId) {
      await Promise.all([
        payment
          ? prisma.payment.update({
              where: { id: payment.id },
              data:  {
                status:            "success",
                razorpayPaymentId: data.payment?.cf_payment_id ?? null,
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
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/payments/webhook]", err.message);
    // Always return 200 to Cashfree so it doesn't retry indefinitely
    return NextResponse.json({ ok: true });
  }
}
