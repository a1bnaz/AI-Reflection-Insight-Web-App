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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Welcome back{currentUser?.username ? `, ${currentUser.username}` : ""}
            </h1>
            <p className="text-slate-600 mt-1">
              Your AI reflection & insight app.
            </p>
          </div>
          <button
            onClick={() => useAuthStore.getState().logout()}
            className="self-start sm:self-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Logout
          </button>
        </header>

        {/* Entries Section */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Entries</h2>
              <p className="text-sm text-slate-500">Access your latest entries</p>
            </div>
            <button
              onClick={() => navigate("/entries")}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              View all →
            </button>
          </div>

          <div className="space-y-2">
            {entries.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 hover:bg-slate-100 transition cursor-pointer"
                onClick={() => openViewModal(entry)}
              >
                <span className="font-medium text-slate-900">{entry.title}</span>
                <span className="text-xs text-slate-500">
                  {formatEntryTimestamp(entry.updatedAt)}
                </span>
              </div>
            ))}
          </div>

          <button
            className="mt-4 w-full rounded-lg border-2 border-dashed border-slate-200 py-2 text-sm font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition"
            type="button"
            onClick={() => setIsAddEntryModalOpen(true)}
          >
            + Add new entry
          </button>
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