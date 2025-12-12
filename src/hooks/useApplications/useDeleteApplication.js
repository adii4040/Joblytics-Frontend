import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplication } from "../../services/applicationServices";

export default function useDeleteApplication() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (appId) => deleteApplication(appId),
        onSuccess: (response, appId) => {
            // Update the cache by filtering out the deleted application
            qc.setQueryData(["applications"], (oldData) => {
                if (!oldData) return oldData;
                console.log(appId)
                return {
                    ...oldData,
                    data: {
                        applications: oldData.data.applications.filter(
                            (app) => app._id !== appId
                        ),
                    },
                };
            });
            console.log("Application deleted successfully, cache updated");
        },
        onError: (error) => {
            console.error("Failed to delete application:", error.message);
        }
    });
}