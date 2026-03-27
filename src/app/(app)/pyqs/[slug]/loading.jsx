// src/app/(app)/pyqs/[slug]/loading.jsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-pulse">
        {/* Back */}
        <div className="h-5 w-24 bg-slate-200 rounded-full"/>
        {/* Header card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 space-y-4">
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-slate-200 rounded-full"/>
            <div className="h-5 w-20 bg-slate-200 rounded-full"/>
          </div>
          <div className="h-8 w-2/3 bg-slate-200 rounded-xl"/>
          <div className="h-10 w-72 bg-slate-100 rounded-xl"/>
        </div>
        {/* Questions */}
        {[1,2,3,4,5].map(i => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 space-y-3">
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-slate-200 rounded-full flex-shrink-0"/>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-full"/>
                <div className="h-4 bg-slate-200 rounded w-5/6"/>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <div className="h-16 bg-slate-100 rounded-lg"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
