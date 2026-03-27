# Prepzena

> Structured notes · Coding exercises · PYQs — built for students who want results fast.

**Author:** Shubham Panghal
**LinkedIn:** [shubham-panghal](https://www.linkedin.com/in/shubham-panghal)
**GitHub:** [shubh791](https://github.com/shubh791)

---

## What is Prepzena?

Prepzena is a full-stack EdTech web app for CS/IT students. It gives you:

- **Notes** — topic-wise structured study notes (Arrays, DBMS, OS, CN, etc.)
- **Coding** — 25 FAANG-level premium problems per language (Python, JavaScript, Java, C++, C) + free DSA problems with a live code editor
- **Quizzes** — MCQ quizzes unlocked after reading a note
- **PYQs** — Previous year question papers from VTU, PIET, KUK, Anna University, AKTU, CBSE
- **Dashboard** — streak tracking, weekly goal, progress bars per topic
- **Pricing** — free tier + one-time ₹99 premium unlock (no subscription, instant UI update after payment)

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | Next.js 15 (App Router)             |
| Auth        | Clerk                               |
| Database    | PostgreSQL + Prisma ORM             |
| Payments    | Cashfree                            |
| Styling     | Tailwind CSS + shadcn/ui            |
| State       | Zustand + TanStack Query            |
| Code Runner | JDoodle API (Piston as fallback)    |

---

## Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted, e.g. Neon, Supabase, Railway)
- Clerk account — [clerk.com](https://clerk.com)
- JDoodle account (optional, for code execution) — [jdoodle.com](https://jdoodle.com)
- Cashfree account (optional, for payments) — [cashfree.com](https://www.cashfree.com)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/shubh791/prepzena.git
cd prepzena
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
# ── Database ──────────────────────────────────────────────────
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/prepzena"

# ── Clerk (Authentication) ────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/home
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/home
CLERK_WEBHOOK_SECRET=whsec_...

# ── Cashfree (Payments) ───────────────────────────────────────
CASHFREE_APP_ID=...
CASHFREE_SECRET_KEY=...
CASHFREE_ENV=TEST          # or PRODUCTION

# ── JDoodle (Code Execution) ──────────────────────────────────
JDOODLE_CLIENT_ID=...
JDOODLE_CLIENT_SECRET=...

# ── App URL ───────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Clerk Webhook:** In your Clerk dashboard → Webhooks → add endpoint
> `https://your-domain.com/api/webhooks/clerk` with events: `user.created`, `user.updated`, `user.deleted`

### 4. Set up the database

```bash
# Push schema to your database
npx prisma db push

# (Optional) Open Prisma Studio to view your data
npx prisma studio
```

### 5. Seed the database

```bash
npx prisma db seed
```

This populates topics, notes, quizzes, and PYQ papers.

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command                  | Description                          |
|--------------------------|--------------------------------------|
| `npm run dev`            | Start development server             |
| `npm run build`          | Build for production                 |
| `npm start`              | Start production server              |
| `npm run lint`           | Run ESLint                           |
| `npx prisma db push`     | Sync schema to database              |
| `npx prisma db seed`     | Seed initial data                    |
| `npx prisma studio`      | Open database GUI                    |

---

## Folder Structure

```
prepzena/
├── prisma/
│   ├── schema.prisma          # Database models
│   ├── seed.js                # Seed data (topics, notes, quizzes, PYQs)
│   └── migrations/            # Migration history
│
├── public/
│   └── prepzena-favicon.svg   # App favicon
│
├── src/
│   ├── app/
│   │   ├── (app)/             # Authenticated app pages
│   │   │   ├── home/          # Dashboard
│   │   │   ├── notes/         # Notes list + note reader
│   │   │   ├── coding/        # DSA coding problems + editor
│   │   │   ├── quiz/          # MCQ quizzes
│   │   │   ├── pyqs/          # Previous year papers
│   │   │   ├── pricing/       # Pricing page
│   │   │   ├── settings/      # User settings
│   │   │   ├── contact/       # Contact page
│   │   │   ├── privacy/       # Privacy policy
│   │   │   ├── terms/         # Terms of use
│   │   │   └── refund/        # Refund policy
│   │   │
│   │   ├── (auth)/            # Auth pages (sign-in, sign-up)
│   │   ├── (marketing)/       # Landing page (/)
│   │   │
│   │   ├── api/
│   │   │   ├── execute/       # Code execution (JDoodle/Piston)
│   │   │   ├── payments/      # Cashfree create-order + verify
│   │   │   ├── progress/      # Note completion + quiz scores
│   │   │   ├── pyqs/          # PYQ papers API
│   │   │   ├── search/        # Global search
│   │   │   ├── user/          # Streak, update, delete
│   │   │   └── webhooks/      # Clerk user sync
│   │   │
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout (fonts, Clerk, QueryProvider)
│   │   └── not-found.jsx      # 404 page
│   │
│   ├── components/
│   │   ├── app/               # AppNavbar, AppFooter (used in app pages)
│   │   ├── home/              # Landing page sections (Hero, Features, CTA)
│   │   ├── shared/            # Navbar, Footer (used globally)
│   │   └── ui/                # shadcn/ui components
│   │
│   ├── hooks/
│   │   ├── useNotes.js        # TanStack Query hook for notes
│   │   └── useRouteReady.js   # Detects route change for loading state
│   │
│   ├── lib/
│   │   ├── prisma.js          # Prisma client singleton
│   │   ├── QueryProvider.jsx  # TanStack Query provider
│   │   └── utils.js           # cn() helper (clsx + tailwind-merge)
│   │
│   ├── middleware.js           # Clerk auth middleware (route protection)
│   └── store/
│       └── useAppStore.js     # Zustand global state
│
├── tailwind.config.js         # Tailwind + custom fonts config
├── package.json
└── .env                       # Environment variables (not committed)
```

---

## Database Models

| Model      | Purpose                                        |
|------------|------------------------------------------------|
| `User`     | Synced from Clerk; stores streak, isPremium    |
| `Topic`    | Subject group (e.g. "Arrays & Hashing")        |
| `Note`     | Individual study note inside a topic           |
| `Quiz`     | MCQ question linked to a note                  |
| `PYQ`      | Previous year question paper                   |
| `Progress` | Tracks which notes a user has read + quiz score|
| `Unlock`   | Records per-note or per-PYQ premium unlocks    |
| `Payment`  | Cashfree payment transaction records           |

---

## Deployment

The app is built for deployment on **Vercel**:

1. Push to GitHub
2. Import in Vercel → set all environment variables
3. Vercel auto-detects Next.js and deploys

For the database, use a hosted PostgreSQL provider:
- [Neon](https://neon.tech) — recommended (free tier)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

---

## License

MIT — free to use and modify.

---

*Made with care for students 🎓*
