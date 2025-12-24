import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';

export function useLogin(){
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login); // our zustand action

    return useMutation({
        mutationFn: async (credentials) => {
            // credentials = {usename: '...', password: '...'}
            const response = await api.post("/login", credentials);
            return response.data // this should contain {user, token}
        },
        onSuccess: (data) => {
            // 1. save to Zustand (which also saves to LocalStorage via persist)
            login(data.user, data.token);

            // 2. send the user to the dashboard
            navigate("/dashboard");
        },
        onError: (error) => {
            console.error("login failed:", error.response?.data || error.message);
        }
    })
}