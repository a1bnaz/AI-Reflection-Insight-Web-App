
import { useAuthStore } from "../store/authStore";
import { useUpdateEntry } from "../hooks/useUpdateEntry";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useCreateEntry } from "../hooks/useCreateEntry";
import { useEntries } from "../hooks/useEntries";
import { useDeleteEntry } from "../hooks/useDeleteEntry";
import EditEntryModal from "../modal/EditEntryModal";
import ViewEntryModal from "../modal/ViewEntryModal";
import { formatEntryTimestamp } from "../utils/formatEntryTimestamp";


function EntriesPage() {
  const navigate = useNavigate();
  const quickCaptureRef = useRef(null);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const highlightTimeoutRef = useRef(null);

  const {mutate: createEntry, isPending } = useCreateEntry();
  const { mutate: deleteEntry, isPending: isDeleting } = useDeleteEntry();
  const { mutate: updateEntry, isPending: isUpdating } = useUpdateEntry();
  const [editingId, setEditingId] = useState(null);
  
  const { data: entries = [], isLoading, isError } = useEntries();
  const [entryData, setEntryData] = useState({ title: "", content: ""});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editEntryData, setEditEntryData] = useState({ title: "", content: ""});
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewingEntry, setViewingEntry] = useState(null);

  const handleSaveEntry = () => {
    createEntry(entryData);
    setEntryData({ title: "", content: ""}); 
  };

  const openEditModal = (entry) => {
    setEditingId(entry.id);

    setEditEntryData({
      title: entry.title || "",
      content: entry.content || "",
    });
    setIsEditOpen(true);
  };

  const openViewModal = (entry) => {
    setViewingEntry(entry);
    setIsViewOpen(true);
  };

// used when the 'create your first entry' button is clicked' and it scrolls down to the 'quick capture' section and highlights the border for a short bit
  const scrollToQuickCapture = () => {
    quickCaptureRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsHighlighting(true);
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }
    highlightTimeoutRef.current = setTimeout(() => {
      setIsHighlighting(false);
    }, 1200);
  };

  useEffect(() => () => {
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 pb-16 pt-12 lg:pt-16">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-slate-600 hover:text-slate-900 mb-2 flex items-center gap-1"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Entries
            </h1>
            <p className="text-slate-600 mt-1">
              Your entries at a glance. Add, refine, and keep things moving.
            </p>
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            {/* YOUR ENTRIES container */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Your entries</h2>
                <p className="text-sm text-slate-500">
                  Quickly scan, filter, and jump into any entry.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                  placeholder="Search entries"
                  type="search"
                />
              </div>
            </div>

            {/* LOADING STATE */}
            {isLoading && (
              <div className="mt-6 text-center text-slate-500">
                Loading your entries...
              </div>
            )}

            {/* ERROR STATE */}
            {isError && (
              <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
                Failed to load entries. Please try again.
              </div>
            )}

            {/* INDIVIDUAL ENTRIES */}
            {!isLoading && !isError && entries.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {entries.map((entry) => (
                  <article
                    key={entry.id}
                    className="group relative rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs text-slate-500">
                        {formatEntryTimestamp(entry.updatedAt)}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">
                      {entry.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {entry.content}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 opacity-0 transition group-hover:opacity-100">
                      <button
                        className="rounded-full border border-slate-200 px-3 py-1 hover:bg-white cursor-pointer"
                        type="button"
                        onClick={() => openViewModal(entry)}
                      >
                        View
                      </button>
                      <button
                        className="rounded-full border border-slate-200 px-3 py-1 hover:bg-white cursor-pointer"
                        type="button"
                        onClick={() => openEditModal(entry)}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-full border border-rose-100 px-3 py-1 text-rose-600 hover:bg-rose-50 disabled:opacity-50 cursor-pointer"
                        type="button"
                        onClick={() => deleteEntry(entry.id)}
                        disabled={isDeleting}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* EMPTY ENTRIES PLACEHOLDER */}
            {!isLoading && !isError && entries.length === 0 && (
              <div className="mt-6 flex items-center justify-between rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <span>You have no entries yet. Create your first one below.</span>
                <button
                  className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                  type="button"
                  onClick={scrollToQuickCapture}
                >
                  Create your first entry
                </button>
              </div>
            )}
          </div>

          <div
            ref={quickCaptureRef}
            id="quick-capture"
            className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 ${isHighlighting ? "ring-2 ring-slate-900/30 bg-slate-50" : ""}`}
          >
            <h2 className="text-xl font-semibold">Quick capture</h2>
            <p className="text-sm text-slate-500">
              Add a new entry to your collection.
            </p>
            <form className="mt-4 flex flex-col gap-3">
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                placeholder="Title"
                type="text"
                value={entryData.title}
                onChange={(e) => setEntryData({...entryData, title: e.target.value})}
              />
              <textarea
                className="min-h-[140px] w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                placeholder="Write a quick entry..."
                value={entryData.content}
                onChange={(e) => setEntryData({...entryData, content: e.target.value})}
              />
              <div className="flex flex-wrap items-center gap-2">
                <button
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
                  type="button"
                  onClick={handleSaveEntry}
                  disabled={isPending}
                >
                  {isPending ? "Saving..." : "Save entry"}
                </button>
                <button
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  type="button"
                  onClick={() => setEntryData({ title: "", content: ""})}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
        <EditEntryModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          entryData={editEntryData}
          onChange={setEditEntryData}
          isUpdating={isUpdating}
          onSave={() => 
            updateEntry(
              { entryId: editingId, updatedData: editEntryData },
              { onSuccess: () => setIsEditOpen(false)}
            )
          }
        />
        <ViewEntryModal
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          entry={viewingEntry}
        />
    </div>
  );
}

export default EntriesPage;