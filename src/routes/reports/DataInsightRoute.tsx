import { Box, Container, Flex, Paper, Stack, Text } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import {
  useGetContributorsAndContributions,
  useGetContributorsAndContributionsByYear,
} from "./queries";
import { PageLoading } from "@/components/loading/PageLoading";

export function DataInsightRoute() {
  const { data, isLoading } = useGetContributorsAndContributionsByYear();

  const { data: data2, isLoading: isLoading2 } =
    useGetContributorsAndContributions();

  if (isLoading || isLoading2) {
    return <PageLoading />;
  }

  return (
    <Container size="lg" py="20px">
      <Text fw="bold" size="24px" mb={"40px"}>
        Contribution Report
      </Text>
      <Stack gap="80px">
        <Flex
          direction={{
            base: "column",
            md: "row",
          }}
          justify={{
            base: "start",
            md: "center",
          }}
          gap={"80px"}
        >
          <ContentCard
            total={data2?.totalContributions || 0}
            type="Contributions"
            faculty={data2?.facultyName || ""}
          />
          <ContentCard
            total={data2?.uniqueContributors}
            type="Contributors"
            faculty={data2?.facultyName || ""}
          />
        </Flex>

        <Box mx="auto">
          <Text fw="bold" mb="32px" ta="center">
            Contributions and Contributors in each Academic Year
          </Text>

          <BarChart
            h={500}
            data={data}
            withLegend
            w="600px"
            dataKey="academicYear"
            yAxisLabel="Number of Contributors and Contributions"
            xAxisLabel="Academic Year"
            yAxisProps={{
              textAnchor: "middle !important",
            }}
            series={[
              { name: "contributors", color: "#3A92C4" },
              { name: "contributions", color: "primary.6" },
            ]}
            tickLine="y"
          />
        </Box>
      </Stack>
    </Container>
  );
}

function ContentCard({
  total,
  type,
  faculty,
}: {
  total: number;
  type: string;
  faculty: string;
}) {
  return (
    <Paper shadow="lg" radius="md" p="40px" ta="center">
      <Text fw="bold" size="54px" mb={20}>
        {total}
      </Text>
      <Text w="25ch" mx="auto">
        Total Number of {type} in&nbsp;
        <Text component="span" fw="bold">
          {faculty}
        </Text>
      </Text>
    </Paper>
  );
}
