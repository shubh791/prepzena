// src/app/api/user/delete/route.js
// DELETE — removes user from Clerk + Prisma DB

import { NextResponse }  from "next/server";
import { auth }          from "@clerk/nextjs/server";
import { clerkClient }   from "@clerk/nextjs/server";
import { prisma }        from "@/lib/prisma";

export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Delete from DB first (cascade deletes progress, payments etc.)
    await prisma.user.deleteMany({ where: { clerkId: userId } });

    // Delete from Clerk
    const clerk = await clerkClient();
    await clerk.users.deleteUser(userId);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/user/delete]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
