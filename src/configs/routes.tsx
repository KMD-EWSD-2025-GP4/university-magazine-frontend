import { Routes as ReactRouterRoutes, Route } from "react-router";
import { DashboardLayout } from "@/layouts";
import { LoginRoute } from "@/routes/auth";
import { DashboardRoute } from "@/routes/dashboard";

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route index element={<LoginRoute />} />

      <Route path="d" element={<DashboardLayout />}>
        <Route index element={<DashboardRoute />} />
      </Route>
    </ReactRouterRoutes>
  );
}
