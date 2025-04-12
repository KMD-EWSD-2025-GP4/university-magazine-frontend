import { contributionsKeys, usersKeys } from "@/configs/query-keys";
import {
  getBrowserUsage,
  getContributorsAndContributions,
  getContributorsAndContributionsByYear,
  getMCGuestReport,
  getMcUncommentedContribution,
  getMMContributions,
  getMMContributors,
  getMostActiveUsers,
  getMostViewedContributions,
} from "@/services/report";
import { useQuery } from "@tanstack/react-query";

export function useGetContributorsAndContributions() {
  return useQuery({
    queryKey: contributionsKeys.report2(),
    queryFn: getContributorsAndContributions,
    select: (data) => data?.data,
  });
}

export function useGetContributorsAndContributionsByYear() {
  return useQuery({
    queryKey: contributionsKeys.report(),
    queryFn: getContributorsAndContributionsByYear,
    select: (data) => data?.data?.data || [],
  });
}

export function useGetMcUncommentedContribution(academicYearId: string) {
  return useQuery({
    queryKey: contributionsKeys.report3(academicYearId),
    queryFn: () => getMcUncommentedContribution(academicYearId),
    select: (data) => data?.data,
    enabled: !!academicYearId,
  });
}

export function useGetMMContributions() {
  return useQuery({
    queryKey: contributionsKeys.report4(),
    queryFn: getMMContributions,
    select: (data) => data?.data,
  });
}

export function useGetMMContributors() {
  return useQuery({
    queryKey: contributionsKeys.report5(),
    queryFn: getMMContributors,
    select: (data) => data?.data,
  });
}

export function useGetMCGuestReport() {
  return useQuery({
    queryKey: contributionsKeys.report6(),
    queryFn: getMCGuestReport,
    select: (data) => data?.data,
  });
}

export function useGetMostActiveUsers() {
  return useQuery({
    queryKey: usersKeys.mostActive(),
    queryFn: getMostActiveUsers,
    select: (data) => data.data,
  });
}

export function useGetMostViewedContributions() {
  return useQuery({
    queryKey: contributionsKeys.lists(),
    queryFn: getMostViewedContributions,
    select: (data) => data.data?.items,
  });
}

export function useGetBrowserUsage() {
  return useQuery({
    queryKey: usersKeys.lists(),
    queryFn: getBrowserUsage,
    select: (data) =>
      data.data as {
        browser: string;
        count: string;
      }[],
  });
}
// export function getMostActiveUsers() {
//   return apiClient.get("admin/user/most-active");
// }

// export function getMostViewedContributions() {
//   return apiClient.get("contribution//most-viewed");
// }

// export function getBrowserUsage() {
//   return apiClient.get("user/browser-usage");
// }
