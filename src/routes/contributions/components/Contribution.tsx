import {
  Avatar,
  Button,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { MessageIcon, ThreeDotsIcon } from "@/icons";

export function Contribution() {
  return (
    <Paper shadow="md" p="lg">
      <Stack gap="xl">
        <Group align="center" gap="lg">
          <Avatar color="gray" radius="100%" size="xl">
            PW
          </Avatar>

          <Stack gap="xs">
            <Text>User 1</Text>
            <Text>2 days ago</Text>
          </Stack>

          <Text ml="auto">2024-2025</Text>
        </Group>

        <Text>This is a contribution</Text>

        <Carousel
          withIndicators
          height={210}
          withControls={false}
          slideGap="xs"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Carousel.Slide key={index}>
              <Image
                radius="md"
                src="https://placehold.co/600x400?text=Placeholder"
                alt="Random unsplash image"
                height={210}
                width={640}
                fit="cover"
              />
            </Carousel.Slide>
          ))}
        </Carousel>

        <Group>
          <Button
            leftSection={<MessageIcon />}
            variant="light"
            flex={1}
            h="44px"
          >
            Comment
          </Button>
          <Button
            leftSection={<ThreeDotsIcon />}
            variant="light"
            flex={1}
            h="44px"
            fw={400}
          >
            More
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
