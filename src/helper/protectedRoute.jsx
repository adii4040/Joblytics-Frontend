import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useAuth/useCurrentUser";

export default function ProtectedRoute() {
    const { data, isLoading } = useCurrentUser();

    if (isLoading) return <div>Loading...</div>;

    // Check for user in nested structure
    if (!data?.data?.user) {
        return <Navigate to="/login" replace />;
    } else {
        return <Outlet />;
    }
}