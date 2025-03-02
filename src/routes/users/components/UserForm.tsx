import { FacultySelect, RoleSelect } from "@/components/select";
import { updateUserSchema, userSchema, UserType } from "@/configs/schemas";
import {
  Button,
  Group,
  Paper,
  Radio,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "react-router";

type UserFormProps = {
  create?: boolean;
  loading: boolean;
  initialValues: UserType;
  handleSubmit: (data: UserType) => void;
};

export function UserForm({
  create,
  loading,
  initialValues,
  handleSubmit,
}: UserFormProps) {
  const navigate = useNavigate();
  const { onSubmit, getInputProps } = useForm<UserType>({
    initialValues,
    validate: zodResolver(create ? userSchema : updateUserSchema),
  });

  return (
    <Paper component="form" onSubmit={onSubmit(handleSubmit)} p="xl">
      <Text size="26px" component="h1" fw={700}>
        Users Management
      </Text>

      <SimpleGrid cols={2} mt={48} verticalSpacing={48} spacing={48}>
        <TextInput
          placeholder="Enter Name"
          label="Name"
          {...getInputProps("name")}
        />

        <TextInput
          placeholder="Enter Email"
          label="Email"
          {...getInputProps("email")}
        />

        <FacultySelect
          placeholder="Enter Faculty"
          label="Faculty"
          {...getInputProps("faculty")}
        />

        <RoleSelect
          placeholder="Enter Role"
          label="Role"
          {...getInputProps("role")}
        />

        <TextInput
          placeholder="Enter Password"
          label="Password"
          {...getInputProps("password")}
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
