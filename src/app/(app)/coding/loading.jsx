export default function CodingLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-3 w-20 bg-slate-200 rounded-full" />
        <div className="h-8 w-44 bg-slate-200 rounded-xl" />
      </div>
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => <div key={i} className="h-9 w-28 bg-slate-200 rounded-xl" />)}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => <div key={i} className="h-16 bg-white border border-slate-100 rounded-2xl" />)}
        </div>
        <div className="h-[500px] bg-slate-900 rounded-2xl" />
      </div>
    </div>
  );
}
