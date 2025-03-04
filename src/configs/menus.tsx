import { CalendarIcon, ReportIcon, SystemIcon, UsersIcon } from "@/icons";

export const routes = {
  login: "/",
  dashboard: "/d",
  register: "/register",
  "user-management": "/d/users",
  "new-user": "/d/users/new",
  "academic-years": "/d/years",
  "new-academic-year": "/d/years/new",
  "system-parameter": "/d/system-param",
  reports: "/d/reports",
  contributions: "/contributions",
  "new-contribution": "/contributions/new",
  "edit-contribution": "/contributions/:id",
  "my-contributions": "/contributions/my",
};

const menus = {
  "user-management": {
    label: "User Mangement",
    icon: UsersIcon,
    href: routes["user-management"],
  },
  "acadeic-years": {
    label: "Academic Years",
    icon: CalendarIcon,
    href: routes["academic-years"],
  },
  "system-parameters": {
    label: "System Parameter",
    icon: SystemIcon,
    href: routes["system-parameter"],
  },
  reports: {
    label: "Reports",
    icon: ReportIcon,
    href: routes.reports,
  },
};

export const adminMenus = [
  menus["user-management"],
  menus["acadeic-years"],
  menus["system-parameters"],
  menus["reports"],
];

export const adminRoutes = adminMenus.map((menu) => menu.href);

export const studentRoutes = [
  routes.contributions,
  routes["my-contributions"],
  routes["new-contribution"],
  routes["edit-contribution"],
];

export const defaultRoutes = {
  admin: routes.dashboard,
  student: routes.contributions,
};

export const loginRoutes = {
  login: routes.login,
  register: routes.register,
};
