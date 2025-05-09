import {
  Box,
  Flex,
  Group,
  Image,
  Paper,
  Skeleton,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useGetMostActiveUsers } from "../queries";
import { trophyImages } from "@/configs/constants";
import { RoleSelect } from "@/components/select";
import { useState } from "react";

type ItemType = {
  id: string;
  email: string;
  status: string;
  totalLogins: number;
  name: string;
  facultyId: string;
  role: string;
};

export function MostActiveUsers() {
  const [selectedRole, setSelectedRole] = useState<string | null>();
  const { data, isPending } = useGetMostActiveUsers(selectedRole || "");

  return (
    <Paper shadow="md" p="md" radius="md">
      <Group justify="end">
        <RoleSelect
          value={selectedRole}
          onChange={(value) => setSelectedRole(value)}
        />
      </Group>
      <Table verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Text size="xl" fw={700}>
                Most active users
              </Text>
            </Table.Th>
            <Table.Th>
              <Text size="lg" fw={600}>
                Login Count
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
                <Text ta="center">{item.totalLogins}</Text>
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
        <Text>{item.name}</Text>
        <Box
          w="fit-content"
          px="sm"
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: "4px",
          }}
        >
          <Text size="xs" ta="center" w="fit-content" tt="capitalize">
            {item.role.split("_").join(" ")}
          </Text>
        </Box>
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
