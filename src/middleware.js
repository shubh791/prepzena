// middleware.js  (root of project, next to package.json)
// Clerk v7 — async auth().protect() syntax
// NO imports from proxy.js or any local files

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/home(.*)",
  "/notes(.*)",
  "/coding(.*)",
  "/quiz(.*)",
  "/pyqs(.*)",
  "/pricing(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
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