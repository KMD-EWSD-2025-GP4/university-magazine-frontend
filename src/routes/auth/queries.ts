import { LoginType, RegisterType } from "@/configs/schemas";
import { routes } from "@/configs/menus";
import { roles, RoleType } from "@/configs/rbac";
import { login, register } from "@/services/auth";
import { useUserStore } from "@/store/useUser";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useLogin() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginType & { browser: string }) => login(data),
    onSuccess: (res) => {
      showNotification({
        title: "Login Success!",
        message: "You have successfully logged in.",
      });
      setUser({
        userId: res.data.user.id,
        username: res.data.user.name,
        role: res.data.user.role as RoleType,
        token: res.data.token,
        email: res.data.user.email,
        facultyName: res.data.user.facultyName,
        firstTimeLogin: res.data.user.firstTimeLogin,
        lastLogin: res.data.user.lastLogin,
      });
      if (res.data.user.role === roles.admin) {
        navigate(routes["user-management"]);
        return;
      }
      navigate("/d");
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterType) => register(data),
    onSuccess: () => {
      showNotification({
        title: "Registration Successful!",
        message: "You have successfully registered.",
      });
      navigate("/d");
    },
    onError: (error) => {
      const errorMessage =
        // @ts-ignore
        error.response?.data?.error?.message ||
        "Something went wrong. Please try again.";
      showNotification({
        title: "Registration Failed",
        message: errorMessage,
        color: "red",
      });
    },
  });
}
