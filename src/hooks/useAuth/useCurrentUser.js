import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../../services/authServices.js";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: fetchCurrentUser,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}