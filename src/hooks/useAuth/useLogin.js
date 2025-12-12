import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const qc = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {
            // Set the FULL response to match fetchCurrentUser structure
            qc.setQueryData(["currentUser"], response);
            console.log("Login success, cache set:", response);
            navigate("/dashboard");
        },
        onError: (error) => {
            console.error("Login failed:", error);
        }
    });
}