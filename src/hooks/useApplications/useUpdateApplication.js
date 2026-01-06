import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplication } from "../../services/applicationServices";
import { toast } from "react-toastify";

export default function useUpdateApplication() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ appId, data }) => updateApplication(appId, data),
        onSuccess: (response, { appId }) => {
            // Update the cache with the updated application data
            qc.setQueryData(["applications"], (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: {
                        applications: oldData.data.applications.map((app) =>
                            app._id === appId ? response.data.application : app
                        ),
                    },
                };
            });

            qc.setQueryData(["application", appId], (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: {
                        application: response.data.application
                    }
                };
            });

            qc.invalidateQueries({ queryKey: ["analytics"] });

            //console.log("Application updated successfully, cache updated", response, appId);
            toast.success("Application updated successfully!");
        },
        onError: (error) => {
            console.error("Failed to update application:", error.message);
            toast.error(error.message || "Failed to update application. Please try again.");
        }
    });
}
