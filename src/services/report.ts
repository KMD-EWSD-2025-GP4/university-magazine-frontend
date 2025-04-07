import { apiClient } from "@/configs/apiClient";

export function getContributorsAndContributions(id: string) {
  return apiClient.get(
    `contribution/mc/contributors_and_contributions?academicYearId=${id}`
  );
}

export function getContributorsAndContributionsByYear() {
  console.log("first");
  return apiClient.get("contribution/mc/yearly_stats");
}
