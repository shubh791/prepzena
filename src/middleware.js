// middleware.js  (root of project, next to package.json)
// Clerk v7 — async auth().protect() syntax

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/home(.*)",
  "/notes(.*)",
  "/coding(.*)",
  "/quiz(.*)",
  "/pyqs(.*)",
  "/pricing(.*)",
  "/settings(.*)",
]);

// Routes that signed-in users should never see (redirect → /home instantly)
const isAuthOrLanding = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Signed-in user hitting landing/auth pages → send straight to dashboard
  if (userId && isAuthOrLanding(req)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Signed-out user hitting protected routes → Clerk redirects to sign-in
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip static files, images, and OG/Twitter image routes (crawlers need these without auth)
    "/((?!_next/static|_next/image|favicon.ico|opengraph-image|twitter-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};