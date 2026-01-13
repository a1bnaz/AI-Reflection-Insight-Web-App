import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useDeleteEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entryId) => {
      const response = await api.delete(`/entries/${entryId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
    onError: (error) => {
      console.error("Delete entry failed:", error.response?.data || error.message);
    },
  });
}
