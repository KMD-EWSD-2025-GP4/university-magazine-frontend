import { CalendarIcon, ReportIcon, SystemIcon, UsersIcon } from "@/icons";

export const routes = {
  login: "/",
  dashboard: "/d",
  "user-management": "/d/users",
  "academic-years": "/d/years",
  "system-parameter": "/d/system-param",
  reports: "/d/reports",
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
