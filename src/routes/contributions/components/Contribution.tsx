import {
  Avatar,
  Badge,
  Button,
  Group,
  Image,
  Menu,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { ChevronDownIcon, MessageIcon, ThreeDotsIcon } from "@/icons";
import { ContributionDetailType } from "@/configs/schemas";
import { formatRelativeTime } from "@/utils/dates";
import { Can } from "@/components/core";
import { roles } from "@/configs/rbac";
import { Link } from "react-router";
import { DownloadIcon } from "@/icons";
import { useUserStore } from "@/store/useUser";
import { modals } from "@mantine/modals";

export function Contribution({
  authored,
  contribution,
  detailed,
  onUpdate,
  loading,
}: {
  contribution: ContributionDetailType;
  authored?: boolean;
  detailed?: boolean;
  loading?: boolean;
  onUpdate?: (status: "selected" | "rejected") => void;
}) {
  const user = useUserStore((state) => state.user);
  const images = contribution.assets.filter((a) => a.type === "image");

  const handleUpdateStatus = (status: "selected" | "rejected") => {
    modals.openConfirmModal({
      title: "Update Status",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to update the status of this contribution to{" "}
          <b>{status}</b>?
        </Text>
      ),
      labels: { confirm: "Yes", cancel: "No" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        onUpdate?.(status);
      },
    });
  };

  return (
    <Paper shadow={detailed ? "none" : "md"} p="lg">
      <Stack gap="xl">
        <Group align="center" gap="lg">
          <Avatar color="gray" radius="100%" size="xl">
            {`${contribution.studentName?.split(" ")[0][0]}${
              contribution.studentName?.split(" ")?.[1]?.[0] || ""
            }`}
          </Avatar>

          <Stack gap="xs">
            <Text> {contribution.studentName || "Default"}</Text>
            <Text>{formatRelativeTime(contribution.submissionDate)}</Text>
          </Stack>

          {authored ? (
            <Badge
              ml="auto"
              color={contribution.status === "pending" ? "yellow" : "green"}
              tt="capitalize"
              fw={400}
            >
              {contribution.status}
            </Badge>
          ) : (
            <Text ml="auto">{contribution.academicYear || "2025-2026"}</Text>
          )}
        </Group>

        <Text>{contribution.description}</Text>

        <Carousel
          withIndicators
          height={210}
          withControls={false}
          slideGap="xs"
        >
          {images.map((image) => (
            <Carousel.Slide key={image.id}>
              <Image
                radius="md"
                src={image.url}
                alt=""
                height={210}
                width={640}
                fit="cover"
              />
            </Carousel.Slide>
          ))}
        </Carousel>

        {detailed ? (
          <Stack>
            <Button
              leftSection={<DownloadIcon />}
              w="240px"
              variant="transparent"
              color="dark"
              justify="start"
              ta="start"
              pl={0}
            >
              Download image files
            </Button>
            <Button
              leftSection={<DownloadIcon />}
              w="240px"
              variant="transparent"
              color="dark"
              justify="start"
              ta="start"
              pl={0}
            >
              Download article files
            </Button>

            <Button
              rightSection={<ChevronDownIcon />}
              variant="transparent"
              pl={0}
              ta="start"
              justify="start"
            >
              0 comment
            </Button>
          </Stack>
        ) : (
          <Group mt="md">
            <Can roles={[roles.marketing_coordinator]}>
              <Button
                leftSection={<MessageIcon />}
                variant="light"
                flex={1}
                h="44px"
              >
                Comment
              </Button>
            </Can>

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  leftSection={<ThreeDotsIcon />}
                  variant="light"
                  flex={1}
                  h="44px"
                  fw={400}
                >
                  More
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {authored && (
                  <Menu.Item
                    component={Link}
                    to={`/contributions/${contribution.id}/edit`}
                  >
                    Update
                  </Menu.Item>
                )}

                <Menu.Item
                  component={Link}
                  to={`/contributions/${contribution.id}`}
                >
                  View Details
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        )}

        {user?.role === roles.marketing_coordinator && (
          <>
            <Group gap="xl">
              <Button
                flex={1}
                variant="outline"
                color="dark"
                onClick={() => handleUpdateStatus("rejected")}
                disabled={loading}
              >
                Reject
              </Button>
              <Button
                flex={1}
                color="primary"
                onClick={() => handleUpdateStatus("selected")}
                disabled={loading}
              >
                Select
              </Button>
            </Group>
          </>
        )}
      </Stack>
    </Paper>
  );
}
