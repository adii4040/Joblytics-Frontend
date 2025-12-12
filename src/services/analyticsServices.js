import { getAnalyticsOverviewRoute } from "./routes";


export default async function fetchAnalyticsOverview(range) {
    const res = await fetch(getAnalyticsOverviewRoute(range), {
        credentials: "include"
    })
    if (!res.ok) {
        const errorData = await res.json()
        console.error('❌ Backend error:', errorData.message)
        throw new Error(errorData.message || "Fetch Analytics Overview Failed")
    }
    const data = await res.json()
    return data
}
