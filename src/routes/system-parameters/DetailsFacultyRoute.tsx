import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Button,
  Container,
  Flex,
  Group,
  Loader,
  Radio,
  Stack,
  Text,
  TextInput,
  Title,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { useGetFacultyById, useUpdateFaculty, useCreateFaculty } from "./queries";


interface FacultyFormValues {
  name: string;
  status: string;
}

export function DetailsFacultyRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id !== "new";

  const { data: faculty, isLoading, isError } = useGetFacultyById(id!, {
    enabled: isEditMode,
  });

  const updateFacultyMutation = useUpdateFaculty();
  const createFacultyMutation = useCreateFaculty();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FacultyFormValues>({
    defaultValues: { name: "", status: "" },
  });




  // Populate form if editing
  useEffect(() => {
    
    if (isEditMode && faculty) {
      setValue("name", faculty.name);
      setValue("status", faculty.status?.toLowerCase() === "active" ? "active" : "inactive");
    }
  }, [faculty, isEditMode, setValue]);



  const onSubmit = async (data: FacultyFormValues) => {
    try {
      const formattedData = { ...data, status: data.status };

      if (isEditMode) {
        await updateFacultyMutation.mutateAsync({ id: id!, ...formattedData });
        showNotification({ title: "Success", message: "Faculty updated successfully", color: "green" });
      } else {
        await createFacultyMutation.mutateAsync(formattedData);
        showNotification({ title: "Success", message: "New Faculty created successfully", color: "green" });
      }


      navigate(-1);
    } catch (error) {
      console.error("Error updating faculty:", error);
      showNotification({ title: "Error", message: "Something went wrong", color: "red" });
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <Text color="red">Error loading faculty data.</Text>;

  return (
    <Container size="sm" mt="lg">
      {/* Breadcrumbs */}
      <Breadcrumbs mb="md">
        <Anchor component={Link} to="/d/system-param/faculty">Faculty List</Anchor>
        <Text>{isEditMode ? "Faculty Details" : "New Faculty"}</Text>
      </Breadcrumbs>

      <Title order={2} mb="md">{isEditMode ? "Detail Faculty" : "Add Faculty"}</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Faculty Name"
            placeholder="Enter Faculty Name"
            {...register("name", { required: "Faculty name is required" })}
            error={errors.name?.message}
          />

          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Radio.Group label="Status" value={field.value} onChange={field.onChange}>
                <Flex gap="md">
                  <Radio value="active" label="Active" />
                  <Radio value="inactive" label="Inactive" />
                </Flex>
              </Radio.Group>
            )}
          />
          {errors.status && <Text color="red">{errors.status.message}</Text>}

          <Group mt="lg" justify="flex-end">
            <Button variant="default" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" style={{ backgroundColor: "#0A284B", color: "white" }}>
              {isEditMode ? "Update" : "Create"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}
