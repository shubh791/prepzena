// src/app/api/pyqs/route.js
import { NextResponse }  from "next/server";
import { auth }          from "@clerk/nextjs/server";
import { prisma }        from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    // Fetch all papers
    const papers = await prisma.pYQ.findMany({
      orderBy: [{ university: "asc" }, { year: "desc" }],
      select: {
        id: true, title: true, slug: true,
        university: true, year: true, subject: true,
        isPremium: true, questions: true,
      },
    });

    let isPremium = false;
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { isPremium: true },
      });
      isPremium = user?.isPremium ?? false;
    }

    return NextResponse.json({ papers, isPremium });
  } catch (err) {
    console.error("PYQs API error:", err);
    return NextResponse.json({ papers: [], isPremium: false }, { status: 500 });
  }
}
