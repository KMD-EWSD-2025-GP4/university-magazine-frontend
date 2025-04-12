/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart } from "@mantine/charts";
import { useGetMMContributors } from "./queries";
import { PageLoading } from "@/components/loading/PageLoading";
import { Box, Button, Container, Flex, Text } from "@mantine/core";
import { ReportIcon } from "@/icons";
import { routes } from "@/configs/menus";
import { Link } from "react-router";
import { BaseSelect } from "@/components/select/BaseSelect";
import { useEffect, useMemo, useState } from "react";

export function MMContributorReports() {
  const { data, isLoading } = useGetMMContributors();
  const academicYearsData = useMemo(() => {
    return (
      data?.academicYears?.map((ay: any) => ({
        label: ay.year,
        value: ay.id,
      })) || []
    );
  }, [data]);

  const [selectedAcademicYearId, setSelectedAcademicYear] = useState("");

  useEffect(() => {
    setSelectedAcademicYear(academicYearsData?.[0]?.value);
  }, [academicYearsData]);

  const faculties = useMemo(() => {
    const selectedAcademicYear = data?.academicYears?.find(
      (ay: any) => ay.id === selectedAcademicYearId
    );

    return (
      selectedAcademicYear?.faculties?.map((f: any, i: number) => ({
        name: f.name,
        value: f.uniqueContributorsCount,
        color: `primary.${i + 1}`,
      })) || []
    );
  }, [data?.academicYears, selectedAcademicYearId]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Container size="lg" py="20px">
      <Flex align="center" mb={"80px"} gap="sm">
        <Text fw="bold" size="24px">
          Contributors Report
        </Text>

        <BaseSelect
          ml="auto"
          data={academicYearsData}
          value={selectedAcademicYearId}
          onChange={(value) => setSelectedAcademicYear(value || "")}
        />

        <Button
          leftSection={<ReportIcon stroke="white" />}
          color="primary"
          component={Link}
          to={routes["mm-contribution-reports"]}
        >
          Contributions Reports
        </Button>
      </Flex>

      <Flex align="center" justify="center" gap="40px" direction="column">
        <PieChart
          size={300}
          data={faculties}
          withLabelsLine
          labelsPosition="inside"
          labelsType="percent"
          withLabels
          withTooltip
        />

        <Flex align="center" justify="center">
          {faculties.map((f: any) => (
            <Flex align="center" key={f.name} gap="sm">
              <Box bg={f.color} w="70px" h="30px" />
              <Text>{f.name}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
}
