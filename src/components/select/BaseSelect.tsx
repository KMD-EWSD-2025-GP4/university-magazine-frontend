import { Select, SelectProps } from "@mantine/core";

type BaseSelectProps = {} & SelectProps;

export function BaseSelect(props: BaseSelectProps) {
  return <Select data={["React", "Angular", "Vue", "Svelte"]} {...props} />;
}
