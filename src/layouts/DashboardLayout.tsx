import { useUserStore } from "@/store/useUser";
import { useEffect } from "react";
import { Outlet, useNavigate, NavLink as ReactRouterLink } from "react-router";
import { AppShell, Burger, Group, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { adminMenus } from "@/configs/menus";
import { useLocation } from "react-router";

export function DashboardLayout() {
  const token = useUserStore((state) => state?.user?.token);

  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  /*
   * TODO: get user menus according to it's role.
   */
  const userMenus = adminMenus;

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate, token]);

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
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
