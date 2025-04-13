import { apiClient } from "@/configs/apiClient";

export function getContributorsAndContributions() {
  return apiClient.get(`contribution/mc/contributors_and_contributions`);
}

export function getContributorsAndContributionsByYear() {
  return apiClient.get("contribution/mc/yearly_stats");
}

export function getMcUncommentedContribution(academicYearId: string) {
  return apiClient.get(
    `contribution/mc/uncommented_contributions?academicYearId=${academicYearId}`
  );
}

export function getMMContributions() {
  return apiClient.get("contribution/mm/contribution_report");
}

export function getMMContributors() {
  return apiClient.get("contribution/mm/contributor_report");
}

export function getMCGuestReport() {
  return apiClient.get("contribution/mc/guest_report");
}

export function getMostActiveUsers(role?: string) {
  return apiClient.get("user/most-active", {
    params: role ? { role } : {},
  });
}

export function getMostViewedContributions() {
  return apiClient.get("contribution/most-viewed");
}

export function getBrowserUsage() {
  return apiClient.get("user/browser-usage");
}
