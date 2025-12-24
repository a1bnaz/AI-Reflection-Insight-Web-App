import React, { useState } from "react";
import { useRegister } from "../hooks/useRegister";

function RegisterPage(){
    const [formData, setFormData] = useState({username: '', password: ''});
    const { mutate: register, isPending } = useRegister();

    function handleSubmit(e) {
        e.preventDefault();
        register(formData);
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen font-sans">
            <div className="p-8 border rounded shadow-md w-80">
                <h2 className="text-xl font-semibold mb-6 text-center">
                    create account
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        className="border p-2 rounded focus:outline-blue-500"
                        type="text"
                        placeholder="username"
                        required
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                    <input 
                        className="border p-2 rounded focus:outline-blue-500"
                        type="password" 
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="bg-black text-white p-2 rounded hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
                    >
                        {isPending ? 'Creating...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;