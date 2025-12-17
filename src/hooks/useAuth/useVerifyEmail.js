import { useMutation } from "@tanstack/react-query";
import { verifyEmailUser } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useVerifyEmail() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: verifyEmailUser,
        onSuccess: () => {
            toast.success("Email verified successfully!");
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        },
        onError: (error) => {
            console.error("Email verification failed:", error);
            toast.error(error.message || "Email verification failed. Please try again.");
        }
    });
}
