// src/app/(app)/layout.jsx
// All authenticated app pages get AppNavbar + AppFooter

import { auth }          from "@clerk/nextjs/server";
import { redirect }      from "next/navigation";
import AppNavbar         from "@/components/app/AppNavbar";
import AppFooter         from "@/components/app/AppFooter";
import QueryProvider     from "@/lib/QueryProvider";
import { prisma }        from "@/lib/prisma";

export default async function AppLayout({ children }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({
    where:  { clerkId: userId },
    select: { isPremium: true },
  }).catch(() => null);

  const isPremium = dbUser?.isPremium ?? false;

  return (
    <QueryProvider>
      <div className="min-h-screen flex flex-col bg-[#F8F7F4]">
        <AppNavbar isPremium={isPremium} />
        <main className="flex-1">
          {children}
        </main>
        <AppFooter />
      </div>
    </QueryProvider>
  );
}