// src/app/api/payments/create-order/route.js
// Creates a Cashfree order and returns the payment_session_id for Web Checkout.

import { NextResponse }  from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma }        from "@/lib/prisma";

// Only "all" plan exposed in the UI (₹99 one-time all-access).
// Keep the map in case per-note unlocks are added later.
const PLAN_AMOUNT = { all: 99 };

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const plan  = body.plan ?? "all";
    const rupees = PLAN_AMOUNT[plan];
    if (!rupees) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    let dbUser = await prisma.user.findUnique({
      where:  { clerkId: userId },
      select: { id: true, email: true, name: true, isPremium: true },
    });

    // If user not in DB yet (webhook missed / local dev), create from Clerk data
    if (!dbUser) {
      const clerkUser = await currentUser();
      const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? `${userId}@unknown.com`;
      const name  = [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") || null;
      dbUser = await prisma.user.upsert({
        where:  { clerkId: userId },
        create: { clerkId: userId, email, name, streak: 0, lastSeen: new Date() },
        update: {},
        select: { id: true, email: true, name: true, isPremium: true },
      });
    }

    // Don't charge a user who is already premium
    if (dbUser.isPremium && plan === "all") {
      return NextResponse.json({ error: "Already premium" }, { status: 400 });
    }

    // Unique order ID for this transaction
    const orderId = `PZ_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const env     = process.env.CASHFREE_ENV ?? "sandbox";
    const baseUrl = env === "production"
      ? "https://api.cashfree.com/pg/orders"
      : "https://sandbox.cashfree.com/pg/orders";

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    // Create order on Cashfree
    const cfRes = await fetch(baseUrl, {
      method:  "POST",
      headers: {
        "Content-Type":    "application/json",
        "x-api-version":   "2023-08-01",
        "x-client-id":     process.env.CASHFREE_APP_ID     ?? "",
        "x-client-secret": process.env.CASHFREE_SECRET_KEY ?? "",
      },
      body: JSON.stringify({
        order_id:       orderId,
        order_amount:   rupees,
        order_currency: "INR",
        customer_details: {
          customer_id:    dbUser.id,
          customer_email: dbUser.email,
          customer_name:  dbUser.name ?? "Student",
          customer_phone: "9999999999", // Cashfree requires phone; user can update on checkout
        },
        order_meta: {
          // Cashfree replaces {order_id} in the URL with the actual order ID
          return_url: `${appUrl}/api/payments/verify?order_id={order_id}`,
          notify_url: `${appUrl}/api/payments/webhook`,
        },
        order_tags: { plan, userId: dbUser.id },
      }),
    });

    if (!cfRes.ok) {
      const err = await cfRes.json().catch(() => ({}));
      console.error("[create-order] Cashfree error:", JSON.stringify(err));
      const msg = !process.env.CASHFREE_APP_ID
        ? "Set CASHFREE_APP_ID and CASHFREE_SECRET_KEY in .env"
        : (err.message ?? "Payment service error");
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    const cf = await cfRes.json();

    // Persist a pending payment record in our DB
    await prisma.payment.create({
      data: {
        userId:          dbUser.id,
        amount:          rupees * 100, // store in paise
        status:          "pending",
        razorpayOrderId: orderId,      // reusing field — stores our order ID
      },
    }).catch((e) => console.error("[create-order] DB save failed:", e.message));

    return NextResponse.json({
      orderId,
      sessionId: cf.payment_session_id,
    });
  } catch (err) {
    console.error("[POST /api/payments/create-order]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
