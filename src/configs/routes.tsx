import { Routes as ReactRouterRoutes, Route } from "react-router";
import { DashboardLayout } from "@/layouts";
import { LoginRoute } from "@/routes/auth";
import { DashboardRoute } from "@/routes/dashboard";
import { ReportRoutes } from "@/routes/reports";
import { UsersRoute } from "@/routes/users";
import { routes } from "./menus";

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route index element={<LoginRoute />} />

      <Route path={routes.dashboard} element={<DashboardLayout />}>
        <Route index element={<DashboardRoute />} />
        <Route path={routes["user-management"]} element={<UsersRoute />} />
        <Route path={routes["reports"]} element={<ReportRoutes />} />
      </Route>
    </ReactRouterRoutes>
  );
}
