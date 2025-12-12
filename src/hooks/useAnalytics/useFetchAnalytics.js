import { useQuery } from '@tanstack/react-query'
import fetchAnalyticsOverview from '../../services/analyticsServices'

export default function useFetchAnalytics(range) {
    return useQuery({
        queryKey: ['analytics', range],
        queryFn: () => fetchAnalyticsOverview(range),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    })
}
