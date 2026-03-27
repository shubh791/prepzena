// src/app/(app)/settings/loading.jsx

export default function SettingsLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-3 w-20 bg-slate-200 rounded-full" />
        <div className="h-8 w-40 bg-slate-200 rounded-xl" />
      </div>
      <div className="h-40 bg-white border border-slate-100 rounded-2xl" />
      <div className="h-28 bg-white border border-slate-100 rounded-2xl" />
      <div className="h-28 bg-white border border-slate-100 rounded-2xl" />
      <div className="h-24 bg-white border border-rose-100 rounded-2xl" />
    </div>
  );
}
