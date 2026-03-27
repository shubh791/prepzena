export default function HomeLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-slate-200 rounded-full" />
          <div className="h-8 w-52 bg-slate-200 rounded-xl" />
        </div>
        <div className="h-10 w-40 bg-slate-200 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-white border border-slate-100 rounded-2xl" />)}
      </div>
      <div className="h-24 bg-white border border-slate-100 rounded-2xl" />
      <div className="h-36 bg-slate-200 rounded-2xl" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => <div key={i} className="h-40 bg-white border border-slate-100 rounded-2xl" />)}
      </div>
    </div>
  );
}
