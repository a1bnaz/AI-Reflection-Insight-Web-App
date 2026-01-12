import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

export function useNotes() {
  // return useQuery({
  //   queryKey: ["notes"],
  //   queryFn: async () => {
  //     const response = await api.get("/notes");
  //     return response.data;
  //   },
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  // });

  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ["notes", user?.id || user?.username], // scope cache per user
    queryFn: async () => {
      const response = await api.get("/notes");
      
      return response.data
    },

    enabled: !!user,
    staleTime: 0,                 // don't keep old data as fresh
    refetchOnMount: "always",     // refetch when page opens
    refetchOnWindowFocus: true,   // optional: refetch on focus
  })
}