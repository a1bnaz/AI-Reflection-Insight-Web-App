import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useUpdateNote(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async({noteId, updatedData}) => {
            const response = await api.put(`/notes/${noteId}`, updatedData);

            console.log("note updated!!!!!!")
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
        onError: (error) => {
            console.error("Updating note failed:", error.response?.data || error.message);
        },
    });
}