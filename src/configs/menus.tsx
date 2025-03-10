import { CalendarIcon, ReportIcon, SystemIcon, UsersIcon } from "@/icons";

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
  "terms-conditions": "/d/system-param/term&Conditions",
  reports: "/d/reports",
  contributions: "/contributions",
  "new-contribution": "/contributions/new",
  "edit-contribution": "/contributions/:id",
  "my-contributions": "/contributions/my",
};

const menus = {
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
    href: "",
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
};

export const adminMenus = [
  menus["user-management"],
  menus["academic-years"],
  menus["system-parameters"],
  menus["reports"],
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
];

export const studentRoutes = [
  routes.contributions,
  routes["my-contributions"],
  routes["new-contribution"],
  routes["edit-contribution"],
];

export const defaultRoutes = {
  admin: routes.dashboard,
  student: routes.contributions,
  guest: routes.contributions,
};

export const loginRoutes = {
  login: routes.login,
  register: routes.register,
};
