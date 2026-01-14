function ViewEntryModal({ isOpen, onClose, entry }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div className="relative w-full h-full max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl ring-1 ring-slate-100">
        <header className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">View entry</p>
            <h2 className="text-xl font-semibold text-slate-900">Entry Details & Insights</h2>
            <p className="text-sm text-slate-500">Review your entry and AI-generated insights.</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-50"
            onClick={onClose}
          >
            Close
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[60vh]">
          {/* Left Panel - Original Entry */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Original Entry</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1 block">
                  Title
                </label>
                <p className="text-slate-900 font-medium">
                  {entry?.title || "Untitled"}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1 block">
                  Content
                </label>
                <p className="text-slate-700 whitespace-pre-wrap break-words">
                  {entry?.content || "No content"}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1 block">
                  Last Updated
                </label>
                <p className="text-slate-600 text-sm">
                  {entry?.updatedAt ? new Date(entry.updatedAt).toLocaleString() : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Summary & Insights */}
          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Summary & Insights</h3>
            
            <div className="space-y-4 flex-1">
              {/* AI Summary */}
              <div className="rounded-lg bg-white/80 p-4 border border-slate-200 min-h-[100px]">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2 block">
                  AI Summary
                </label>
                <p className="text-slate-700 text-sm">
                  {entry?.aiSummary ? entry.aiSummary : "No summary yet. Analyze this entry to generate one."}
                </p>
              </div>

              {/* AI Insights */}
              <div className="rounded-lg bg-white/80 p-4 border border-slate-200 min-h-[100px]">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2 block">
                  Key Insights
                </label>
                <p className="text-slate-700 text-sm">
                  {entry?.aiInsights ? entry.aiInsights : "No insights yet. Analyze this entry to generate one."}
                </p>
              </div>

              {/* AI Tone */}
              <div className="rounded-lg bg-white/80 p-4 border border-slate-200 min-h-[80px]">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2 block">
                  Emotional Tone
                </label>
                <p className="text-slate-700 text-sm font-medium">
                  {entry?.aiTone ? entry.aiTone : "No tone analysis yet."}
                </p>
              </div>

              {/* AI Themes */}
              <div className="rounded-lg bg-white/80 p-4 border border-slate-200 min-h-[80px]">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2 block">
                  Themes
                </label>
                {entry?.aiThemes && entry.aiThemes.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {entry.aiThemes.map((theme, index) => (
                      <span
                        key={index}
                        className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 text-sm italic">No themes identified yet.</p>
                )}
              </div>

              {/* AI Generated At */}
              {entry?.aiGeneratedAt && (
                <div className="text-xs text-slate-500">
                  Analysis generated: {new Date(entry.aiGeneratedAt).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEntryModal;