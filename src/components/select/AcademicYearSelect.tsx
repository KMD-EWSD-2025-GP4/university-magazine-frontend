import { BaseSelect } from "./BaseSelect";
import { SelectProps } from "@mantine/core";
import { useGetAcademicYears } from "@/routes/academic-years/queries";
import { formatAcademicYear } from "@/utils/dates";

export function AcademicYearSelect(props: SelectProps) {
  const { data, isLoading } = useGetAcademicYears();

  const normalizedData = data?.map((ay) => ({
    label: `${formatAcademicYear(ay.startDate)} - ${formatAcademicYear(
      ay.endDate
    )}`,
    value: ay.id,
  }));

  return (
    <BaseSelect
      isLoading={isLoading}
      placeholder="Academic Year"
      data={normalizedData}
      w="240px"
      {...props}
    />
  );
}
