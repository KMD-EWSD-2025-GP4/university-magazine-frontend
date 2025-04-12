import {
  CalendarIcon,
  ReportIcon,
  SystemIcon,
  UsersIcon,
  MCContributionIcon,
  ChartIcon,
  DatabaseIcon,
  HistogramIcon,
} from "@/icons";
import { roles } from "./rbac";

export const routes = {
  login: "/",
  dashboard: "/d",
  register: "/register",
  "user-management": "/d/users",
  "new-user": "/d/users/new",
  "edit-user": "/d/users/:id",
  "academic-years": "/d/years",
  "new-academic-year": "/d/years/new",
  "edit-academic-year": "/d/years/:id",
  "system-parameter": "/d/system-param/faculty",
  "details-faculty": "/d/system-param/faculty/:id",
  "new-faculty": "/d/system-param/faculty/new",
  "terms-conditions": "/d/system-param/term&Conditions",
  reports: "/d/reports",
  contributions: "/contributions",
  "new-contribution": "/contributions/new",
  "edit-contribution": "/contributions/:id/edit",
  "my-contributions": "/contributions/my",
  "contribution-details": "/contributions/:id",
  "mc-contributions": "/d/mc-contributions",
  "mc-update-contributions": "/d/mc-contributions/:id",
  "view-article": "/docs",
  "guest-report": "/d/guest-report",
  "data-insights": "/d/contributions-report/data-insights",
  "visual-data-reports": "/d/contributions-report/visual-data-reports",
  "mm-contributions": "/mm-contributions",
  "mm-contribution-reports": "/contributions-report",
  "mm-contributor-reports": "/contributors-report",
};

export const menus = {
  /**
   * admin
   */
  "user-management": {
    label: "User Management",
    icon: UsersIcon,
    href: routes["user-management"],
    submenus: [],
  },
  "academic-years": {
    label: "Academic Years",
    icon: CalendarIcon,
    href: routes["academic-years"],
    submenus: [],
  },
  "system-parameters": {
    label: "System Parameter",
    icon: SystemIcon,
    href: "/d/system-param",
    submenus: [
      {
        label: "Faculty",
        href: "/d/system-param/faculty",
      },
      {
        label: "Terms & Conditions",
        href: "/d/system-param/term&Conditions",
      },
    ],
  },
  reports: {
    label: "Reports",
    icon: ReportIcon,
    href: routes.reports,
    submenus: [],
  },

  /**
   * marketing coordinator
   */

  "guest-report": {
    label: "Guest Report",
    icon: ReportIcon,
    href: routes["guest-report"],
    submenus: [],
  },
  "contribution-report": {
    label: "Contributions",
    icon: ChartIcon,
    href: "/d/contributions-report",
    submenus: [
      {
        label: "Data Insights",
        href: routes["data-insights"],
        icon: DatabaseIcon,
      },
      {
        label: "Visual Data Reports",
        href: routes["visual-data-reports"],
        icon: HistogramIcon,
      },
    ],
  },
  "mc-contribution": {
    label: "All Contribution",
    icon: MCContributionIcon,
    href: routes["mc-contributions"],
    submenus: [],
  },

  /**
   * route label for breadcrumbs
   */
  "new-user": {
    label: "New User",
    href: routes["new-user"],
    submenus: [],
  },
  "edit-user": {
    label: "Edit User",
    href: routes["edit-user"],
    submenus: [],
  },
  "new-faculty": {
    label: "New Faculty",
    href: routes["new-faculty"],
    submenus: [],
  },
  "edit-faculty": {
    label: "Edit Faculty",
    href: routes["details-faculty"],
    submenus: [],
  },
  "system-param": {
    label: "System Parameter",
    href: routes["system-parameter"],
    submenus: [],
  },

  "new-academic-year": {
    label: "New Academic Year",
    href: routes["new-academic-year"],
    submenus: [],
  },
  "edit-academic-year": {
    label: "Edit Academic Year",
    href: routes["edit-academic-year"],
    submenus: [],
  },
};

export const adminMenus = [
  menus["user-management"],
  menus["academic-years"],
  menus["system-parameters"],
  menus["reports"],
];

export const mcMenus = [
  menus["guest-report"],
  menus["contribution-report"],
  menus["mc-contribution"],
];

export const adminRoutes = [
  routes["user-management"],
  routes["edit-user"],
  routes["academic-years"],
  routes["system-parameter"],
  routes.reports,
  routes["terms-conditions"],
  routes["details-faculty"],
  routes["new-academic-year"],
  routes["edit-academic-year"],
  routes["new-user"],
  routes["new-faculty"],
  routes["view-article"],
];

export const studentRoutes = [
  routes.contributions,
  routes["my-contributions"],
  routes["new-contribution"],
  routes["edit-contribution"],
  routes["contribution-details"],
  routes["view-article"],
];

export const marketingCoordinatorRoutes = [
  routes["mc-contributions"],
  routes["mc-update-contributions"],
  routes["view-article"],
];

export const marketingManagerRoutes = [
  routes["mm-contributions"],
  routes["mc-update-contributions"],
  routes["view-article"],
  routes["mm-contribution-reports"],
  routes["mm-contributor-reports"],
];

export const defaultRoutes = {
  [roles.admin]: routes["user-management"],
  [roles.student]: routes.contributions,
  [roles.guest]: routes.contributions,
  [roles.marketing_coordinator]: routes["mc-contributions"],
  [roles.marketing_manager]: routes["mm-contributions"],
  "": routes.login,
};

export const loginRoutes = {
  login: routes.login,
  register: routes.register,
};
