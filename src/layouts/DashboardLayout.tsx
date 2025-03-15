import { Outlet, useNavigate } from "react-router";
import { AppShell, Burger, Container, Group, Image, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { handleLogout } from "@/utils/auth";
import { showNotification } from "@mantine/notifications";
import SidebarMenu from "@/components/menu/SidebarMenu";
import { useUserStore } from "@/store/useUser";
import { Breadcrumbs } from "@/components/core";
export function DashboardLayout() {
  const user = useUserStore((state) => state.user);
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: 105 }}
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      {/* HEADER */}
      <AppShell.Header style={{ backgroundColor: "#0A284B", color: "white" }}>
        <Group h="100%" px="md" justify="space-between">
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
