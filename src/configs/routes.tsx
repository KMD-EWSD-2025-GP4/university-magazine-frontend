import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { AuthLayout, DashboardLayout, NewFeedLayout } from "@/layouts";
import { LoginRoute, RegisterRoute } from "@/routes/auth";
import { DashboardRoute } from "@/routes/dashboard";
import {
  DataInsightRoute,
  GuestReportRoute,
  MMContributionReports,
  MMContributorReports,
  VisualDataReportRoute,
} from "@/routes/reports";
import { EditUserRoute, NewUserRoute, UsersRoute } from "@/routes/users";
import { routes } from "./menus";
import {
  AcademicYearsRoute,
  EditAcademicYearRoute,
  NewAcademicYearRoute,
} from "@/routes/academic-years";
import {
  SystemParametersRoute,
  DetailsFacultyRoute,
} from "@/routes/system-parameters";
import {
  ContributionsRoute,
  EditContributionsRoute,
  MCContributionsRoute,
  MCEditContributionsRoute,
  MMContributionsRoute,
  MyContributionsRoute,
  NewContributionRoute,
} from "@/routes/contributions";
import { TermsAndConditions } from "@/routes/term-conditions/TermsAndConditions";
import ContributionDetailsRoute from "@/routes/contributions/ContributionDetailsRoute";
import { ArticleDetailRoute } from "@/routes/articles";

export const router = createBrowserRouter(
  createRoutesFromElements(
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

        <Route
          path={routes["academic-years"]}
          element={<AcademicYearsRoute />}
        />
        <Route
          path={routes["new-academic-year"]}
          element={<NewAcademicYearRoute />}
        />
        <Route
          path={routes["edit-academic-year"]}
          element={<EditAcademicYearRoute />}
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
        <Route
          path={routes["mc-contributions"]}
          element={<MCContributionsRoute />}
        />
        <Route path={routes["data-insights"]} element={<DataInsightRoute />} />
        <Route
          path={routes["visual-data-reports"]}
          element={<VisualDataReportRoute />}
        />
        <Route path={routes["guest-report"]} element={<GuestReportRoute />} />
      </Route>

      <Route element={<NewFeedLayout />}>
        <Route path={routes.contributions} element={<ContributionsRoute />} />
        <Route
          path={routes["new-contribution"]}
          element={<NewContributionRoute />}
        />
        <Route
          path={routes["edit-contribution"]}
          element={<EditContributionsRoute />}
        />
        <Route
          path={routes["my-contributions"]}
          element={<MyContributionsRoute />}
        />
        <Route
          path={routes["contribution-details"]}
          element={<ContributionDetailsRoute />}
        />
        <Route
          path={routes["mc-update-contributions"]}
          element={<MCEditContributionsRoute />}
        />
        <Route
          path={routes["mm-contribution-reports"]}
          element={<MMContributionReports />}
        />
        <Route
          path={routes["mm-contributor-reports"]}
          element={<MMContributorReports />}
        />
        <Route
          path={routes["mm-contributions"]}
          element={<MMContributionsRoute />}
        />
      </Route>

      <Route path={routes["view-article"]} element={<ArticleDetailRoute />} />
    </Route>
  )
);
