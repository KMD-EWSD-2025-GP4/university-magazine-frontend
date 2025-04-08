import { contributionsKeys } from "@/configs/query-keys";
import {
  getContributorsAndContributions,
  getContributorsAndContributionsByYear,
  getMcUncommentedContribution,
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

export function useGetMcUncommentedContribution() {
  return useQuery({
    queryKey: contributionsKeys.report3(),
    queryFn: getMcUncommentedContribution,
    select: (data) => data?.data,
  });
}
