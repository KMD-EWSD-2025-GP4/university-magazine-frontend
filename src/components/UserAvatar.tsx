import { AvatarProps, Avatar as MantineAvatar } from "@mantine/core";

export function UserAvatar({ name, ...props }: { name: string } & AvatarProps) {
  return (
    <MantineAvatar color="gray" radius="100%" size="xl" {...props}>
      {`${name?.split(" ")[0][0]}${name?.split(" ")?.[1]?.[0] || ""}`}
    </MantineAvatar>
  );
}
