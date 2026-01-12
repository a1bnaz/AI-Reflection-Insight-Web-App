import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import { formatNoteTimestamp } from "../utils/formatNoteTimestamp";
import { CreateNoteModal } from "../modal/CreateNoteModal";


function Dashboard() {
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();

    const { data: notes = [], isLoading, isError } = useNotes();

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
              Your all-in-one dashboard to track habits, goals, notes, and more.
            </p>
          </div>
          <button
            onClick={() => useAuthStore.getState().logout()}
            className="self-start sm:self-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Logout
          </button>
        </header>

        {/* Dashboard Grid - Future sections will be added here */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Notes Section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Notes</h2>
                <p className="text-sm text-slate-500">Quick access to recent notes</p>
              </div>
              <button
                onClick={() => navigate("/notes")}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                View all →
              </button>
            </div>

            <div className="space-y-2">
              {notes.slice(0, 3).map((note) => (
                <div
                  key={note.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 hover:bg-slate-100 transition cursor-pointer"
                >
                  <span className="font-medium text-slate-900">{note.title}</span>
                  <span className="text-xs text-slate-500">
                    {formatNoteTimestamp(note.updatedAt)}
                  </span>
                </div>
              ))}
            </div>

            <button
              className="mt-4 w-full rounded-lg border-2 border-dashed border-slate-200 py-2 text-sm font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition"
              type="button"
              onClick={() => setIsAddNoteModalOpen(true)}
            >
              + Add new note
            </button>
          </section>

          {/* Placeholder for Habit Tracker */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Habit Tracker</h2>
                <p className="text-sm text-slate-500">Build consistent routines</p>
              </div>
              <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer">
                View all →
              </button>
            </div>
            <div className="flex items-center justify-center h-32 rounded-lg border-2 border-dashed border-slate-200 text-slate-400">
              Coming soon
            </div>
          </section>

          {/* Placeholder for Goals */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Goals</h2>
                <p className="text-sm text-slate-500">Track your progress</p>
              </div>
              <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer">
                View all →
              </button>
            </div>
            <div className="flex items-center justify-center h-32 rounded-lg border-2 border-dashed border-slate-200 text-slate-400">
              Coming soon
            </div>
          </section>

          {/* Placeholder for Ideas */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Ideas</h2>
                <p className="text-sm text-slate-500">Capture inspiration</p>
              </div>
              <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer">
                View all →
              </button>
            </div>
            <div className="flex items-center justify-center h-32 rounded-lg border-2 border-dashed border-slate-200 text-slate-400">
              Coming soon
            </div>
          </section>
        </div>

        {/* Daily Reflection Section (Full width at bottom) */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Daily Reflection</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What did you do today?
              </label>
              <textarea
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                rows="3"
                placeholder="Reflect on your day..."
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="block text-sm font-medium text-slate-700">
                Rate your day:
              </label>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                  <button
                    key={rating}
                    className="w-10 h-10 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                    type="button"
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
              type="button"
            >
              Save reflection
            </button>
          </div>
        </section>
      </div>

      <CreateNoteModal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
      />
    </div>
  );
}

export default Dashboard;