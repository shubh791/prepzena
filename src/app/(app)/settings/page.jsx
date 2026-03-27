// src/app/(app)/settings/page.jsx
// Server component — fetches user data, renders SettingsClient

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect }          from "next/navigation";
import { prisma }            from "@/lib/prisma";
import SettingsClient        from "./SettingsClient";

export const metadata = {
  title:       "Settings — Prepzena",
  description: "Manage your profile and account settings.",
};

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const [clerkUser, dbUser] = await Promise.all([
    currentUser(),
    prisma.user.findUnique({
      where:  { clerkId: userId },
      select: {
        university: true,
        isPremium:  true,
        streak:     true,
        createdAt:  true,
        _count: {
          select: { progress: true },
        },
      },
    }).catch(() => null),
  ]);

  // Count completed notes separately
  const completedCount = await prisma.progress.count({
    where: { user: { clerkId: userId }, completed: true },
  }).catch(() => 0);

  const userData = {
    name:       [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") || "User",
    email:      clerkUser?.emailAddresses?.[0]?.emailAddress ?? "",
    avatar:     clerkUser?.imageUrl ?? null,
    university: dbUser?.university ?? "",
    isPremium:  dbUser?.isPremium  ?? false,
    streak:     dbUser?.streak     ?? 0,
    notesRead:  completedCount,
    memberSince: dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString("en-IN", { month:"long", year:"numeric" }) : "—",
  };

  return <SettingsClient user={userData} />;
}
