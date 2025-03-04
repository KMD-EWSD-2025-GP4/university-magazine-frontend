import { roles } from "@/configs/rbac";
import { BaseSelect } from "./BaseSelect";
import { SelectProps } from "@mantine/core";

export function RoleSelect(props: SelectProps) {
  const data = Object.values(roles).map((r) => ({
    value: r,
    label: r.charAt(0).toUpperCase() + r.slice(1),
  }));

  return <BaseSelect placeholder="Role" data={data} {...props} />;
}
