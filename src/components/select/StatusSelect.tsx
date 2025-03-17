import { SelectProps } from "@mantine/core";
import { BaseSelect } from "./BaseSelect";

export function StatusSelect(
  props: SelectProps & { data?: { value: string; label: string }[] }
) {
  const defaultData = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  return (
    <BaseSelect
      placeholder="Status"
      {...props}
      data={props.data || defaultData}
    />
  );
}
