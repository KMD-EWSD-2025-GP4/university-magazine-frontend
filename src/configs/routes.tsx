import { Routes as ReactRouterRoutes, Route } from "react-router";
import { AuthLayout, DashboardLayout, NewFeedLayout } from "@/layouts";
import { LoginRoute } from "@/routes/auth";
import { DashboardRoute } from "@/routes/dashboard";
import { ReportRoutes } from "@/routes/reports";
import { EditUserRoute, NewUserRoute, UsersRoute } from "@/routes/users";
import { routes } from "./menus";
import {
  AcademicYearsRoute,
  NewAcademicYearRoute,
} from "@/routes/academic-years";
import { SystemParametersRoute } from "@/routes/system-parameters";
import { DetailsFacultyRoute } from "@/routes/system-parameters";
import { RegisterRoute } from "@/routes/auth";
import {
  ContributionsRoute,
  EditContributionsRoute,
  MyContributionsRoute,
  NewContributionsRoute,
} from "@/routes/contributions";
import { TermsAndConditions } from "@/routes/term-conditions/TermsAndConditions";
export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route element={<AuthLayout />}>
        <Route index element={<LoginRoute />} />
        <Route path="register" element={<RegisterRoute />} />

        <Route path={routes.dashboard} element={<DashboardLayout />}>
          <Route index element={<DashboardRoute />} />
          <Route path={routes["user-management"]} element={<UsersRoute />} />
          <Route
            path={`${routes["user-management"]}/:id`}
            element={<EditUserRoute />}
          />
          <Route path={routes["reports"]} element={<ReportRoutes />} />
          <Route
            path={routes["academic-years"]}
            element={<AcademicYearsRoute />}
          />
          <Route
            path={routes["new-academic-year"]}
            element={<NewAcademicYearRoute />}
          />
          <Route
            path={routes["system-parameter"]}
            element={<SystemParametersRoute />}
          />
          <Route
            path={routes["details-faculty"]}
            element={<DetailsFacultyRoute />}
          />
          <Route
            path={routes["terms-conditions"]}
            element={<TermsAndConditions />}
          />
          <Route path={routes["new-user"]} element={<NewUserRoute />} />
        </Route>

        <Route element={<NewFeedLayout />}>
          <Route path={routes.contributions} element={<ContributionsRoute />} />
          <Route
            path={routes["new-contribution"]}
            element={<NewContributionsRoute />}
          />
          <Route
            path={routes["edit-contribution"]}
            element={<EditContributionsRoute />}
          />
          <Route
            path={routes["my-contributions"]}
            element={<MyContributionsRoute />}
          />
        </Route>
      </Route>
    </ReactRouterRoutes>
  );
}
