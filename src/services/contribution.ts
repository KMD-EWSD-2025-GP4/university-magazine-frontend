import { apiClient } from "@/configs/apiClient";
import {
  ContributionType,
  GetContributionDetailType,
  GetMyContributionsResponseType,
} from "@/configs/schemas";

export function createContribution(data: ContributionType) {
  return apiClient.post("/contribution", data);
}

export async function getContributions() {
  const res = await apiClient.get(`/contribution/faculty/selected`);
  return res.data;
}

export async function getMCContributions() {
  const res = await apiClient.get(`/contribution/faculty/all`);
  return res.data;
}

export async function getMMContributions(academicYearId: string) {
  console.log("academicYearId", academicYearId);
  const res = await apiClient.get(
    academicYearId
      ? `/contribution/all?academicYearId=${academicYearId}`
      : "/contribution/all"
  );
  return res.data;
}

export async function getMyContribution() {
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

export async function downloadSelectedContributions(academicYearId?: string) {
  const res = await apiClient.get(
    academicYearId
      ? `/contribution/download-selected?academicYearId=${academicYearId}`
      : "/contribution/download-selected",
    {
      responseType: "blob",
    }
  );
  const url = window.URL.createObjectURL(res.data);
  const link = document.createElement("a");
  link.href = url;
  link.download = "selected-contributions.zip";
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
  return res.data;
}

export async function downloadFileFromUrl(fileUrl: string, filename: string) {
  fetch(fileUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(console.error);
}

export function viewContribution(id: string) {
  return apiClient.post(`/contribution/${id}/view`);
}
