// ─────────────────────────────────────────────
//  src/app/(auth)/layout.jsx
//  Adds shared Navbar + Footer to sign-in/sign-up
// ─────────────────────────────────────────────

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}