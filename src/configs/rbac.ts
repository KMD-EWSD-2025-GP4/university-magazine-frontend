export const roles = {
  student: "student",
  admin: "admin",
  guest: "guest",
  // marketing_coordinator: "marketing_coordinator",
  // marketing_manager: "marketing_manager",
};

export type RoleType = keyof typeof roles;
