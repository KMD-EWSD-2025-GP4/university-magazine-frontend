import {
  loginRoutes,
  defaultRoutes,
  routes,
  studentRoutes,
  adminRoutes,
} from "@/configs/menus";
import { roles, RoleType } from "@/configs/rbac";
import { useUserStore } from "@/store/useUser";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export function AuthLayout() {
  const location = useLocation();
  const user = useUserStore((state) => state?.user);
  const navigate = useNavigate();
  const isAuthenticated = Boolean(user?.role);
  const isLoginRoute = Object.values(loginRoutes).includes(location.pathname);

  useEffect(() => {
    /**
     * Redirect to login page
     * - when user is not authenticated and not in login route
     */
    if (!isAuthenticated && !isLoginRoute) {
      navigate(routes.login, { replace: true });
      return;
    }

    /**
     * Redirect to default route
     * - when user is authenticated and in login route
     */
    if (isAuthenticated && isLoginRoute) {
      const role = user!.role as RoleType;
      const redirectUrl = defaultRoutes[role] ?? routes.dashboard;
      navigate(redirectUrl, { replace: true });
      return;
    }

    /**
     * Redirect to contributions route
     * - when user role is student and not in student routes
     */
    if (
      user?.role === roles.student &&
      !studentRoutes.includes(location.pathname)
    ) {
      navigate(defaultRoutes.student, { replace: true });
      return;
    }

    /**
     * Redirect to contributions route
     * - when user role is admin and not in admin routes
     */
    if (
      user?.role === roles.admin &&
      !adminRoutes.includes(location.pathname)
    ) {
      navigate(defaultRoutes.admin, { replace: true });
      return;
    }
  }, [
    navigate,
    user?.token,
    user?.role,
    user,
    isAuthenticated,
    isLoginRoute,
    location.pathname,
  ]);

  return <Outlet />;
}
