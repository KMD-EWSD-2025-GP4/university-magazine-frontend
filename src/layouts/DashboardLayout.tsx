import { Outlet, useNavigate, NavLink as ReactRouterLink } from "react-router";
import {
  AppShell,
  Burger,
  Container,
  Group,
  NavLink,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { adminMenus } from "@/configs/menus";
import { useLocation } from "react-router";
import { LogoutIcon } from "@/icons";
import { handleLogout } from "@/utils/auth";
import { showNotification } from "@mantine/notifications";

export function DashboardLayout() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  /*
   * TODO: get user menus according to it's role.
   */
  const userMenus = adminMenus;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>Logo</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {userMenus.map((menu) => (
          <NavLink
            component={ReactRouterLink}
            active={menu.href === location.pathname}
            key={menu.label}
            to={menu.href}
            label={menu.label}
            leftSection={<menu.icon />}
          />
        ))}

        <NavLink
          label="Logout"
          c="red"
          active={false}
          onClick={() => {
            handleLogout(() => {
              navigate("/");
              showNotification({
                title: "Logout Success!",
                message: "You have successfully logged out.",
              });
            });
          }}
          leftSection={<LogoutIcon />}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Container size="xl">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
