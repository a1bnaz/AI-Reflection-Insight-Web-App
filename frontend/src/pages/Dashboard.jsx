import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useEntries } from "../hooks/useEntries";
import { formatEntryTimestamp } from "../utils/formatEntryTimestamp";
import { CreateEntryModal } from "../modal/CreateEntryModal";
import ViewEntryModal from "../modal/ViewEntryModal";


function Dashboard() {
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewingEntry, setViewingEntry] = useState(null);
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const { data: entries = [], isLoading, isError } = useEntries();

  const openViewModal = (entry) => {
    setViewingEntry(entry);
    setIsViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Welcome back{currentUser?.username ? `, ${currentUser.username}` : ""}
            </h1>
            <p className="text-slate-600 mt-1">
              Your AI reflection & insight app.
            </p>
          </div>
          <button
            onClick={() => useAuthStore.getState().logout()}
            className="self-start sm:self-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md"
          >
            Logout
          </button>
        </header>

        {/* Entries Section */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Entries</h2>
              <p className="text-sm text-slate-500">Access your latest entries</p>
            </div>
            <button
              onClick={() => navigate("/entries")}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm cursor-pointer"
            >
              View all →
            </button>
          </div>

          <div className="space-y-2">
            {isLoading && (
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
                Loading your entries...
              </div>
            )}

            {isError && (
              <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
                Failed to load entries. Please try again.
              </div>
            )}

            {entries.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 transition hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm cursor-pointer"
                onClick={() => openViewModal(entry)}
              >
                <span className="font-medium text-slate-900">{entry.title}</span>
                <span className="text-xs text-slate-500">
                  {formatEntryTimestamp(entry.updatedAt)}
                </span>
              </div>
            ))}
          </div>

          {/* ADD NEW ENTRY BUTTON COMMENTED OUT CAUSE I DON'T WANT IT ON THE DASHBOARD ANYMORE (4/16/26) */}
          {/* <button
            className="mt-4 w-full rounded-lg border-2 border-dashed border-slate-200 py-2 text-sm font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition"
            type="button"
            onClick={() => setIsAddEntryModalOpen(true)}
          >
            + Add new entry
          </button> */}
        </section>

      </div>

      <CreateEntryModal
        isOpen={isAddEntryModalOpen}
        onClose={() => setIsAddEntryModalOpen(false)}
      />
      <ViewEntryModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        entry={viewingEntry}
      />
    </div>
  );
}

export default Dashboard;