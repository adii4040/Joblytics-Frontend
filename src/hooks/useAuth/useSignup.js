import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

export default function useSignup() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log(data.user)
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        },
        onError: (error) => {
            console.error("Registration failed:", error);
        }
    });
}
