// src/app/api/search/route.js
// GET /api/search?q=query — search notes by title and summary

import { NextResponse } from "next/server";
import { auth }         from "@clerk/nextjs/server";
import { prisma }       from "@/lib/prisma";

export async function GET(req) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() ?? "";

    if (!q) return NextResponse.json([]);

    const notes = await prisma.note.findMany({
      where: {
        OR: [
          { title:   { contains: q, mode: "insensitive" } },
          { summary: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id:      true,
        title:   true,
        slug:    true,
        summary: true,
        topic: {
          select: { title: true, slug: true, color: true, icon: true },
        },
      },
      take: 8,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(notes);
  } catch (err) {
    console.error("[GET /api/search]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
