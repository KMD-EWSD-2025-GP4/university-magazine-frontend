import { apiClient } from "@/configs/apiClient";
import {
  ContributionType,
  GetContributionDetailType,
  GetMyContributionsResponseType,
} from "@/configs/schemas";

export function createContribution(data: ContributionType) {
  return apiClient.post("/contribution", data);
}

export async function getContributions(pageParam: unknown) {
  console.log("pageParam", pageParam);
  const res = await apiClient.get(`/contribution/faculty/selected`);
  return res.data;
}

export async function getMCContributions() {
  const res = await apiClient.get(`/contribution/faculty/all`);
  return res.data;
}

export async function getMyContribution(pageParam: unknown) {
  console.log("pageParam", pageParam);
  const res = await apiClient.get<GetMyContributionsResponseType>(
    `/contribution/my`
  );
  return res.data;
}

export function getContribution(id: string) {
  return apiClient.get<GetContributionDetailType>(`/contribution/${id}`);
}

export function updateContribution({
  id,
  data,
}: {
  id: string;
  data: ContributionType;
}) {
  return apiClient.put(`/contribution/${id}`, data);
}

export function updateContributionStatus({
  id,
  status,
}: {
  id: string;
  status: "selected" | "rejected";
}) {
  return apiClient.put(`/contribution/${id}/status`, {
    status,
  });
}

export function commentContribution({
  id,
  comment,
}: {
  id: string;
  comment: string;
}) {
  return apiClient.post(`/contribution/${id}/comment`, {
    comment,
  });
}

export function downloadSelectedContributions() {
  return apiClient.get(`/contribution/download-selected`, {
    responseType: "blob",
  });
}
