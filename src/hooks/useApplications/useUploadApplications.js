import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { uploadApplication } from '../../services/applicationServices.js';
import { toast } from "react-toastify";

export default function useUploadApplications() {
    const qc = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: uploadApplication,
        onSuccess: (response) => {
            // Invalidate and refetch applications after a successful upload
            qc.invalidateQueries({ queryKey: ["applications"] });
            qc.invalidateQueries({ queryKey: ["analytics"] });

            //console.log("Upload success, cache invalidated", response);
            toast.success("Application added successfully!");
            navigate("/applications");
        },
        onError: (error) => {
            console.error("Upload failed:", error);
            toast.error(error.message || "Failed to add application. Please try again.");
        }
    });
}