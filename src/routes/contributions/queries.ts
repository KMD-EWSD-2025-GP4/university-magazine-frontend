import { routes } from "@/configs/menus";
import { contributionsKeys } from "@/configs/query-keys";
import { ContributionType } from "@/configs/schemas";
import { getTerms } from "@/services/common";
import {
  commentContribution,
  createContribution,
  getContribution,
  getContributions,
  getMCContributions,
  getMMContributions,
  getMyContribution,
  updateContribution,
  updateContributionStatus,
} from "@/services/contribution";
import { useUserStore } from "@/store/useUser";
import { showNotification } from "@mantine/notifications";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useCreateContribution() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ContributionType) => createContribution(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: contributionsKeys.lists(),
      });
      showNotification({
        title: "Success!",
        message: res.data?.message || "Contribution created successfully",
      });
      navigate(routes["my-contributions"]);
    },
  });
}

export function useGetContribution(id: string) {
  return useQuery({
    queryKey: contributionsKeys.list(id),
    queryFn: () => getContribution(id),
    enabled: !!id,
    select: (data) => data.data.data,
  });
}

export function useGetContributions() {
  return useInfiniteQuery({
    queryKey: contributionsKeys.lists(),
    queryFn: async ({ pageParam }) => getContributions(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
  });
}

export function useGetMyContributions() {
  return useInfiniteQuery({
    queryKey: contributionsKeys.myLists(),
    queryFn: async ({ pageParam }) => getMyContribution(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
  });
}

export function useGetMCContributions() {
  const user = useUserStore((state) => state.user);
  return useQuery({
    queryKey: contributionsKeys.mcLists(),
    queryFn: getMCContributions,
    enabled: Boolean(user?.role),
  });
}

export function useGetMMContributions(academicYear: string) {
  const user = useUserStore((state) => state.user);
  return useQuery({
    queryKey: contributionsKeys.mmLists(academicYear),
    queryFn: () => getMMContributions(academicYear),
    enabled: Boolean(user?.role),
  });
}

export function useUpdateContribution() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; data: ContributionType }) =>
      updateContribution(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: contributionsKeys.lists(),
      });
      showNotification({
        title: "Success!",
        message: res.data?.message || "Contribution updated successfully",
      });
      navigate(routes["my-contributions"]);
    },
  });
}

export function useUpdateContributionStatus() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; status: "selected" | "rejected" }) =>
      updateContributionStatus(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: contributionsKeys.lists(),
      });
      showNotification({
        title: "Success!",
        message: res.data?.message || "Contribution updated successfully",
      });
      navigate(routes["mc-contributions"]);
    },
  });
}

export function useCommentContribution(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; comment: string }) =>
      commentContribution(data),
    onSuccess: () => {
      showNotification({
        title: "Success!",
        message: "Comment added successfully",
      });
      queryClient.invalidateQueries({
        queryKey: contributionsKeys.details(id),
      });
    },
  });
}

export function useGetTerms() {
  return useMutation({
    mutationFn: getTerms,
  });
}
