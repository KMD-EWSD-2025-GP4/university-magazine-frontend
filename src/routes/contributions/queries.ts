import { ContributionType } from "@/configs/schemas";
import { createContribution } from "@/services/contribution";
import { useMutation } from "@tanstack/react-query";

export function useCreateContribution() {
  return useMutation({
    mutationFn: (data: ContributionType) => createContribution(data),
    onSuccess: (res) => {
      console.log(res.data);
    },
  });
}
