import { PageLoading } from "@/components/loading/PageLoading";
import { StatusSelect } from "@/components/select";
import { getDefaultMRTOptions } from "@/configs/data-table";
import { UserDetailType } from "@/configs/schemas";
import { formatDate, formatDatetime } from "@/utils/dates";
import { Badge, Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { download, generateCsv, mkConfig } from "export-to-csv";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useGetMCGuestReport } from "./queries";

const defaultMRTOptions = getDefaultMRTOptions<UserDetailType>();

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "users",
});

export function GuestReportRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const status = searchParams.get("status") || "";
  const { data = [], isPending } = useGetMCGuestReport();

  const filteredData = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.filter((user: any) => {
      if (status && user?.status?.toLowerCase() !== status?.toLowerCase()) {
        return false;
      }
      return user?.name?.toLowerCase().includes(name?.toLowerCase());
    });
  }, [data, name, status]);

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filteredData.map((user: any) => ({
        ...user,
        lastLogin: formatDate(user.lastLogin),
      }))
    );
    download(csvConfig)(csv);
  };

  const columns = useMemo<MRT_ColumnDef<UserDetailType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "facultyName",
        header: "Faulty Name",
      },
      {
        accessorKey: "browser",
        header: "Login Browser",
      },
      {
        accessorKey: "totalLogins",
        header: "Log In",
      },
      {
        accessorKey: "lastLogin",
        header: "Last Logged In",
        Cell: ({ cell }) => (
          <Text style={{ whiteSpace: "nowrap" }}>
            {cell.getValue() ? formatDatetime(cell.getValue() as string) : ""}
          </Text>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => (
          <Badge color={cell.getValue() !== "active" ? "red" : "green"}>
            {(cell.getValue() as string) ?? "active"}
          </Badge>
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
        />

        <Button onClick={() => setSearchParams({})}>Refresh</Button>

        <Button
          ml="auto"
          onClick={handleExportData}
          variant="outline"
          color="gray"
        >
          Export CSV
        </Button>
      </Group>
    ),
  });

  if (isPending) {
    return <PageLoading />;
  }

  return (
    <Stack gap="xl" p="xl">
      <Text size="26px" component="h1" fw={700}>
        Guest Report
      </Text>

      <MantineReactTable table={table} />
    </Stack>
  );
}
