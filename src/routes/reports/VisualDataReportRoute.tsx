import { Box, Container, Flex, Paper, Stack, Text } from "@mantine/core";

export function VisualDataReportRoute() {
  return (
    <Container size="lg" py="20px">
      <Text fw="semibold" size="24px" mb={"40px"}>
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
          <ContentCard total={24} />
          <ContentCard total={12} after />
        </Flex>

        <Box mx="auto">
          <Text fw="bold" mb="32px" ta="center">
            Contributions and Contributors in each Academic Year
          </Text>
        </Box>
      </Stack>
    </Container>
  );
}

function ContentCard({ total, after }: { total: number; after?: boolean }) {
  return (
    <Paper shadow="lg" radius="md" p="40px" ta="center">
      <Text fw="bold" size="54px" mb={20}>
        {total}
      </Text>
      <Text w="25ch" mx="auto">
        Number of Contributions without a comment &nbsp;
        {after && "after 14 days"}
      </Text>
    </Paper>
  );
}
