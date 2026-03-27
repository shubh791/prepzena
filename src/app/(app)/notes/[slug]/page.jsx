// src/app/(app)/notes/[slug]/page.jsx
export const dynamic    = "force-dynamic";
export const revalidate = 0;

import { auth }               from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { prisma }             from "@/lib/prisma";
import NoteReader             from "./_components/NoteReader";

export async function generateMetadata({ params }) {
  const p    = await params;
  const note = await prisma.note.findUnique({
    where:   { slug: p.slug },
    include: { topic: { select: { title: true } } },
  }).catch(() => null);
  if (!note) return { title: "Note not found — Prepzena" };
  return {
    title:       `${note.title} — Prepzena`,
    description: note.summary ?? `Learn ${note.title} on Prepzena.`,
  };
}

export default async function NoteDetailPage({ params }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const p    = await params;
  const slug = p.slug;

  const note = await prisma.note.findUnique({
    where:   { slug },
    include: {
      topic: true,
      quizzes: {
        select: { id: true, question: true, options: true, answer: true, explanation: true },
      },
      _count: { select: { reviews: true } },
    },
  }).catch(() => null);

  if (!note) notFound();

  const [dbUser, unlock, progress, prevNote, nextNote] = await Promise.all([
    prisma.user.findUnique({
      where:  { clerkId: userId },
      select: { id: true, isPremium: true },
    }).catch(() => null),
    prisma.unlock.findFirst({
      where: { note: { slug }, user: { clerkId: userId } },
    }).catch(() => null),
    prisma.progress.findFirst({
      where: { note: { slug }, user: { clerkId: userId } },
    }).catch(() => null),
    prisma.note.findFirst({
      where:   { topicId: note.topicId, order: { lt: note.order } },
      orderBy: { order: "desc" },
      select:  { title: true, slug: true },
    }).catch(() => null),
    prisma.note.findFirst({
      where:   { topicId: note.topicId, order: { gt: note.order } },
      orderBy: { order: "asc" },
      select:  { title: true, slug: true },
    }).catch(() => null),
  ]);

  const canRead = !note.isPremium || dbUser?.isPremium || !!unlock;

  return (
    <NoteReader
      note={note}
      canRead={canRead}
      completed={progress?.completed ?? false}
      quizScore={progress?.quizScore ?? null}
      userId={dbUser?.id ?? null}
      prevNote={prevNote}
      nextNote={nextNote}
    />
  );
}