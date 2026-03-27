// src/app/layout.jsx
// Root layout — ClerkProvider + fonts + favicon

import { ClerkProvider }   from "@clerk/nextjs";
import { Sora, DM_Mono }   from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets:  ["latin"],
  variable: "--font-sora",
  display:  "swap",
});

const dmMono = DM_Mono({
  subsets:  ["latin"],
  weight:   ["400", "500"],
  variable: "--font-dm-mono",
  display:  "swap",
});

export const metadata = {
  title:       "Prepzena — Learn to Code Smarter",
  description: "Structured notes, coding exercises and PYQs for students.",
  icons: {
    // Uses public/prepzena-favicon.svg as the browser tab icon
    icon:     [{ url: "/prepzena-favicon.svg", type: "image/svg+xml" }],
    shortcut:  "/prepzena-favicon.svg",
    apple:     "/prepzena-favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${sora.variable} ${dmMono.variable}`}>
        <body className="min-h-screen flex flex-col bg-[#FAFAF8] antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}