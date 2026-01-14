import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useAnalyzeEntry(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (entryId) => {
            console.log("Analyzing entry:", entryId);
            const response = await api.put(`/entries/${entryId}/analyze`);
            
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey : ["entries"] });
        },
        onError: (error) => {
            console.error(error);
        }
    })
}