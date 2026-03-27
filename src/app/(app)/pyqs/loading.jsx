// src/app/(app)/pyqs/loading.jsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-14 animate-pulse">
        {/* Hero */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="h-6 w-48 bg-slate-200 rounded-full mx-auto"/>
          <div className="h-10 w-72 bg-slate-200 rounded-xl mx-auto"/>
          <div className="h-4 w-96 bg-slate-100 rounded-full mx-auto"/>
        </div>
        {/* Uni sections */}
        {[6, 4, 4, 3].map((count, s) => (
          <div key={s} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-slate-300"/>
              <div className="h-5 w-32 bg-slate-200 rounded-lg"/>
              <div className="h-5 w-16 bg-slate-100 rounded-full"/>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(count).fill(0).map((_, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between">
                    <div className="h-5 w-16 bg-slate-200 rounded-full"/>
                    <div className="h-5 w-14 bg-slate-100 rounded-full"/>
                  </div>
                  <div className="h-4 bg-slate-200 rounded w-full"/>
                  <div className="h-4 bg-slate-200 rounded w-4/5"/>
                  <div className="flex gap-3">
                    <div className="h-4 w-14 bg-slate-100 rounded"/>
                    <div className="h-4 w-20 bg-slate-100 rounded"/>
                  </div>
                  <div className="h-9 bg-slate-100 rounded-xl"/>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
