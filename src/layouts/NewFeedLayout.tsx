import { handleLogout } from "@/utils/auth";
import { Button, Container, Flex, Paper, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Outlet, useNavigate } from "react-router";

export function NewFeedLayout() {
  const navigate = useNavigate();
  return (
    <div>
      <Paper
        component="header"
        display="flex"
        px="20px"
        bg="primary"
        c="#fff"
        radius={0}
      >
        <Flex w="100%" align="center">
          <Text size="32px" fw={700} component="h1" w="8ch" py="20px">
            University Magazine
          </Text>

          <Button
            onClick={() => {
              handleLogout(() => {
                navigate("/login");
                showNotification({
                  title: "Logout Success!",
                  message: "You have successfully logged out.",
                });
              });
            }}
          >
            Logout
          </Button>
        </Flex>
      </Paper>

      <Container size="xl">
        <Outlet />
      </Container>
    </div>
  );
}
