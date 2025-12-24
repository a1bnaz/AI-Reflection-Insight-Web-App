import React, { useState } from "react";
import { useLogin } from "../hooks/useAuth";

function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { mutate: login, isPending, isError } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    login(formData); // trigger the mutation
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          login
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-50"
            placeholder="enter username"
            required
          />

          {/* password */}
          <div className="block text-sm font-medium text-gray-700">password</div>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-50"
            placeholder="enter password"
            required
          />

          {/* submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Log In"}
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