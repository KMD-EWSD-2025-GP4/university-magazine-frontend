import { Flex, Stack } from "@mantine/core";
import { LeftPanel } from "./components/LeftPanel";
import { Contribution } from "./components/Contribution";
import { useGetContributions } from "./queries";
import { PageLoading } from "@/components/loading/PageLoading";
import { useUserStore } from "@/store/useUser";

export function ContributionsRoute() {
  const user = useUserStore((state) => state.user);
  const { data, isPending } = useGetContributions();

  console.log("user", user);
  if (isPending) {
    return <PageLoading />;
  }

  console.log("data", data);

  return (
    <div>
      <Flex gap="80px" py="20px">
        <LeftPanel />

        <Stack flex={1} gap="100px">
          <Contribution />
        </Stack>
      </Flex>
    </div>
  );
}
