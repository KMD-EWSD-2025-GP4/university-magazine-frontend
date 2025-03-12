import { routes } from "@/configs/menus";
import { PlusIcon, ListIcon } from "@/icons";
import { useUserStore } from "@/store/useUser";
import { handleLogout } from "@/utils/auth";
import { Box, Button, Container, Flex, Paper, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";

export function NewFeedLayout() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

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

      <Paper
        py="md"
        px="20px"
        pos="sticky"
        top={0}
        style={{ zIndex: 100 }}
        shadow="md"
      >
        <Flex align="center" gap="md">
          <Box>
            <Text component="span">{user?.facultyName?.slice(0, 10)} </Text>
            <Text fw={600} fs="italic" component="div">
              {user?.facultyName?.slice(10)}
            </Text>
          </Box>

          {location.pathname === routes["my-contributions"] ? (
            <Button
              variant="outline"
              ml="auto"
              w={220}
              leftSection={<ListIcon />}
              component={NavLink}
              to={routes.contributions}
            >
              All Contributions
            </Button>
          ) : (
            <>
              <Button
                variant="filled"
                color="primary"
                ml="auto"
                w={220}
                leftSection={<PlusIcon />}
                component={NavLink}
                to={routes["new-contribution"]}
              >
                Add Contribution
              </Button>
              <Button
                variant="outline"
                w={220}
                leftSection={<ListIcon />}
                component={NavLink}
                to={routes["my-contributions"]}
              >
                My Contribution
              </Button>
            </>
          )}
        </Flex>
      </Paper>

      <Container size="xl">
        <Outlet />
      </Container>
    </div>
  );
}
