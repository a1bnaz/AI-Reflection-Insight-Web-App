import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noteId) => {
      const response = await api.delete(`/notes/${noteId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Delete note failed:", error.response?.data || error.message);
    },
  });
}
