import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useCreateEntry(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            console.log("Sending entry:", payload); // Debug log
            const response = await api.post("/entries", payload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["entries"] });
        },
        onError: (error) => {
            alert(error.response?.data?.message || "failed to create entry. please fill in all required fields.");
        }
    })
}