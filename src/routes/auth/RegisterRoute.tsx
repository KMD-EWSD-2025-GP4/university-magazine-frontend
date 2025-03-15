import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router";
import classes from "./LoginRoute.module.css";
import { useForm, zodResolver } from "@mantine/form";
import { registerSchema, RegisterType } from "@/configs/schemas";
import { useRegister } from "./queries";
import { FacultySelect } from "@/components/select";

export function RegisterRoute() {
  const { mutate, isPending } = useRegister();

  const form = useForm<RegisterType>({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      facultyId: "",
    },
    validate: zodResolver(registerSchema),
  });

  const handleSubmit = (values: RegisterType) => {
    console.log('aaa',values)
    if (!values.email || !values.name || !values.password) {
      console.error("Form validation failed", form.errors);
      return;
    }

    mutate(values, {
      onSuccess: () => {
        console.log("Registration successful");
      },
      onError: (error) => {
        console.error("Registration failed", error);
      },
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.registerLeftPanel} />
      <div className={classes.rightPanel}>
        <Container className={classes.formContainer}>
          <Title ta="left" className={classes.title}>
            Create an Account
          </Title>
          <Paper
            mt={30}
            radius="md"
            component="form"
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <TextInput
              label="Email"
              placeholder="Enter your email"
              required
              {...form.getInputProps("email")}
              className={classes.inputField}
            />

            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              required
              mt="md"
              {...form.getInputProps("name")}
              className={classes.inputField}
            />

            <PasswordInput
              label="Password"
              placeholder="Create a password"
              required
              mt="md"
              {...form.getInputProps("password")}
              className={classes.inputField}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              required
              mt="md"
              {...form.getInputProps("confirmPassword")}
              className={classes.inputField}
            />

            <FacultySelect
              placeholder="Select Faculty"
              label="Faculty"
              {...form.getInputProps("facultyId")}
            />

            <Button
              fullWidth
              mt="xl"
              type="button"
              loading={isPending}
              className={classes.submitButton}
              onClick={() => {
                form.onSubmit(handleSubmit)();
              }}
            >
              Register
            </Button>
            <Text ta="center" mt="md" size="sm">
              Already have an account?{" "}
              <Link
                to="/"
                style={{
                  fontSize: "small",
                  color: "blue",
                  textDecoration: "none",
                }}
              >
                Login here
              </Link>
            </Text>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
