import { Flex, Stack } from "@mantine/core";
import { LeftPanel } from "./components/LeftPanel";
import { useGetContributions } from "./queries";
import { PageLoading } from "@/components/loading/PageLoading";
import { Contribution } from "./components/Contribution";
import { NoContribution } from "@/components/NoContribution";
import { useUserStore } from "@/store/useUser";

export function ContributionsRoute() {
  const user = useUserStore((state) => state.user);
  const { data, isPending } = useGetContributions();

  if (isPending) {
    return <PageLoading />;
  }

  const contributions = data?.pages.flatMap((page) => page?.items) || [];

  return (
    <div>
      <Flex gap="80px" py="20px">
        <LeftPanel />

        <Stack flex={1} gap="100px">
          {contributions.map((contribution) => (
            <Contribution
              authored={user?.userId === contribution.studentId}
              key={contribution.id}
              contribution={contribution}
            />
          ))}

          {contributions?.length === 0 && <NoContribution />}
        </Stack>
      </Flex>
    </div>
  );
}
