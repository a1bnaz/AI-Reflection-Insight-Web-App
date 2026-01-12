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
        <div className="border rounded-lg p-6 max-w-md mx-auto mt-20 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="block text-sm font-medium text-gray-700">
              username
            </div>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-100"
              type="text"
              placeholder="enter username"
              required
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
            <div className="block text-sm font-medium text-gray-700">
              password
            </div>
            <input 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-100"
              type="password" 
              placeholder="enter password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200 font-semibold"
            >
              {isPending ? 'Creating...' : 'Sign Up'}
            </button>
            <button 
              type="button" 
              onClick={handleLoginButton}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200 font-semibold"
            >
              Login
            </button>
          </form>
        </div>
    );
}

export default RegisterPage;