import {
  Avatar,
  Badge,
  Button,
  Group,
  Image,
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
import { NavLink } from "react-router";
import { DownloadIcon } from "@/icons";

export function Contribution({
  authored,
  contribution,
  detailed,
}: {
  contribution: ContributionDetailType;
  authored?: boolean;
  detailed?: boolean;
}) {
  const images = contribution.assets.filter((a) => a.type === "image");
  return (
    <Paper shadow={detailed ? "none" : "md"} p="lg">
      <Stack gap="xl">
        <Group align="center" gap="lg">
          <Avatar color="gray" radius="100%" size="xl">
            {contribution.studentName || "PW"}
          </Avatar>

          <Stack gap="xs">
            <Text> {contribution.studentName || "Not implemented"}</Text>
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
            <Text ml="auto">{"not implemented"}</Text>
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

            <Button
              component={NavLink}
              to={`/contributions/${contribution.id}`}
              leftSection={<ThreeDotsIcon />}
              variant="light"
              flex={1}
              h="44px"
              fw={400}
            >
              More
            </Button>
          </Group>
        )}
      </Stack>
    </Paper>
  );
}
