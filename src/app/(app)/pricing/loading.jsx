export default function PricingLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-12 animate-pulse">
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <div className="h-6 w-48 bg-slate-200 rounded-full mx-auto" />
        <div className="h-12 w-80 bg-slate-200 rounded-2xl mx-auto" />
        <div className="h-4 w-64 bg-slate-100 rounded-full mx-auto" />
      </div>
      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="h-96 bg-white border border-slate-200 rounded-3xl" />
        <div className="h-96 bg-slate-900 rounded-3xl" />
      </div>
    </div>
  );
}
