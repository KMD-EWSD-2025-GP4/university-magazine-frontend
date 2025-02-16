import { useUserStore } from "@/store/useUser";
import { Button, Title } from "@mantine/core";
import { useNavigate } from "react-router";

export function DashboardRoute() {
  const { removeUser } = useUserStore();
  const navigate = useNavigate();

  return (
    <div>
      <Title>Dashboard Route </Title>
      <Button
        onClick={() => {
          removeUser();
          navigate("/");
        }}
      >
        Log out
      </Button>
    </div>
  );
}
