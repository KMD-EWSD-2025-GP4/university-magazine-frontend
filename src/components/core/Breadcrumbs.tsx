import { menus, routes } from "@/configs/menus";
import { Breadcrumbs as MantineBreadcrumbs, Anchor } from "@mantine/core";
import { Link, useLocation, useParams } from "react-router";

export function Breadcrumbs() {
  const { id = "" } = useParams();
  const location = useLocation();
  const paths = location.pathname?.replace(id, ":id")?.split("/")?.slice(2);

  const flattenMenus = Object.values(menus).flatMap((menu) => {
    if (menu.submenus && menu.submenus.length > 0) {
      return [menu, ...menu.submenus];
    }
    return [menu];
  });

  if (paths?.length < 2) {
    return null;
  }

  const items = paths.map((p, i) => {
    const path = paths.slice(0, i + 1).join("/");
    const link = `${routes.dashboard}/${path}`;
    const menu = flattenMenus.find((m) => m.href === link);

    return (
      <Anchor to={link} component={Link} key={i}>
        {menu?.label || p}
      </Anchor>
    );
  });

  return (
    <>
      <MantineBreadcrumbs separator=">>" mt="xs">
        {items}
      </MantineBreadcrumbs>
    </>
  );
}
