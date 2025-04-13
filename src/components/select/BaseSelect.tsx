import { Select, SelectProps } from "@mantine/core";

type BaseSelectProps = { isLoading?: boolean } & SelectProps;

export function BaseSelect({ isLoading, ...rest }: BaseSelectProps) {
  return (
    <Select
      data={["React", "Angular", "Vue", "Svelte"]}
      {...rest}
      placeholder={isLoading ? "loading" : rest.placeholder}
      disabled={isLoading}
    />
  );
}
