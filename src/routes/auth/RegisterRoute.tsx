import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Group,
  Box,
  Center,
  Stack,
} from "@mantine/core";
import { Link } from "react-router";
import { useForm, zodResolver } from "@mantine/form";
import { registerSchema, RegisterType } from "@/configs/schemas";
import { useRegister } from "./queries";
import { FacultySelect } from "@/components/select";
import { useMediaQuery } from "@mantine/hooks";
import registerImage from "@/assets/register.png";

function useBreakpoints() {
  return {
    isMobile: useMediaQuery("(max-width: 768px)"),
    isTablet: useMediaQuery("(min-width: 769px) and (max-width: 1024px)"),
    isDesktop: useMediaQuery("(min-width: 1025px)"),
  };
}

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
    mutate(values, {
      onSuccess: () => console.log("Registration successful"),
      onError: (error) => console.error("Registration failed", error),
    });
  };

  const { isMobile, isTablet } = useBreakpoints();
  const containerWidth = isMobile ? "95%" : isTablet ? 500 : 550;
  const containerHeight = isMobile ? "auto" : 580;

  return (
    <Group gap={0} h="100vh" wrap="nowrap">
      {!isMobile && (
        <Box
          style={{
            flex: 1,
            height: "100vh",
            backgroundImage: `url(${registerImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      )}

      <Center flex={1} bg="white">
        <Container w={containerWidth} style={{ minHeight: containerHeight }}>
          <Title order={2} mb="lg" ta="left" fw={900}>
            Create an Account
          </Title>

          <Paper
            mt="md"
            radius="md"
            p="lg"
            component="form"
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <Stack gap="sm">
              <TextInput
                label="Email"
                placeholder="Enter your email"
                required
                {...form.getInputProps("email")}
              />

              <TextInput
                label="Full Name"
                placeholder="Enter your full name"
                required
                {...form.getInputProps("name")}
              />

              <PasswordInput
                label="Password"
                placeholder="Create a password"
                required
                {...form.getInputProps("password")}
              />

              <PasswordInput
                label="Confirm Password"
                placeholder="Re-enter your password"
                required
                {...form.getInputProps("confirmPassword")}
              />

              <FacultySelect
                label="Faculty"
                placeholder="Select Faculty"
                {...form.getInputProps("facultyId")}
              />

              <Button
                fullWidth
                mt="xl"
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
                Register
              </Button>

              <Text size="sm" ta="center">
                Already have an account?{" "}
                <Link to="/" style={{ color: "blue", textDecoration: "none" }}>
                  Login here
                </Link>
              </Text>
            </Stack>
          </Paper>
        </Container>
      </Center>
    </Group>
  );
}
