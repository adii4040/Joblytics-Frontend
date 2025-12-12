import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { uploadApplication } from '../../services/applicationServices.js';

export default function useUploadApplications() {
    const qc = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: uploadApplication,
        onSuccess: (response) => {
            // Invalidate and refetch applications after a successful upload
            qc.invalidateQueries({ queryKey: ["applications"] });
            console.log("Upload success, cache invalidated", response);
            navigate("/applications");
        },
        onError: (error) => {
            console.error("Upload failed:", error);
        }
    });
}