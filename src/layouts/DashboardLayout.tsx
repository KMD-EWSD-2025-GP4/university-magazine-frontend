import { Outlet, useNavigate } from "react-router";
import {
  AppShell,
  Box,
  Burger,
  Container,
  Flex,
  Group,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { handleLogout } from "@/utils/auth";
import { showNotification } from "@mantine/notifications";
import SidebarMenu from "@/components/menu/SidebarMenu";
import { useUserStore } from "@/store/useUser";
import { Breadcrumbs } from "@/components/core";
import { HeaderAcademicYearSelect } from "@/components/HeaderAcademicYearSelect";
import { roles } from "@/configs/rbac";
export function DashboardLayout() {
  const user = useUserStore((state) => state.user);
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: user?.role === roles.marketing_manager ? 172 : 98 }}
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      {/* HEADER */}
      <AppShell.Header>
        <Box style={{ backgroundColor: "#0A284B", color: "white" }}>
          <Group h="100%" px="md" py="lg" justify="space-between">
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
                color="white"
              />
              <Image src="/logo.svg" height={58} width={209} />
            </Group>
            <Text size="sm">
              Welcome "{user?.username}" from University Magazine Portal!
            </Text>
          </Group>
        </Box>

        {user?.role === roles.marketing_manager && (
          <Paper
            py="md"
            px="20px"
            pos="sticky"
            top={0}
            style={{ zIndex: 100 }}
            shadow="md"
          >
            <Flex align="center" justify="space-between" gap="md">
              <Box>
                <Text component="span">{user?.facultyName?.slice(0, 10)} </Text>
                <Text fw={600} fs="italic" component="div">
                  {user?.facultyName?.slice(10)}
                </Text>
              </Box>

              <HeaderAcademicYearSelect />
            </Flex>
          </Paper>
        )}
      </AppShell.Header>

      {/* SIDEBAR NAVIGATION */}
      <AppShell.Navbar p="md">
        <SidebarMenu
          handleLogout={() => {
            handleLogout(() => {
              navigate("/");
              showNotification({
                title: "Logout Success!",
                message: "You have successfully logged out.",
              });
            });
          }}
        />
      </AppShell.Navbar>

      {/* MAIN CONTENT */}
      <AppShell.Main>
        <Container size="xl">
          <Breadcrumbs />
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
