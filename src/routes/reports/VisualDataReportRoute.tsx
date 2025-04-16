import { Can } from "@/components/core";
import { PageLoading } from "@/components/loading/PageLoading";
import { StatusSelect } from "@/components/select";
import { getDefaultMRTOptions } from "@/configs/data-table";
import { routes } from "@/configs/menus";
import { roles } from "@/configs/rbac";
import { ContributionDetailType } from "@/configs/schemas";
import { ThreeDotsIcon } from "@/icons";
import { formatDate } from "@/utils/dates";
import {
  ActionIcon,
  Badge,
  Button,
  Container,
  Group,
  Menu,
  Text,
  TextInput,
} from "@mantine/core";
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { Flex, Paper, Stack } from "@mantine/core";
import { useGetMcUncommentedContribution } from "./queries";
import { useGetAcademicYears } from "../academic-years/queries";
import { download, generateCsv, mkConfig } from "export-to-csv";

const defaultMRTOptions = getDefaultMRTOptions<ContributionDetailType>();

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "contributions-without-a-comment",
});

export function VisualDataReportRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const status = searchParams.get("status") || "";
  const selectedAcademicYear = searchParams.get("gAcademicYear") || "";

  const { data: academicYears } = useGetAcademicYears();
  const { data, isLoading } =
    useGetMcUncommentedContribution(selectedAcademicYear);

  const filteredData = useMemo(() => {
    return (
      data?.items?.filter((item: ContributionDetailType) => {
        if (status && item?.status?.toLowerCase() !== status?.toLowerCase()) {
          return false;
        }
        return item?.studentName?.toLowerCase().includes(name?.toLowerCase());
      }) || []
    );
  }, [data?.items, name, status]);

  const columns = useMemo<MRT_ColumnDef<ContributionDetailType>[]>(
    () => [
      {
        accessorKey: "studentName",
        header: "Name",
      },
      {
        accessorKey: "title",
        header: "Contribution Title",
      },
      {
        accessorKey: "createdAt",
        header: "Uploaded At",
        Cell: ({ cell }) => (
          <Text style={{ whiteSpace: "nowrap" }}>
            {cell.getValue() ? formatDate(cell.getValue() as string) : ""}
          </Text>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
        Cell: ({ cell }) => (
          <Text style={{ whiteSpace: "nowrap" }}>
            {cell.getValue() ? formatDate(cell.getValue() as string) : ""}
          </Text>
        ),
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        Cell: ({ cell }) => (
          <Text style={{ whiteSpace: "nowrap" }}>
            {cell.getValue() ? formatDate(cell.getValue() as string) : ""}
          </Text>
        ),
      },
      {
        accessorKey: "academicYear",
        header: "Academic Year",
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          const statusColor = (() => {
            if (cell.getValue() === "selected") return "green";
            if (cell.getValue() === "rejected") return "red";
            return "yellow";
          })();
          return (
            <Badge color={statusColor} tt="capitalize" fw={400}>
              {(cell.getValue() as string) ?? "active"}
            </Badge>
          );
        },
      },
      {
        header: "Details",
        accessorKey: "id",
        Cell: ({ cell }) => (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="transparent">
                <ThreeDotsIcon />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component={Link}
                to={`${routes["mc-contributions"]}/${cell.getValue()}`}
              >
                Detail
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ),
      },
    ],
    []
  );

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filteredData.map((item: any) => ({
        // ...item,
        studentName: item.studentName,
        contributionTitle: item.title,
        uploadedAt: formatDate(item.createdAt),
        dueDate: formatDate(item.dueDate),
        academicYear: item.academicYear,
        status: item.status,
        updatedAt: formatDate(item.updatedAt),
        createdAt: formatDate(item.createdAt),
      }))
    );
    download(csvConfig)(csv);
  };

  const table = useMantineReactTable({
    ...defaultMRTOptions,
    columns,
    data: filteredData,
    renderTopToolbarCustomActions: () => (
      <Group gap="md" align="center" w="100%">
        <TextInput
          placeholder="Search by name"
          value={name}
          onChange={(e) => {
            setSearchParams({
              name: e.target.value,
              status,
            });
          }}
        />
        <StatusSelect
          value={status}
          onChange={(value) => setSearchParams({ status: value || "", name })}
          data={[
            {
              value: "pending",
              label: "Pending",
            },
            {
              value: "selected",
              label: "Selected",
            },
            {
              value: "rejected",
              label: "Rejected",
            },
          ]}
        />

        <Button onClick={() => setSearchParams({})}>Refresh</Button>
        <Can roles={[roles.marketing_coordinator]}>
          <Button
            ml="auto"
            onClick={() => {
              handleExportData();
            }}
            variant="outline"
            color="gray"
          >
            Download Zip
          </Button>
        </Can>
      </Group>
    ),
  });

  useEffect(() => {
    if (!selectedAcademicYear) {
      setSearchParams({ gAcademicYear: academicYears?.[0]?.id || "" });
    }
  }, [academicYears, selectedAcademicYear, setSearchParams]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Container size="lg" py="20px">
      <Flex align="center" justify="space-between">
        <Text fw="bold" size="24px" mb={"40px"}>
          Contribution Report
        </Text>
      </Flex>

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
          <ContentCard total={data?.totalContributionsWithoutComment || 0} />
          <ContentCard
            total={data?.totalContributionsWithoutCommentForMoreThan14Days || 0}
            after
          />
        </Flex>

        <Stack>
          <Text size="26px" component="h2" fw={700}>
            Contributions without a comment
          </Text>
          <MantineReactTable table={table} />
        </Stack>
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
