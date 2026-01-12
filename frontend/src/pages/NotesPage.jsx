
import { useAuthStore } from "../store/authStore";
import { useUpdateNote } from "../hooks/useUpdateNote";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useCreateNote } from "../hooks/useCreateNote";
import { useNotes } from "../hooks/useNotes";
import { useDeleteNote } from "../hooks/useDeleteNote";
import EditNoteModal from "../modal/EditNoteModal";
import { formatNoteTimestamp } from "../utils/formatNoteTimestamp";


function NotesPage() {
  const navigate = useNavigate();
  const quickCaptureRef = useRef(null);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const highlightTimeoutRef = useRef(null);

  const {mutate: createNote, isPending } = useCreateNote();
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();
  const { mutate: updateNote, isPending: isUpdating } = useUpdateNote();
  const [editingId, setEditingId] = useState(null);
  
  const { data: notes = [], isLoading, isError } = useNotes();
  const [noteData, setNoteData] = useState({ title: "", content: "", tag: ""});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editNoteData, setEditNoteData] = useState({ title: "", content: "", tag: ""});

  const handleSaveNote = () => {
    createNote(noteData);
    setNoteData({ title: "", content: "", tag: ""}); 
  };

  const openEditModal = (note) => {
    setEditingId(note.id);

    setEditNoteData({
      title: note.title || "",
      content: note.content || "",
      tag: note.tag || "",
    });
    setIsEditOpen(true);
  };

// used when the 'create your first note' button is clicked' and it scrolls down to the 'quick capture' section and highlights the border for a short bit
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
              Notes
            </h1>
            <p className="text-slate-600 mt-1">
              Your notes at a glance. Add, refine, and keep things moving.
            </p>
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            {/* YOUR NOTES container */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Your notes</h2>
                <p className="text-sm text-slate-500">
                  Quickly scan, filter, and jump into any note.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                  placeholder="Search notes"
                  type="search"
                />
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none sm:w-40">
                  <option>All tags</option>
                  <option>Work</option>
                  <option>Personal</option>
                  <option>Ideas</option>
                </select>
              </div>
            </div>

            {/* LOADING STATE */}
            {isLoading && (
              <div className="mt-6 text-center text-slate-500">
                Loading your notes...
              </div>
            )}

            {/* ERROR STATE */}
            {isError && (
              <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
                Failed to load notes. Please try again.
              </div>
            )}

            {/* INDIVIDUAL NOTES */}
            {!isLoading && !isError && notes.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {notes.map((note) => (
                  <article
                    key={note.id}
                    className="group relative rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm">
                        {note.tag || "Untagged"}
                      </p>
                      <span className="text-xs text-slate-500">
                        {formatNoteTimestamp(note.updatedAt)}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">
                      {note.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {note.content}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 opacity-0 transition group-hover:opacity-100">
                      <button
                        className="rounded-full border border-slate-200 px-3 py-1 hover:bg-white cursor-pointer"
                        type="button"
                        onClick={() => openEditModal(note)}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-full border border-rose-100 px-3 py-1 text-rose-600 hover:bg-rose-50 disabled:opacity-50 cursor-pointer"
                        type="button"
                        onClick={() => deleteNote(note.id)}
                        disabled={isDeleting}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* EMPTY NOTES PLACEHOLDER */}
            {!isLoading && !isError && notes.length === 0 && (
              <div className="mt-6 flex items-center justify-between rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <span>You have no notes yet. Create your first one below.</span>
                <button
                  className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                  type="button"
                  onClick={scrollToQuickCapture}
                >
                  Create your first note
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
              Add a new note to your collection.
            </p>
            <form className="mt-4 flex flex-col gap-3">
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                placeholder="Title"
                type="text"
                value={noteData.title}
                onChange={(e) => setNoteData({...noteData, title: e.target.value})}
              />
              <textarea
                className="min-h-[140px] w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                placeholder="Write a quick note..."
                value={noteData.content}
                onChange={(e) => setNoteData({...noteData, content: e.target.value})}
              />
              <div className="flex flex-wrap items-center gap-2">
                <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                value={noteData.tag}
                onChange={(e) => setNoteData({...noteData, tag: e.target.value})}
                >
                  <option>Tag</option>
                  <option>Work</option>
                  <option>Personal</option>
                  <option>Ideas</option>
                </select>
                <button
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
                  type="button"
                  onClick={handleSaveNote}
                  disabled={isPending}
                >
                  {isPending ? "Saving..." : "Save note"}
                </button>
                <button
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  type="button"
                  onClick={() => setNoteData({ title: "", content: "", tag: ""})}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
        <EditNoteModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          noteData={editNoteData}
          onChange={setEditNoteData}
          isUpdating={isUpdating}
          onSave={() => 
            updateNote(
              { noteId: editingId, updatedData: editNoteData },
              { onSuccess: () => setIsEditOpen(false)}
            )
          }
        />
    </div>
  );
}

export default NotesPage;