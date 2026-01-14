
function EditEntryModal({ isOpen, onClose, entryData, onChange, onAnalyze, isUpdating = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-100">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Edit entry</p>
            <h2 className="text-xl font-semibold text-slate-900">Update your entry</h2>
            <p className="text-sm text-slate-500">Adjust the title or text and analyze your changes.</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-50"
            onClick={onClose}
          >
            Close
          </button>
        </header>

        <form className="mt-4 flex flex-col gap-4">
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
            placeholder="Title"
            type="text"
            value={entryData.title}
            onChange={(e) => onChange({ ...entryData, title: e.target.value })}
          />
          <textarea
            className="min-h-[120px] w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
            placeholder="Update your entry..."
            value={entryData.content}
            onChange={(e) => onChange({ ...entryData, content: e.target.value })}
          />
          <div className="flex flex-wrap items-center gap-2">
            <div className="ml-auto flex gap-2">
              <button
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
                type="button"
                disabled={isUpdating}
                onClick={onAnalyze}
              >
                {isUpdating ? "Reanalyzing..." : "Reanalyze entry"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEntryModal;
