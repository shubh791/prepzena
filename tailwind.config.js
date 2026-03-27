/** @type {import('tailwindcss').Config} */

/**
 * ─────────────────────────────────────────────────────────────
 *  tailwind.config.js
 *  Merge the `extend` block below into your existing config.
 *  Adds Sora + DM Mono as named font families.
 * ─────────────────────────────────────────────────────────────
 */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        /* Usage: className="font-display" */
        display: ["var(--font-sora)", "sans-serif"],
        /* Usage: className="font-sans" (already default via body) */
        sans: ["var(--font-sans)", "sans-serif"],
        /* Usage: className="font-mono" */
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        /* Prepzena brand teal — extends Tailwind's teal */
        brand: {
          50:  "#f0fdf9",
          100: "#ccfbef",
          500: "#0EA98B",
          600: "#0d9276",
          700: "#0a7a62",
        },
      },
    },
  },
  plugins: [],
};