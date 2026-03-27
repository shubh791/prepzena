export default function NotesLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-pulse">
      <div className="flex gap-6">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-64 shrink-0 space-y-3">
          {[...Array(6)].map((_, i) => <div key={i} className="h-20 bg-white border border-slate-100 rounded-2xl" />)}
        </div>
        {/* Main content skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-28 bg-slate-200 rounded-2xl" />
          {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-white border border-slate-100 rounded-2xl" />)}
        </div>
      </div>
    </div>
  );
}
