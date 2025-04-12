import {
  Flex,
  Image,
  Paper,
  Skeleton,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useGetMostViewedContributions } from "../queries";
import { trophyImages } from "@/configs/constants";

type ItemType = {
  id: string;
  title: string;
  viewCount: number;
  status: string;
  studentName: string;
  facultyName: string;
  academicYear: string;
};

export function MostViewPages() {
  const { data, isPending } = useGetMostViewedContributions();

  return (
    <Paper shadow="md" p="md" radius="md">
      <Table verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Text size="xl" fw={700}>
                Most viewed pages
              </Text>
            </Table.Th>
            <Table.Th>
              <Text
                size="lg"
                fw={600}
                style={{
                  textWrap: "nowrap",
                }}
              >
                View Count
              </Text>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {isPending &&
            Array.from({ length: 5 }).map((_, i) => (
              <Table.Tr key={i}>
                <Table.Td>
                  <SkeletonNameCard />
                </Table.Td>
                <Table.Td>
                  <Skeleton height={28} />
                </Table.Td>
              </Table.Tr>
            ))}

          {data?.map((item: ItemType, i: number) => (
            <Table.Tr key={item.id}>
              <Table.Td>
                <NameCell item={item} index={i} />
              </Table.Td>
              <Table.Td>
                <Text ta="center">{item.viewCount}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}

function NameCell({ item, index }: { item: ItemType; index: number }) {
  const imageSrc = (() => {
    if (index === 0) {
      return trophyImages.gold;
    }
    if (index === 1) {
      return trophyImages.silver;
    }
    if (index === 2) {
      return trophyImages.bronze;
    }

    return trophyImages.metal;
  })();
  return (
    <Flex gap="md" align="center">
      <Flex w={28} justify="center">
        <Image
          width={280}
          height={28}
          alt=""
          src={imageSrc}
          style={{
            width: "28px",
          }}
        />
      </Flex>
      <Text>#{index + 1}</Text>

      <Stack gap={0}>
        <Text lineClamp={1}>{item.title}</Text>
        <Text size="xs">{item.studentName}</Text>
      </Stack>
    </Flex>
  );
}

function SkeletonNameCard() {
  return (
    <Flex gap="md" align="center">
      <Skeleton w={40} h={28} />
      <Skeleton w={40} h={28} />

      <Stack gap={"sm"}>
        <Skeleton w={200} h={14} />
        <Skeleton w={200} h={12} />
      </Stack>
    </Flex>
  );
}
