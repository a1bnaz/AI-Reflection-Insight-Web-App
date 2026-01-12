import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useCreateNote(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            console.log("Sending note:", payload); // Debug log
            const response = await api.post("/notes", payload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["notes"] });
        },
        onError: (error) => {
            console.error("Create note failed:", error.response?.data || error.message); // Debug log
        }
    })
}