import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';

export function useRegister(){
    const navigate = useNavigate();
    const loginAction = useAuthStore((state) => state.login) // get the login action

    return useMutation({
        mutationFn: async (credentials) => {
            // credentials = {username, password}
            const response = await api.post("/register", credentials);
            return response.data // expecting {user, token}
        },
        onSuccess: (data) => {
            // 1. automatically log them in by saving the data to Zustand
            loginAction(data.user, data.token);

            // 2. redirect straight to the dashboard
            navigate("/dashboard");
        },
        onError: (error) => {
            alert(error.response?.data?.message || "registration failed");
        }
    })
}