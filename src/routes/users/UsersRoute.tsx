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
  TextInput,
} from "@mantine/core";
import { Link, useSearchParams } from "react-router";
import { routes } from "@/configs/menus";
import { useGetUsers } from "./queries";
import { UserDetailType } from "@/configs/schemas";
import { RoleSelect, StatusSelect } from "@/components/select";
import { ThreeDotsIcon } from "@/icons";
import { formatServerDatetime } from "@/utils/dates";
import { PageLoading } from "@/components/loading/PageLoading";

const defaultMRTOptions = getDefaultMRTOptions<UserDetailType>();

export function UsersRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const status = searchParams.get("status") || "";
  const role = searchParams.get("role") || "";

  const { data = [], isPending } = useGetUsers();

  const filteredData = useMemo(() => {
    return data.filter((user) => {
      if (status && user?.status?.toLowerCase() !== status?.toLowerCase()) {
        return false;
      }
      return (
        user?.name?.toLowerCase().includes(name?.toLowerCase()) &&
        user?.role?.toLowerCase().includes(role?.toLowerCase())
      );
    });
  }, [data, name, status, role]);

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
        Cell: ({ cell }) => (
          <Badge color={cell.getValue() !== "active" ? "red" : "green"}>
            {(cell.getValue() as string) ?? "active"}
          </Badge>
        ),
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
                to={`${routes["user-management"]}/${cell.getValue()}`}
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
      <Group gap="md" align="center">
        <TextInput
          placeholder="Search by name"
          value={name}
          onChange={(e) => {
            setSearchParams({
              name: e.target.value,
              status,
              role,
            });
          }}
        />
        <StatusSelect
          value={status}
          onChange={(value) =>
            setSearchParams({ status: value || "", name, role })
          }
        />
        <RoleSelect
          value={role}
          onChange={(value) =>
            setSearchParams({ role: value || "", name, status })
          }
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
