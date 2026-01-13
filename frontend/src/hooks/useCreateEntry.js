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
            console.error("Create entry failed:", error.response?.data || error.message); // Debug log
        }
    })
}