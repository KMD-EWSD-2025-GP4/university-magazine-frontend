import { academicYearsSchema, AcademicYearType } from "@/configs/schemas";
import usePrompt from "@/hooks/usePrompt";
import { CalendarIcon2 } from "@/icons";
import { Button, Group, Paper, Radio, SimpleGrid, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "react-router";

type AcademicYearProps = {
  create?: boolean;
  loading: boolean;
  initialValues: AcademicYearType;
  handleSubmit: (data: AcademicYearType) => void;
};

export function AcademicYearForm({
  create,
  loading,
  initialValues,
  handleSubmit,
}: AcademicYearProps) {
  const navigate = useNavigate();
  const { onSubmit, getInputProps, isDirty, resetDirty } = useForm({
    initialValues,
    validate: zodResolver(academicYearsSchema),
  });

  usePrompt(isDirty());

  return (
    <Paper
      component="form"
      onSubmit={onSubmit((data) => {
        resetDirty();
        handleSubmit(data);
      })}
      p="xl"
    >
      <Text size="26px" component="h1" fw={700}>
        {create ? "New" : "Update"} Academic Years Registration
      </Text>

      <SimpleGrid cols={2} mt={48} verticalSpacing={48} spacing={48}>
        <DatePickerInput
          clearable
          label="Start Date"
          placeholder="Start Date"
          maxDate={getInputProps("endDate").value}
          leftSection={<CalendarIcon2 size={18} />}
          {...getInputProps("startDate")}
        />
        <DatePickerInput
          clearable
          label="End Date"
          minDate={getInputProps("startDate").value}
          placeholder="End Date"
          leftSection={<CalendarIcon2 size={18} />}
          {...getInputProps("endDate")}
        />
        <DatePickerInput
          clearable
          label="New Closure Date"
          maxDate={getInputProps("finalClosureDate").value}
          placeholder="New Closure Date"
          leftSection={<CalendarIcon2 size={18} />}
          {...getInputProps("newClosureDate")}
        />
        <DatePickerInput
          clearable
          label="Final Closure Date"
          minDate={getInputProps("newClosureDate").value}
          placeholder="Final Closure Date"
          leftSection={<CalendarIcon2 size={18} />}
          {...getInputProps("finalClosureDate")}
        />

        <Radio.Group label="Status" {...getInputProps("status")}>
          <Group mt="xs">
            <Radio value="active" label="Active" />
            <Radio value="inactive" label="Deactivate" />
          </Group>
        </Radio.Group>
      </SimpleGrid>

      <Group align="center" mt={48} justify="end">
        <Button w={270} onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button color="primary.4" w={270} loading={loading} type="submit">
          {create ? "Add" : "Update"}
        </Button>
      </Group>
    </Paper>
  );
}
