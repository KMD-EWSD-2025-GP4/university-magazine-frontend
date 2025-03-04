import { loginRolesHomeRoutes } from "@/configs/menus";
import { RoleType } from "@/configs/rbac";
import { useUserStore } from "@/store/useUser";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export function AuthLayout() {
  const user = useUserStore((state) => state?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      const role = user.role as RoleType;
      const redirectUrl = loginRolesHomeRoutes[role] ?? "/d";
      navigate(redirectUrl, { replace: true });
    }
  }, [navigate, user?.token, user?.role, user]);

  return <Outlet />;
}
