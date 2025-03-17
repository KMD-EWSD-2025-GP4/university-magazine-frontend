import { Anchor, Flex, Image, Text } from "@mantine/core";
import imgEmptyContribution from "@/assets/empty-contribution.png";
import { Link } from "react-router";
import { routes } from "@/configs/menus";

export function NoContribution({ mylist }: { mylist?: boolean }) {
  return (
    <Flex justify="center" direction="column" w="100%" align="center" pt="12vw">
      <Image
        src={imgEmptyContribution}
        alt="empty contribution"
        width={200}
        height={200}
        style={{
          width: "200px",
          height: "200px",
        }}
      />
      <Text fw={600} size="lg" my="sm">
        {mylist
          ? "You have no contributions yet."
          : "There are no selected contributions yet."}
      </Text>

      {mylist && (
        <Anchor
          component={Link}
          to={routes["new-contribution"]}
          underline="always"
          fw={600}
          fs="italic"
          c="#0000EE"
        >
          Create one?
        </Anchor>
      )}
    </Flex>
  );
}
