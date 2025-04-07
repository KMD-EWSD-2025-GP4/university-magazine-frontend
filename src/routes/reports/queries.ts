import { contributionsKeys } from "@/configs/query-keys";
import {
  getContributorsAndContributions,
  getContributorsAndContributionsByYear,
} from "@/services/report";
import { useQuery } from "@tanstack/react-query";

export function useGetContributorsAndContributions(id: string) {
  return useQuery({
    queryKey: contributionsKeys.report(),
    queryFn: () => getContributorsAndContributions(id),
  });
}

export function useGetContributorsAndContributionsByYear() {
  return useQuery({
    queryKey: contributionsKeys.report(),
    queryFn: getContributorsAndContributionsByYear,
    select: (data) => data?.data?.data || [],
  });
}
