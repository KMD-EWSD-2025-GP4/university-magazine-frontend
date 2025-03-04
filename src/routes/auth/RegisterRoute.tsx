import {
  // Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Select,
} from "@mantine/core";
import { Link } from "react-router";
import classes from "./LoginRoute.module.css";
import { useForm, zodResolver } from "@mantine/form";
import { registerSchema, RegisterType } from "@/configs/schemas";
import { useRegister } from "./queries";

export function RegisterRoute() {
  const { mutate, isPending } = useRegister();

  const form = useForm<RegisterType>({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      faculty: "",
    },
    validate: zodResolver(registerSchema),
  });

  const handleSubmit = (values: RegisterType) => {
    mutate(values);
  };

  return (
    <div className={classes.wrapper}>
      {/* Left panel (gray background) */}
      <div className={classes.leftPanel} />

      {/* Right panel (register form) */}
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
              label="Username"
              placeholder="Choose a username"
              required
              mt="md"
              {...form.getInputProps("username")}
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

            <Select
              label="Choose Faculty"
              placeholder="Select your faculty"
              data={[
                { value: "computing", label: "Computing" },
                { value: "business", label: "Business" },
                { value: "engineering", label: "Engineering" },
                { value: "design", label: "Design" },
              ]}
              required
              {...form.getInputProps("faculty")}
              className={classes.inputField}
            />
            <Button
              fullWidth
              mt="xl"
              type="submit"
              loading={isPending}
              className={classes.submitButton}
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
