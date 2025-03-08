import { apiClient } from "@/configs/apiClient";
import { ContributionType } from "@/configs/schemas";

export function createContribution(data: ContributionType) {
  return apiClient.post("/contribution", data);
}
