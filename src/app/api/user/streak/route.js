// src/app/api/user/streak/route.js
// GET — returns current user streak from DB

import { NextResponse } from "next/server";
import { auth }         from "@clerk/nextjs/server";
import { prisma }       from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where:  { clerkId: userId },
      select: { streak: true, isPremium: true },
    });

    return NextResponse.json({ streak: user?.streak ?? 0, isPremium: user?.isPremium ?? false });
  } catch (err) {
    console.error("[GET /api/user/streak]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
