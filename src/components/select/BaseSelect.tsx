import { Select, SelectProps } from "@mantine/core";

type BaseSelectProps = { isLoading?: boolean } & SelectProps;

export function BaseSelect(props: BaseSelectProps) {
  return (
    <Select
      data={["React", "Angular", "Vue", "Svelte"]}
      {...props}
      placeholder={props.isLoading ? "loading" : props.placeholder}
      disabled={props.isLoading}
    />
  );
}
