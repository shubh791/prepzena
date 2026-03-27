// src/app/api/progress/route.js

import { NextResponse } from "next/server";
import { auth }         from "@clerk/nextjs/server";
import { prisma }       from "@/lib/prisma";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { noteId, completed, quizScore } = await req.json();
    if (!noteId) return NextResponse.json({ error: "noteId required" }, { status: 400 });

    // Get or create user
    let dbUser = await prisma.user.findUnique({
      where:  { clerkId: userId },
      select: { id: true, streak: true, lastSeen: true },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data:   { clerkId: userId, email: `${userId}@temp.com`, streak: 1, lastSeen: new Date() },
        select: { id: true, streak: true, lastSeen: true },
      });
    }

    // Get existing progress (needed to decide toggle direction)
    const existing = await prisma.progress.findUnique({
      where:  { userId_noteId: { userId: dbUser.id, noteId } },
      select: { completed: true },
    });

    const newCompleted = completed !== undefined
      ? completed
      : !(existing?.completed ?? false);

    // Upsert progress + conditionally update streak — in parallel
    const [progress] = await Promise.all([
      prisma.progress.upsert({
        where:  { userId_noteId: { userId: dbUser.id, noteId } },
        create: { userId: dbUser.id, noteId, completed: newCompleted, quizScore: quizScore ?? null },
        update: {
          completed: newCompleted,
          ...(quizScore !== undefined && { quizScore }),
        },
      }),
      newCompleted
        ? (() => {
            const now    = new Date();
            const last   = dbUser.lastSeen ? new Date(dbUser.lastSeen) : null;
            const diff   = last ? Math.floor((now - last) / 86400000) : 999;
            const streak = diff === 0 ? dbUser.streak : diff === 1 ? (dbUser.streak ?? 0) + 1 : 1;
            return prisma.user.update({ where: { id: dbUser.id }, data: { streak, lastSeen: now } });
          })()
        : Promise.resolve(null),
    ]);

    return NextResponse.json({ ok: true, progress, completed: newCompleted });
  } catch (err) {
    console.error("[POST /api/progress]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where:  { clerkId: userId },
      select: { id: true },
    });
    if (!dbUser) return NextResponse.json([]);

    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("noteId");

    const data = noteId
      ? await prisma.progress.findUnique({
          where:  { userId_noteId: { userId: dbUser.id, noteId } },
        }) ?? null
      : await prisma.progress.findMany({
          where:  { userId: dbUser.id },
          select: { noteId: true, completed: true, quizScore: true, updatedAt: true },
        });

    return NextResponse.json(data, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
