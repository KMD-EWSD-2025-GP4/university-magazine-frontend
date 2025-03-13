import { FacultySelect, RoleSelect } from "@/components/select";
import {
  updateUserSchema,
  UpdateUserType,
  userSchema,
  UserType,
} from "@/configs/schemas";
import usePrompt from "@/hooks/usePrompt";
import { RotateIcon } from "@/icons/RotateIcon";
import {
  ActionIcon,
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
  initialValues: UserType | UpdateUserType;
  handleSubmit: (data: UserType | UpdateUserType) => void;
};

export function UserForm({
  create,
  loading,
  initialValues,
  handleSubmit,
}: UserFormProps) {
  const navigate = useNavigate();
  const { onSubmit, getInputProps, isTouched } = useForm<
    UserType | UpdateUserType
  >({
    initialValues,
    validate: zodResolver(create ? userSchema : updateUserSchema),
  });

  usePrompt(isTouched());

  return (
    <Paper component="form" onSubmit={onSubmit(handleSubmit)} p="xl">
      <Text size="26px" component="h1" fw={700}>
        {create ? "New User Registration" : "Update User Information"}
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
          {...getInputProps("facultyId")}
        />

        <RoleSelect
          placeholder="Enter Role"
          label="Role"
          {...getInputProps("role")}
        />

        <TextInput
          placeholder="Enter Password"
          label="Password"
          rightSection={
            <ActionIcon
              aria-label="generate password"
              variant="subtle"
              onClick={() => {
                const password = Math.random().toString(36).slice(-8);
                getInputProps("password").onChange(password);
              }}
            >
              <RotateIcon />
            </ActionIcon>
          }
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
