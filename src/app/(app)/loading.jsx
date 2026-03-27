// ─────────────────────────────────────────────────────────────
//  src/app/(app)/loading.jsx
//  Shown automatically by Next.js during page transitions
// ─────────────────────────────────────────────────────────────

export default function AppLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-pulse">

      {/* Page title */}
      <div className="space-y-2">
        <div className="h-3 w-24 bg-slate-200 rounded-full" />
        <div className="h-8 w-56 bg-slate-200 rounded-xl" />
        <div className="h-4 w-40 bg-slate-100 rounded-lg" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-white border border-slate-100 rounded-2xl" />
        ))}
      </div>

      {/* Banner */}
      <div className="h-36 bg-slate-200 rounded-2xl" />

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-44 bg-white border border-slate-100 rounded-2xl" />
        ))}
      </div>

    </div>
  );
}