
function EditNoteModal({ isOpen, onClose, noteData, onChange, onSave, isUpdating = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-100">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Edit note</p>
            <h2 className="text-xl font-semibold text-slate-900">Update your note</h2>
            <p className="text-sm text-slate-500">Adjust the title, text, or tag and save your changes.</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-50"
            onClick={onClose}
          >
            Close
          </button>
        </header>

        <form className="mt-4 flex flex-col gap-3">
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
            placeholder="Title"
            type="text"
            value={noteData.title}
            onChange={(e) => onChange({ ...noteData, title: e.target.value })}
          />
          <textarea
            className="min-h-[120px] w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
            placeholder="Update your note..."
            value={noteData.content}
            onChange={(e) => onChange({ ...noteData, content: e.target.value })}
          />
          <div className="flex flex-wrap items-center gap-2">
            <select
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
              value={noteData.tag}
              onChange={(e) => onChange({ ...noteData, tag: e.target.value })}
            >
              <option>Tag</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Ideas</option>
            </select>
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
                onClick={onSave}
              >
                {isUpdating ? "Updating..." : "Update note"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNoteModal;
