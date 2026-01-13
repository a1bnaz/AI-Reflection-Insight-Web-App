import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useUpdateEntry(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async({entryId, updatedData}) => {
            const response = await api.put(`/entries/${entryId}`, updatedData);

            console.log("entry updated!!!!!!")
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["entries"] });
        },
        onError: (error) => {
            console.error("Updating entry failed:", error.response?.data || error.message);
        },
    });
}