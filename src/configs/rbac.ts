export const roles = {
  student: "student" as const,
  admin: "admin" as const,
  guest: "guest" as const,
  marketing_coordinator: "marketing_coordinator" as const,
  marketing_manager: "marketing_manager" as const,
};

export const roleLabels = {
  [roles.student]: "Student",
  [roles.admin]: "Admin",
  [roles.guest]: "Guest",
  [roles.marketing_coordinator]: "Marketing Coordinator",
  [roles.marketing_manager]: "Marketing Manager",
};

export type RoleType = keyof typeof roles;
