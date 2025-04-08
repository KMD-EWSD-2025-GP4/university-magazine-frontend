import { apiClient } from "@/configs/apiClient";

export function getContributorsAndContributions() {
  return apiClient.get(`contribution/mc/contributors_and_contributions`);
}

export function getContributorsAndContributionsByYear() {
  return apiClient.get("contribution/mc/yearly_stats");
}

export function getMcUncommentedContribution() {
  return apiClient.get("contribution/mc/uncommented_contributions");
}
