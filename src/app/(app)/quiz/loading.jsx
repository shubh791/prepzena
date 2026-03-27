export default function QuizLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-3 w-16 bg-slate-200 rounded-full" />
        <div className="h-8 w-32 bg-slate-200 rounded-xl" />
      </div>
      <div className="h-32 bg-violet-100 rounded-2xl" />
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-white border border-slate-100 rounded-2xl" />)}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => <div key={i} className="h-32 bg-white border border-slate-100 rounded-2xl" />)}
      </div>
    </div>
  );
}
