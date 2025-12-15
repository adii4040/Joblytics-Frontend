import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useLogout() {
    const qc = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: async () => {
            await qc.cancelQueries();
            qc.clear();
            qc.setQueryData(["currentUser"], null);
            qc.invalidateQueries({ queryKey: ["analytics"] });
            console.log("Logout success, all cache cleared");
            toast.success("Logged out successfully!");
            navigate("/");
        },
        onError: (error) => {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again.");
        }
    });
}