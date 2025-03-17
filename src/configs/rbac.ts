export const roles = {
  student: "student" as const,
  admin: "admin" as const,
  guest: "guest" as const,
  marketing_coordinator: "marketing_coordinator" as const,
  marketing_manager: "marketing_manager" as const,
};

export type RoleType = keyof typeof roles;
