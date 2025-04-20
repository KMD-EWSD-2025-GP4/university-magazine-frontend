import { roles, roleLabels } from "@/configs/rbac";
import { BaseSelect } from "./BaseSelect";
import { SelectProps } from "@mantine/core";

export function RoleSelect(props: SelectProps) {
  const data = Object.values(roles).map((r) => ({
    value: r,
    label: roleLabels[r],
  }));

  return <BaseSelect placeholder="Role" data={data} {...props} />;
}
