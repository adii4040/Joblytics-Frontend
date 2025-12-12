import { useQuery } from "@tanstack/react-query";
import { fetchApplicationById } from "../../services/applicationServices";

export default function useFetchApplicationById(appId) {
    return useQuery({
        queryKey: ["application", appId],
        queryFn: () => fetchApplicationById(appId),
        enabled: !!appId, // Only run query if appId exists
        staleTime: 1 * 60 * 1000, // 1 minute
    });
}
