import { RoleType } from "@/configs/rbac";
import { useUserStore } from "@/store/useUser";
import { ReactNode } from "react";

export function Can({
  roles,
  children,
}: {
  roles: RoleType[];
  children: ReactNode;
}) {
  const userRole = useUserStore((state) => state.user?.role) || "guest";

  if (roles.includes(userRole)) {
    return children;
  }

  return null;
}
