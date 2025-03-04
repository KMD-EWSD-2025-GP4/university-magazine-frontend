import { Container, Paper, Text } from "@mantine/core";
import { Outlet } from "react-router";

export function NewFeedLayout() {
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
        <Text size="32px" fw={700} component="h1" w="8ch" py="20px">
          University Magazine
        </Text>
      </Paper>

      <Container size="xl">
        <Outlet />
      </Container>
    </div>
  );
}
