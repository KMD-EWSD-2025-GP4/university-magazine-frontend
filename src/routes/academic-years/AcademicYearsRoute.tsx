import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { getDefaultMRTOptions } from "@/configs/data-table";
import {
  ActionIcon,
  Badge,
  Button,
  Flex,
  Group,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import { Link } from "react-router";
import { routes } from "@/configs/menus";
import { useGetAcademicYears } from "./queries";
import { AcademicYearDetailType } from "@/configs/schemas";
import { CalendarIcon2, ThreeDotsIcon } from "@/icons";
import { formatServerDatetime } from "@/utils/dates";
import { PageLoading } from "@/components/loading/PageLoading";
import { DatePickerInput } from "@mantine/dates";

const defaultMRTOptions = getDefaultMRTOptions<AcademicYearDetailType>();

export function AcademicYearsRoute() {
  const { data = [], isPending } = useGetAcademicYears();

  const columns = useMemo<MRT_ColumnDef<AcademicYearDetailType>[]>(
    () => [
      {
        accessorKey: "startDate",
        header: "Start Date",
        Cell: ({ cell }) => (
          <Text style={{ whiteSpace: "nowrap" }}>
            {cell.getValue()
              ? formatServerDatetime(cell.getValue() as string)
              : ""}
          </Text>
        ),
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        Cell: ({ cell }) => (
          <Text style={{ whiteSpace: "nowrap" }}>
            {cell.getValue()
              ? formatServerDatetime(cell.getValue() as string)
              : ""}
          </Text>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => (
          <Badge color={cell.getValue() === "active" ? "green" : "red"}>
            {(cell.getValue() as string) ?? "api"}
          </Badge>
        ),
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
                to={`${routes["academic-years"]}/${cell.getValue()}`}
              >
                Detail
              </Menu.Item>
              <Menu.Item color="red">Delete</Menu.Item>
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
    data,
    renderTopToolbarCustomActions: () => (
      <Group gap="md" align="center">
        <DatePickerInput
          w={200}
          placeholder="Start Date"
          leftSection={<CalendarIcon2 size={18} />}
        />
        <DatePickerInput
          w={200}
          placeholder="End Date"
          leftSection={<CalendarIcon2 size={18} />}
        />
      </Group>
    ),
  });

  if (isPending) {
    return <PageLoading />;
  }

  return (
    <Stack gap="xl" p="xl">
      <Flex align="center" justify="space-between">
        <Text size="26px" component="h1" fw={700}>
          Academic Years Management
        </Text>
        <Button
          leftSection={<> + </>}
          component={Link}
          to={routes["new-academic-year"]}
        >
          Add Academic Year
        </Button>
      </Flex>
      <MantineReactTable table={table} />
    </Stack>
  );
}
