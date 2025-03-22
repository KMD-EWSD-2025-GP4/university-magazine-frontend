import {
  Button,
  Text,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router";
import classes from "./LoginRoute.module.css";
import { useLogin } from "./queries";
import { useForm, zodResolver } from "@mantine/form";
import { loginSchema, LoginType } from "@/configs/schemas";

export function LoginRoute() {
  const { getInputProps, onSubmit, key } = useForm<LoginType>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });
  const { mutate, isPending } = useLogin();

  const handleSubmit = (values: LoginType) => {
    mutate(values);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.leftPanel} />

      <div className={classes.rightPanel}>
        <Container className={classes.formContainer}>
          <Title ta="left" className={classes.title}>
            LOGIN HERE
          </Title>
          <Paper radius="md" component="form" onSubmit={onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="example@gmail.com"
              required
              key={key("email")}
              {...getInputProps("email")}
              className={classes.inputField}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              key={key("password")}
              {...getInputProps("password")}
              className={classes.inputField}
            />

            {/* <Group justify="space-between" align="center" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group> */}

            <Button
              fullWidth
              mt="xl"
              type="submit"
              loading={isPending}
              className={classes.submitButton}
            >
              Login
            </Button>

            <Text ta="center" mt="md" size="sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  fontSize: "small",
                  color: "blue",
                  textDecoration: "none",
                }}
              >
                Register here
              </Link>
            </Text>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
