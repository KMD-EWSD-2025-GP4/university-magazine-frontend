import { Select, SelectProps } from "@mantine/core";

type BaseSelectProps = {} & SelectProps;

export function BaseSelect(props: BaseSelectProps) {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={["React", "Angular", "Vue", "Svelte"]}
      {...props}
    />
  );
}
