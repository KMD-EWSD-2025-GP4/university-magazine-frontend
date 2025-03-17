import { PageLoading } from "@/components/loading/PageLoading";
import { StatusSelect } from "@/components/select";
import { getDefaultMRTOptions } from "@/configs/data-table";
import { routes } from "@/configs/menus";
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
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { useGetMCContributions } from "./queries";

const defaultMRTOptions = getDefaultMRTOptions<ContributionDetailType>();

export function MCContributionsRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const status = searchParams.get("status") || "";

  const { data, isPending } = useGetMCContributions();

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
        accessorKey: "updatedAt",
        header: "Updated",
        Cell: ({ cell }) => (
          <Text style={{ whiteSpace: "nowrap" }}>
            {cell.getValue() ? formatDate(cell.getValue() as string) : ""}
          </Text>
        ),
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

        <Button ml="auto" onClick={() => {}} variant="outline" color="gray">
          Export CSV
        </Button>
      </Group>
    ),
  });

  if (isPending) {
    return <PageLoading />;
  }

  return (
    <Container size="lg" py="20px">
      <MantineReactTable table={table} />
    </Container>
  );
}
