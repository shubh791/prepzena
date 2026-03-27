// src/app/api/user/update/route.js
// PATCH { university } → updates user.university in DB

import { NextResponse } from "next/server";
import { auth }         from "@clerk/nextjs/server";
import { prisma }       from "@/lib/prisma";

export async function PATCH(req) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { university } = body;

    if (typeof university !== "string") {
      return NextResponse.json({ error: "university must be a string" }, { status: 400 });
    }

    const updated = await prisma.user.updateMany({
      where: { clerkId: userId },
      data:  { university: university.trim() || null },
    });

    if (updated.count === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PATCH /api/user/update]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
