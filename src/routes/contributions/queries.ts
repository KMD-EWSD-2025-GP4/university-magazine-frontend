import { routes } from "@/configs/menus";
import { contributionsKeys } from "@/configs/query-keys";
import { ContributionType } from "@/configs/schemas";
import {
  createContribution,
  getContributions,
  getMyContribution,
} from "@/services/contribution";
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: contributionsKeys.lists(),
      });
      showNotification({
        title: "Success!",
        message: "Contribution created successfully",
      });
      navigate(routes["my-contributions"]);
    },
  });
}

export function useGetContributions() {
  return useQuery({
    queryKey: [contributionsKeys.lists()],
    queryFn: () => getContributions(),
    select: (res) => res.data,
  });
}

export function useGetMyContributions() {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getMyContribution(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      console.log({ lastPage, allPages });
      return true;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      console.log({ firstPage, allPages });
      return;
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    select: (data) => data.pages.flatMap((page) => page?.data?.items),
  });
}
