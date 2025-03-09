import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
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
import { Link, useSearchParams } from "react-router";
import { routes } from "@/configs/menus";
import { useDeleteAcademicYear, useGetAcademicYears } from "./queries";
import { AcademicYearDetailType } from "@/configs/schemas";
import { CalendarIcon2, ThreeDotsIcon } from "@/icons";
import { formatServerDatetime } from "@/utils/dates";
import { PageLoading } from "@/components/loading/PageLoading";
import { DatePickerInput } from "@mantine/dates";
import { modals } from "@mantine/modals";

const defaultMRTOptions = getDefaultMRTOptions<AcademicYearDetailType>();

export function AcademicYearsRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  const { data = [], isPending } = useGetAcademicYears();
  const deleteMutation = useDeleteAcademicYear();

  const filteredData = useMemo(() => {
    let tmp = data;

    if (startDate) {
      tmp = data.filter((academicYear) =>
        dayjs(academicYear.startDate).isAfter(startDate)
      );
    }

    if (endDate) {
      tmp = tmp.filter((academicYear) =>
        dayjs(academicYear.endDate).isBefore(endDate)
      );
    }

    return tmp;
  }, [data, endDate, startDate]);

  const handleDelete = useCallback(
    (id: string) => {
      modals.openConfirmModal({
        title: "Delete Academic Year",
        centered: true,
        children: <Text size="sm">Are you sure you want to delete?</Text>,
        labels: { confirm: "Delete", cancel: "Cancel" },
        confirmProps: { color: "red" },
        onConfirm: () => {
          deleteMutation.mutate(id);
        },
      });
    },
    [deleteMutation]
  );

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
              <Menu.Item
                color="red"
                onClick={() => handleDelete(cell.getValue() as string)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ),
      },
    ],
    [handleDelete]
  );

  const table = useMantineReactTable({
    ...defaultMRTOptions,
    columns,
    data: filteredData,
    renderTopToolbarCustomActions: () => (
      <Group gap="md" align="center">
        <DatePickerInput
          clearable
          w={200}
          value={startDate ? new Date(startDate) : null}
          onChange={(value) =>
            setSearchParams({ startDate: value?.toISOString() || "", endDate })
          }
          placeholder="Start Date"
          leftSection={<CalendarIcon2 size={18} />}
        />
        <DatePickerInput
          clearable
          value={endDate ? new Date(endDate) : null}
          onChange={(value) =>
            setSearchParams({ endDate: value?.toISOString() || "", startDate })
          }
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
