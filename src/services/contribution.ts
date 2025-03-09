import { apiClient } from "@/configs/apiClient";
import {
  ContributionType,
  GetMyContributionsResponseType,
} from "@/configs/schemas";

export function createContribution(data: ContributionType) {
  return apiClient.post("/contribution", data);
}

export function getContributions() {
  return apiClient.get(`/contribution/faculty/selected`);
}

export function getMyContribution(pageParam: unknown) {
  console.log("pageParam", pageParam);
  return apiClient.get<GetMyContributionsResponseType>(`/contribution/my`);
}
