// src/app/api/webhooks/clerk/route.js
// Syncs Clerk user events to Prisma DB
// Requires WEBHOOK_SECRET from Clerk Dashboard → Webhooks

import { NextResponse } from "next/server";
import { headers }      from "next/headers";
import { Webhook }      from "svix";
import { prisma }       from "@/lib/prisma";

export async function POST(req) {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    console.error("[clerk/webhook] WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // Get raw body and svix headers
  const payload    = await req.text();
  const headerList = await headers();
  const svixId        = headerList.get("svix-id");
  const svixTimestamp = headerList.get("svix-timestamp");
  const svixSignature = headerList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  // Verify signature
  let event;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(payload, {
      "svix-id":        svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    console.error("[clerk/webhook] Signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { type, data } = event;

  try {
    if (type === "user.created") {
      const email = data.email_addresses?.[0]?.email_address ?? "";
      const name  = [data.first_name, data.last_name].filter(Boolean).join(" ") || null;
      await prisma.user.upsert({
        where:  { clerkId: data.id },
        create: {
          clerkId:  data.id,
          email,
          name,
          avatar:   data.image_url ?? null,
          streak:   0,
          lastSeen: new Date(),
        },
        update: {
          email,
          name,
          avatar: data.image_url ?? null,
        },
      });
    }

    if (type === "user.updated") {
      const email = data.email_addresses?.[0]?.email_address ?? "";
      const name  = [data.first_name, data.last_name].filter(Boolean).join(" ") || null;
      await prisma.user.updateMany({
        where: { clerkId: data.id },
        data:  { email, name, avatar: data.image_url ?? null },
      });
    }

    if (type === "user.deleted") {
      await prisma.user.deleteMany({ where: { clerkId: data.id } });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[clerk/webhook] DB error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
