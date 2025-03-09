import { useUserStore } from "@/store/useUser";
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

type LogoutCallback = () => void;

export function handleLogout(cb?: LogoutCallback) {
  modals.openConfirmModal({
    title: "Logout",
    centered: true,
    children: <Text size="sm">Are you sure you want to logout?</Text>,
    labels: { confirm: "Logout", cancel: "Cancel" },
    confirmProps: { color: "red" },
    onConfirm: () => {
      useUserStore.getState().removeUser();
      if (cb) {
        cb();
      }
    },
  });
}
