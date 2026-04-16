import React, { useEffect, useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showWakeMessage, setShowWakeMessage] = useState(false);
  const { mutate: login, isPending, isError } = useLogin();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    login(formData); // trigger the mutation
  }

  function handleRegisterButton() {
    navigate("/register");
  }

  useEffect(() => {
    let wakeTimer;

    if (isPending) {
      wakeTimer = setTimeout(() => {
        setShowWakeMessage(true);
      }, 2500);
    } else {
      setShowWakeMessage(false);
    }

    return () => {
      if (wakeTimer) clearTimeout(wakeTimer);
    };
  }, [isPending]);

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <div
              className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"
              aria-hidden="true"
            />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Logging you in...</h3>
            <p className="mt-2 text-sm text-slate-600">
              loading this $15m app...
            </p>
            {showWakeMessage && (
              <p className="mt-2 text-sm text-slate-500">
                if it's taking a long time to login, the first request can take 45s+ seconds while the server wakes up (i'm using Render's free version so it has a cold start pls don't leave).
              </p>
            )}
          </div>
        </div>
      )}

      <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-16">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl" />

        <div className="relative mx-auto w-full max-w-md rounded-2xl border border-white/15 bg-white/90 p-7 shadow-2xl backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">AI Reflection</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Welcome back</h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm shadow-sm focus:border-slate-400 focus:outline-none"
                placeholder="enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm shadow-sm focus:border-slate-400 focus:outline-none"
                placeholder="enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Log In"}
            </button>

            <button
              type="button"
              onClick={handleRegisterButton}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition duration-200 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-950 hover:shadow-md"
              disabled={isPending}
            >
              Create an account
            </button>

            {isError && (
              <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">Login failed. Try again.</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;