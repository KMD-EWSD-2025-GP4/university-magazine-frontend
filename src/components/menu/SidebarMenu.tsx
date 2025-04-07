import { NavLink, ScrollArea, ThemeIcon, Box } from "@mantine/core";
import { Link as ReactRouterLink, useLocation, Location } from "react-router";
import { adminMenus, mcMenus } from "@/configs/menus";
import { LogoutIcon } from "@/icons";
import { useMemo } from "react";
import { useUserStore } from "@/store/useUser";
import { roles } from "@/configs/rbac";

type MenuItem = {
  label: string;
  icon?: React.ElementType;
  href?: string;
  submenus?: MenuItem[];
};

const renderSubMenu = (
  submenus: MenuItem[] = [],
  location: Location,
  level = 1
) => {
  return submenus.map((submenu) => (
    <NavLink
      key={submenu.label}
      label={submenu.label}
      component={ReactRouterLink}
      to={submenu.href || "#"}
      active={submenu.href === location.pathname}
      leftSection={<Box ml={level * 20} />}
      childrenOffset={24}
    >
      {submenu.submenus && submenu.submenus.length > 0
        ? renderSubMenu(submenu.submenus, location, level + 1)
        : null}
    </NavLink>
  ));
};

export default function SidebarMenu({
  handleLogout,
}: {
  handleLogout: () => void;
}) {
  const user = useUserStore((state) => state.user);
  const menus = useMemo(() => {
    if (user?.role === roles.admin) {
      return adminMenus;
    }

    if (user?.role === roles.marketing_coordinator) {
      return mcMenus;
    }

    return [];
  }, [user?.role]);
  const location = useLocation();

  return (
    <ScrollArea>
      {menus.map((menu: MenuItem) => (
        <NavLink
          key={menu.label}
          label={menu.label}
          component={menu.href ? ReactRouterLink : undefined}
          to={menu.href || "#"}
          active={menu.href === location.pathname}
          leftSection={
            menu.icon ? (
              <ThemeIcon variant="light">{<menu.icon size={18} />}</ThemeIcon>
            ) : undefined
          }
          childrenOffset={28}
        >
          {menu.submenus && menu.submenus.length > 0
            ? renderSubMenu(menu.submenus, location)
            : null}
        </NavLink>
      ))}

      {/* LOGOUT BUTTON */}
      <NavLink
        label="Logout"
        c="red"
        active={false}
        onClick={handleLogout}
        leftSection={<LogoutIcon />}
      />
    </ScrollArea>
  );
}
