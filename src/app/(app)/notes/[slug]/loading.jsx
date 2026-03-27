export default function NoteLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-pulse">
      <div className="h-10 w-32 bg-slate-200 rounded-xl" />
      <div className="h-40 bg-slate-200 rounded-2xl" />
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`h-4 bg-slate-100 rounded-full ${i % 3 === 2 ? "w-2/3" : "w-full"}`} />
        ))}
      </div>
      <div className="h-12 bg-white border border-slate-100 rounded-2xl" />
    </div>
  );
}
