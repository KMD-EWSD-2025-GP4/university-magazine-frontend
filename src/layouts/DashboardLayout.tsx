import { Outlet, useNavigate } from "react-router";
import {
  AppShell,
  Burger,
  Container,
  Group,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { handleLogout } from "@/utils/auth";
import { showNotification } from "@mantine/notifications";
import SidebarMenu from "@/components/menu/SidebarMenu";
export function DashboardLayout() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();


  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      {/* HEADER */}
      <AppShell.Header style={{ backgroundColor: "#0A284B", color: "white" }}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" />
            <Text fw={700} size="lg">
              University <Text span fw={500} size="lg" color="white">Magazine</Text>
            </Text>
          </Group>
          <Text size="sm">Welcome "Name" from University Magazine Portal!</Text>
        </Group>
      </AppShell.Header>

      {/* SIDEBAR NAVIGATION */}
      <AppShell.Navbar p="md">
        <SidebarMenu handleLogout={() => {
           handleLogout(() => {
            navigate("/");
            showNotification({
              title: "Logout Success!",
              message: "You have successfully logged out.",
            });
          });
        }} />
      </AppShell.Navbar>

      {/* MAIN CONTENT */}
      <AppShell.Main>
        <Container size="xl">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );

}
