import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { getDefaultMRTOptions } from "@/configs/data-table";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Link } from "react-router";
import { routes } from "@/configs/menus";
import { useGetUsers } from "./queries";
import { UserDetailType } from "@/configs/schemas";
import { RoleSelect, StatusSelect } from "@/components/select";
import { ThreeDotsIcon } from "@/icons";
import { formatServerDatetime } from "@/utils/dates";

const defaultMRTOptions = getDefaultMRTOptions<UserDetailType>();

export function UsersRoute() {
  const { data = [], isPending } = useGetUsers();

  console.log("isPending", isPending);

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
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "status",
        header: "Status",
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
            {cell.getValue()
              ? formatServerDatetime(cell.getValue() as string)
              : ""}
          </Text>
        ),
      },
      {
        header: "Details",
        Cell: () => (
          <ActionIcon variant="transparent">
            <ThreeDotsIcon />
          </ActionIcon>
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
        <TextInput placeholder="Search by name" />
        <StatusSelect />
        <RoleSelect />
      </Group>
    ),
  });

  return (
    <Stack gap="xl" p="xl">
      <Flex align="center" justify="space-between">
        <Text size="xl" component="h1" fw={600}>
          Users Management
        </Text>
        <Button leftSection={<> + </>} component={Link} to={routes["new-user"]}>
          Add New User
        </Button>
      </Flex>
      <MantineReactTable table={table} />
    </Stack>
  );
}
