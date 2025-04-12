import {
  Button,
  Text,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Group,
  Box,
  Center,
  Stack,
} from "@mantine/core";
import { Link } from "react-router";
import { useForm, zodResolver } from "@mantine/form";
import { useLogin } from "./queries";
import { loginSchema, LoginType } from "@/configs/schemas";
import { useMediaQuery } from "@mantine/hooks";
import loginImage from "@/assets/login.png";
import { detectBrowser } from "@/utils";

function useBreakpoints() {
  return {
    isMobile: useMediaQuery("(max-width: 768px)"),
    isTablet: useMediaQuery("(min-width: 769px) and (max-width: 1024px)"),
    isDesktop: useMediaQuery("(min-width: 1025px)"),
  };
}

export function LoginRoute() {
  const form = useForm<LoginType>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();
  const handleSubmit = (values: LoginType) => {
    const browser = detectBrowser();
    mutate({ ...values, browser });
  };

  const { isMobile, isTablet } = useBreakpoints();

  const containerWidth = isMobile ? "95%" : isTablet ? 500 : 550;
  const containerHeight = isMobile ? "auto" : 550;

  return (
    <Group gap={0} h="100vh" wrap="nowrap">
      {!isMobile && (
        <Box
          style={{
            flex: 1,
            height: "100vh",
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      )}

      <Center flex={1} bg="white">
        <Container w={containerWidth} style={{ minHeight: containerHeight }}>
          <Title order={2} mb="lg" ta="left" fw={900}>
            Login Here
          </Title>

          <Paper
            component="form"
            radius="md"
            p="lg"
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ minHeight: 420 }}
          >
            <Stack gap="sm">
              <TextInput
                label="Email"
                placeholder="austin1234@gmail.com"
                required
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="**********"
                required
                {...form.getInputProps("password")}
              />

              <Button
                fullWidth
                type="submit"
                loading={isPending}
                size="md"
                radius="md"
                styles={{
                  root: {
                    backgroundColor: "#0a2240",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    height: "45px",
                  },
                }}
              >
                Login
              </Button>

              <Text size="sm" ta="center">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  style={{ color: "blue", textDecoration: "none" }}
                >
                  Register here
                </Link>
              </Text>
            </Stack>
          </Paper>
        </Container>
      </Center>
    </Group>
  );
}
