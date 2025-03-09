import { Flex, Stack } from "@mantine/core";
import { LeftPanel } from "./components/LeftPanel";
import { Contribution } from "./components/Contribution";

export function ContributionsRoute() {
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
