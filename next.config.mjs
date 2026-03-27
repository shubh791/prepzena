/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent Prisma from being bundled by Turbopack/webpack — must run server-side only
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
