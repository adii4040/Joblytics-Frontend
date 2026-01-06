import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useSignup() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            //console.log(data.user)
            toast.success("Account created successfully! We have sent a verification email to ");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        },
        onError: (error) => {
            console.error("Registration failed:", error);
            toast.error(error.message || "Registration failed. Please try again.");
        }
    });
}
