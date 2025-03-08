import { useState, useEffect, useMemo } from "react";
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
  Group,
  Menu,
  Stack,
  Text,
  TextInput,
  Select,
  Flex,
} from "@mantine/core";
import { modals } from "@mantine/modals"; 
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query"; 
import { routes } from "@/configs/menus";
import { useGetFaculties, useDeleteFaculty } from "./queries";
import { FacultyType } from "@/configs/schemas";
import { ThreeDotsIcon } from "@/icons";
import { PageLoading } from "@/components/loading/PageLoading";

const defaultMRTOptions = getDefaultMRTOptions<FacultyType>();

export function SystemParametersRoute() {
  const queryClient = useQueryClient(); 
  const { data = [], isPending, isError } = useGetFaculties();
  const deleteFacultyMutation = useDeleteFaculty();

  const getParamValue = (key: string) =>
    new URLSearchParams(window.location.search).get(key) || "";

  const [searchName, setSearchName] = useState(getParamValue("searchName"));
  const [searchStatus, setSearchStatus] = useState(
    getParamValue("searchStatus")
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (searchName) params.set("searchName", searchName);
    else params.delete("searchName");

    if (searchStatus) params.set("searchStatus", searchStatus);
    else params.delete("searchStatus");

    window.history.replaceState({}, "", `?${params.toString()}`);
  }, [searchName, searchStatus]);

  const facultyList = Array.isArray(data) ? data : data?.faculties ?? [];

  const filteredFaculties = useMemo(() => {
    return facultyList.filter((faculty) => {
      const facultyName = faculty?.name?.toLowerCase() || "";
      const facultyStatus = faculty?.status || "";

      return (
        (!searchName || facultyName.includes(searchName.toLowerCase())) &&
        (!searchStatus || facultyStatus === searchStatus)
      );
    });
  }, [facultyList, searchName, searchStatus]);

  const handleDeleteFaculty = (facultyId: string) => {
    modals.openConfirmModal({
      title: "Confirm Deletion",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this faculty? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteFacultyMutation.mutate(facultyId, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["faculties"] });
          },
        });
      },
    });
  };

  const handleExportCSV = () => {
    if (filteredFaculties.length === 0) {
      alert("No data available to export.");
      return;
    }

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "ID,Name,Status",
        ...filteredFaculties.map((f) => `${f.id},${f.name},${f.status}`),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "faculties.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = useMemo<MRT_ColumnDef<FacultyType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Faculty Name",
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => (
          <Badge color={cell.getValue() === "active" ? "green" : "red"}>
            {(cell.getValue() as string) ?? ""}
          </Badge>
        ),
      },
      {
        header: "Actions",
        accessorKey: "id",
        Cell: ({ cell }) => {
          const facultyId = cell.getValue() as string;
          return (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon variant="transparent">
                  <ThreeDotsIcon />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  component={Link}
                  to={routes["details-faculty"].replace(":id", facultyId)}
                >
                  View Details
                </Menu.Item>
                <Menu.Item color="red" onClick={() => handleDeleteFaculty(facultyId)}>
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          );
        },
      },
    ],
    [deleteFacultyMutation]
  );

  const table = useMantineReactTable({
    ...defaultMRTOptions,
    columns,
    data: filteredFaculties,
    renderTopToolbarCustomActions: () => (
      <Flex justify="space-between" align="center" w="100%">
        <Group gap="md">
          <TextInput
            placeholder="Search by faculty name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Select
            placeholder="Filter by status"
            data={[
              { value: "", label: "All" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            value={searchStatus}
            onChange={(value) => setSearchStatus(value || "")}
          />
        </Group>

        <Group gap="md">
          <Button onClick={handleExportCSV} variant="outline" color="gray">
            Export CSV
          </Button>
      
        </Group>
      </Flex>
    ),
  });

  if (isPending) {
    return <PageLoading />;
  }

  if (isError) {
    return <Text color="red">Error loading faculties. Please try again.</Text>;
  }

  return (
    <Stack gap="xl" p="xl">
      <Group justify="space-between">
        <Text size="26px" component="h1" fw={700}>
          Faculty Management
        </Text>
        <Button
          component={Link}
          to="/d/system-param/faculty/new"
          variant="filled"
          style={{ backgroundColor: "#0A284B", color: "white" }}
        >
          + New Faculty
        </Button>
      </Group>
      <MantineReactTable table={table} />
    </Stack>
  );
}
