import { contributionsKeys } from "@/configs/query-keys";
import {
  getContributorsAndContributions,
  getContributorsAndContributionsByYear,
  getMcUncommentedContribution,
  getMMContributions,
  getMMContributors,
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
    queryKey: contributionsKeys.report4(),
    queryFn: getMMContributors,
    select: (data) => data?.data,
  });
}
