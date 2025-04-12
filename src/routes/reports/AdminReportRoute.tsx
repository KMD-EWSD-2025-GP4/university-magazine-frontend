import { SimpleGrid, Stack, Text } from "@mantine/core";
import { MostActiveUsers } from "./components/MostActiveUsers";
import { MostViewPages } from "./components/MostViewPages";
import { BrowserUsage } from "./components/BrowserUsage";

export function AdminReportRoute() {
  return (
    <Stack gap="xl" p="xl">
      <Text size="26px" component="h1" fw={700}>
        Number of Reports
      </Text>

      <SimpleGrid
        cols={{
          base: 1,
          md: 2,
        }}
      >
        <MostViewPages />
        <MostActiveUsers />
      </SimpleGrid>

      <BrowserUsage />
    </Stack>
  );
}
