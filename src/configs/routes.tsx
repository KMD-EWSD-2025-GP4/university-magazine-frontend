import { Routes as ReactRouterRoutes, Route } from "react-router";
import { DashboardLayout } from "@/layouts";
import { LoginRoute } from "@/routes/auth";
import { DashboardRoute } from "@/routes/dashboard";
import { ReportRoutes } from "@/routes/reports";
import { NewUserRoute, UsersRoute } from "@/routes/users";
import { routes } from "./menus";
import { AcademicYearsRoute } from "@/routes/academic-years";
import { SystemParametersRoute } from "@/routes/system-parameters";

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route index element={<LoginRoute />} />

      <Route path={routes.dashboard} element={<DashboardLayout />}>
        <Route index element={<DashboardRoute />} />
        <Route path={routes["user-management"]} element={<UsersRoute />} />
        <Route path={routes["reports"]} element={<ReportRoutes />} />
        <Route
          path={routes["academic-years"]}
          element={<AcademicYearsRoute />}
        />
        <Route
          path={routes["system-parameter"]}
          element={<SystemParametersRoute />}
        />
        <Route path={routes["new-user"]} element={<NewUserRoute />} />
      </Route>
    </ReactRouterRoutes>
  );
}
