import { defaultRoutes, routes } from "@/configs/menus";
import { PlusIcon, ListIcon, LogoutIcon } from "@/icons";
import { useUserStore } from "@/store/useUser";
import { handleLogout } from "@/utils/auth";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import iconLogo from "@/assets/logo.png";
import { roles } from "@/configs/rbac";
import { Can } from "@/components/core";
import { HeaderAcademicYearSelect } from "@/components/HeaderAcademicYearSelect";

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
        <Flex w="100%" align="center" justify="space-between">
          <Box py="20px">
            <Link to={defaultRoutes[user?.role || ""]}>
              <Image src={iconLogo} width={209} height={58} alt="logo" />
            </Link>
          </Box>

          <Stack gap="xs" align="end">
            <Text c="white" opacity={0.8} size="sm">
              Welcome “{user?.username}” from University Magazine Portal !{" "}
            </Text>

            <Button
              leftSection={
                <Box
                  style={{
                    transform: "rotateY(180deg)",
                  }}
                >
                  <LogoutIcon stroke="#FFF" width={20} />
                </Box>
              }
              variant="transparent"
              color="white"
              td="underline"
              size="sm"
              onClick={() => {
                handleLogout(() => {
                  navigate("/");
                  showNotification({
                    title: "Logout Success!",
                    message: "You have successfully logged out.",
                  });
                });
              }}
            >
              Logout
            </Button>
          </Stack>
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
            <Can
              roles={[roles.student, roles.marketing_coordinator, roles.guest]}
            >
              <Text component="span">{user?.facultyName?.slice(0, 10)} </Text>
              <Text fw={600} fs="italic" component="div">
                {user?.facultyName?.slice(10)}
              </Text>
            </Can>
          </Box>

          <Can roles={[roles.student]}>
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

            {location.pathname === routes["my-contributions"] ? (
              <Button
                variant="outline"
                w={220}
                leftSection={<ListIcon />}
                component={NavLink}
                to={routes.contributions}
              >
                All Contributions
              </Button>
            ) : (
              <Button
                variant="outline"
                w={220}
                leftSection={<ListIcon />}
                component={NavLink}
                to={routes["my-contributions"]}
              >
                My Contribution
              </Button>
            )}
          </Can>

          <Can roles={[roles.marketing_manager]}>
            <HeaderAcademicYearSelect />
          </Can>
        </Flex>
      </Paper>

      <Container size="xl">
        <Outlet />
      </Container>
    </div>
  );
}
