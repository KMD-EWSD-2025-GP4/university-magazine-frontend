/**
 * TODO
 * - make this contribution component as base component
 * - and create a new component for diff detailed contribution
 */

import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Group,
  Image,
  Menu,
  Paper,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import {
  ChevronDownIcon,
  MessageIcon,
  PlaneIcon,
  ThreeDotsIcon,
} from "@/icons";
import { ContributionDetailType } from "@/configs/schemas";
import { formatRelativeTime } from "@/utils/dates";
import { Can } from "@/components/core";
import { roles } from "@/configs/rbac";
import { Link, useNavigate } from "react-router";
import { ExportIcon } from "@/icons";
import { useUserStore } from "@/store/useUser";
import { modals } from "@mantine/modals";
import { UserAvatar } from "@/components/UserAvatar";
import { useMemo, useRef, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { contributionStatusColors } from "@/configs/constants";

export function Contribution({
  authored,
  contribution,
  detailed,
  onUpdate,
  loading,
  onComment,
  commenting,
}: {
  contribution: ContributionDetailType;
  authored?: boolean;
  detailed?: boolean;
  loading?: boolean;
  onUpdate?: (status: "selected" | "rejected") => void;
  onComment?: (comment: string) => void;
  commenting?: boolean;
}) {
  const navigate = useNavigate();
  const [showComment, setShowComment] = useState(false);
  const inputCommentRef = useRef<HTMLTextAreaElement>(null);
  const user = useUserStore((state) => state.user);

  const images = contribution?.assets?.filter((a) => a.type === "image") || [];
  const articles =
    contribution?.assets.filter((a) => a.type === "article") || [];

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

  const handleComment = (comment: string) => {
    const commentTrimmed = comment.trim();
    if (!commentTrimmed) {
      showNotification({
        title: "Warning",
        message: "Please enter a comment before submitting.",
        color: "yellow",
      });
      return;
    }

    if (!(contribution.comments.length > 0) && user?.role === roles.student) {
      showNotification({
        title: "Warning",
        message: "Student cannot start comments.",
        color: "yellow",
      });
      return;
    }

    onComment?.(comment);
    inputCommentRef.current!.value = "";
  };

  const handleViewArticle = () => {
    const fileUrl = articles[0].url;
    const encodedFileName = encodeURIComponent(fileUrl);
    navigate("/docs?url=" + encodedFileName);
  };

  const enabledComment = useMemo(() => {
    if (!detailed) {
      return false;
    }

    if (user?.role === roles.marketing_coordinator) {
      return true;
    }

    if (authored) {
      return true;
    }

    return false;
  }, [authored, detailed, user?.role]);

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
              color={contributionStatusColors[contribution.status || ""]}
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
              leftSection={<ExportIcon />}
              w="240px"
              variant="transparent"
              color="dark"
              justify="start"
              ta="start"
              pl={0}
              onClick={handleViewArticle}
            >
              View article file
            </Button>

            {enabledComment && (
              <Button
                onClick={() => setShowComment((p) => !p)}
                rightSection={
                  <div
                    style={{
                      transform: showComment
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                    }}
                  >
                    <ChevronDownIcon />
                  </div>
                }
                variant="transparent"
                pl={0}
                ta="start"
                justify="start"
              >
                {contribution.comments.length || 0} comment
                {contribution.comments?.length > 1 ? "s" : ""}
              </Button>
            )}

            {showComment && (
              <Stack>
                {contribution.comments?.map((comment) => (
                  <Group align="start" gap={0} key={comment.createdAt} w="100%">
                    <UserAvatar name={comment.by || ""} size="md" mr="md" />
                    <Stack
                      bg="gray.1"
                      p="md"
                      style={{
                        borderRadius: "8px",
                      }}
                      flex={1}
                      gap={0}
                    >
                      <Group justify="space-between" flex={1}>
                        <Text fw={600}>{comment.by}</Text>
                        <Text>{formatRelativeTime(comment.createdAt)}</Text>
                      </Group>
                      <Text>{comment.content}</Text>
                    </Stack>
                  </Group>
                ))}
              </Stack>
            )}
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
                {authored && contribution.status !== "selected" && (
                  <Menu.Item
                    component={Link}
                    to={`/contributions/${contribution.id}/edit`}
                  >
                    Update Contribution
                  </Menu.Item>
                )}

                <Menu.Item
                  component={Link}
                  to={`/contributions/${contribution.id}`}
                >
                  View Contribution
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        )}

        {enabledComment && (
          <>
            <Group align="start" gap={0} px="md">
              <UserAvatar name={user?.username || ""} size="md" mr="md" />
              <Textarea
                placeholder="Write a comment"
                flex={1}
                minRows={2}
                ref={inputCommentRef}
              />
              <ActionIcon
                disabled={commenting}
                aria-label="Send"
                variant="subtle"
                w={"52px"}
                h={"52px"}
                p={"sm"}
                radius={"100%"}
                ml="xs"
                onClick={() => {
                  handleComment(inputCommentRef.current?.value || "");
                }}
              >
                <PlaneIcon />
              </ActionIcon>
            </Group>
            {user?.role !== "student" && (
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
            )}
          </>
        )}
      </Stack>
    </Paper>
  );
}
