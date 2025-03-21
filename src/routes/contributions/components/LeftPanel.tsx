import { UserAvatar } from "@/components/UserAvatar";
import { CalendarIcon3 } from "@/icons/CalendarIcon3";
import { useUserStore } from "@/store/useUser";
import { Paper, Stack, Text } from "@mantine/core";

export function LeftPanel() {
  const user = useUserStore((state) => state.user);
  return (
    <Stack pos="sticky" top="140px" h="fit-content" gap="28px">
      <Paper shadow="lg" radius="md">
        <Stack p="20px" align="center" gap="xl">
          <CalendarIcon3 />

          <Text w="27ch" ta="center">
            The contribution submission will be closed by 3/3/2025 .
          </Text>
        </Stack>
      </Paper>

      <Paper shadow="lg" radius="md">
        <Stack p="20px" align="center" gap="sm">
          <UserAvatar name={user?.username || ""} />

          <Text size="sm" w="20ch" ta="center">
            {user?.username}
          </Text>

          <Text size="xs" w="20ch" ta="center">
            {user?.email}
          </Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
