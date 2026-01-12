import React, { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { mutate: login, isPending, isError } = useLogin();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    login(formData); // trigger the mutation
  }

  function handleRegisterButton() {
    navigate("/register");
  }

  return (
    <>
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
            placeholder="enter username"
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
            placeholder="enter password"
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