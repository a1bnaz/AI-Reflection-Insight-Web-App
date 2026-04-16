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
              please keep this tab open while this app loads up ;)
            </p>
            {showWakeMessage && (
              <p className="mt-2 text-sm text-slate-500">
                the first request can take 30-45 seconds while the free server wakes up (i'm using Render's free version so it has a cold start pls don't leave).
              </p>
            )}
          </div>
        </div>
      )}

      <div className="border rounded-lg p-6 max-w-md mx-auto mt-20 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* username */}
          <div className="block text-sm font-medium text-gray-700">
            username
          </div>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-100"
            placeholder="enter username (albert)"
          />

          {/* password */}
          <div className="block text-sm font-medium text-gray-700">password</div>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-100"
            placeholder="enter password (123)"
          />

          {/* submit button -> login button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200 font-semibold"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Log In"}
          </button>

          {/* submit button -> register button */}
          <button
            type="button"
            onClick={handleRegisterButton}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200 font-semibold"
            disabled={isPending}
          >
            Register
          </button>

          {isError && (
            <p className="text-red-600 text-sm">Login failed. Try again.</p>
          )}
        </form>
      </div>
    </>
  );
}

export default LoginPage;