import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const qc = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            qc.setQueryData(["currentUser"], null);
            navigate("/");
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        }
    });
}