import { BarChart } from "@mantine/charts";
import { Paper, Text } from "@mantine/core";
import { useGetBrowserUsage } from "../queries";
import { userBrowsers } from "@/configs/constants";

export function BrowserUsage() {
  const { data, isPending } = useGetBrowserUsage();

  if (isPending) {
    return <>loading</>;
  }

  const browsers = isPending
    ? []
    : userBrowsers.map((b) => {
        const count = data?.find((d) => d.browser === b)?.count;
        return {
          type: b,
          count: count ? parseInt(count) : 0,
        };
      });

  return (
    <Paper shadow="md" p="md" radius="md">
      <Text size="xl" fw={700} mb="xl">
        Most used browsers
      </Text>

      <BarChart
        h={500}
        w={{
          base: "80%",
          md: 600,
        }}
        mx="auto"
        data={browsers || []}
        dataKey="type"
        series={[{ name: "count", color: "primary" }]}
        tickLine="y"
        yAxisLabel="Number of Users"
        xAxisLabel="Browsers"
      />
    </Paper>
  );
}
