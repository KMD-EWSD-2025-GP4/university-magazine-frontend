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

export function getMMContributions() {
  return apiClient.get("contribution/mm/contribution_report");
}

export function getMMContributors() {
  return apiClient.get("contribution/mm/contributor_report");
}
