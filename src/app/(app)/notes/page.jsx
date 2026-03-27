// src/app/(app)/notes/page.jsx
import { auth }     from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma }   from "@/lib/prisma";
import NotesHub     from "./_components/NotesHub";

export async function generateMetadata({ searchParams }) {
  const p = await searchParams;
  return {
    title:       p?.topic ? `${p.topic} — Notes | Prepzena` : "Study Notes — Prepzena",
    description: "Structured coding notes from basics to advanced.",
  };
}

export default async function NotesPage({ searchParams }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const p               = await searchParams;
  const activeTopicSlug = p?.topic ?? "";

  const [topics, dbUser, progress] = await Promise.all([
    prisma.topic.findMany({
      orderBy: { order: "asc" },
      include: {
        notes: {
          orderBy: { order: "asc" },
          select: {
            id: true, title: true, slug: true,
            isPremium: true, readTime: true,
            order: true, summary: true,
          },
        },
      },
    }).catch(() => []),
    prisma.user.findUnique({
      where:  { clerkId: userId },
      select: { isPremium: true },
    }).catch(() => null),
    prisma.progress.findMany({
      where:  { user: { clerkId: userId } },
      select: { noteId: true, completed: true, quizScore: true },
    }).catch(() => []),
  ]);

  const progressMap = Object.fromEntries(progress.map(p => [p.noteId, p]));

  return (
    <NotesHub
      topics={topics}
      progressMap={progressMap}
      isPremium={dbUser?.isPremium ?? false}
      activeTopicSlug={activeTopicSlug}
    />
  );
}