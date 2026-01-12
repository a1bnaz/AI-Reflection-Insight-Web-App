import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await api.get("/notes");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}