import React, { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

function RegisterPage(){
    const [formData, setFormData] = useState({username: '', password: ''});
    const { mutate: register, isPending } = useRegister();

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        register(formData);
    }

    function handleLoginButton(){
        navigate("/login");
    }

    return(
      <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-16">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-400/25 blur-3xl" />

        <div className="relative mx-auto w-full max-w-md rounded-2xl border border-white/15 bg-white/90 p-7 shadow-2xl backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">AI Reflection</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Create account</h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Username</label>
              <input
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm shadow-sm focus:border-slate-400 focus:outline-none"
                type="text"
                placeholder="enter username"
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input 
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm shadow-sm focus:border-slate-400 focus:outline-none"
                type="password" 
                placeholder="enter password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {isPending ? 'Creating...' : 'Sign Up'}
            </button>
            <button 
              type="button" 
              onClick={handleLoginButton}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition duration-200 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-950 hover:shadow-md"
              disabled={isPending}
            >
              Back to login
            </button>
          </form>
        </div>
      </div>
    );
}

export default RegisterPage;