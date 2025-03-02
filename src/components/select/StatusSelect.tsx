import { SelectProps } from "@mantine/core";
import { BaseSelect } from "./BaseSelect";

export function StatusSelect(props: SelectProps) {
  const data = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  return <BaseSelect placeholder="Status" data={data} {...props} />;
}
