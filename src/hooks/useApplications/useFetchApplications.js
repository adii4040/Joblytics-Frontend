import { useQuery } from "@tanstack/react-query";
import { fetchAllApplications } from "../../services/applicationServices.js";

export default function useFetchApplications() {
    return useQuery({
        queryKey: ["applications"],
        queryFn: fetchAllApplications,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}