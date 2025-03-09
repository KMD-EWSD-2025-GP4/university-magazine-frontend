import { BaseSelect } from "./BaseSelect";
import { SelectProps } from "@mantine/core";
import { useGetFaculties } from "./queries";

export function FacultySelect(props: SelectProps) {
  const { data: facultyData, isPending } = useGetFaculties();

  const data =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    facultyData?.map((f) => ({
      value: f.id,
      label: f.name,
    })) || [];

  return (
    <BaseSelect
      placeholder="Role"
      data={data}
      disabled={isPending}
      {...props}
    />
  );
}
