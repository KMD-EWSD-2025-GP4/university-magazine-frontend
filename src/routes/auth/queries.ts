import { LoginType, RegisterType } from "@/configs/schemas";
import { routes } from "@/configs/menus";
import { roles, RoleType } from "@/configs/rbac";
import { login } from "@/services/auth";
import { useUserStore } from "@/store/useUser";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useLogin() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginType) => login(data),
    onSuccess: (res) => {
      showNotification({
        title: "Login Success!",
        message: "You have successfully logged in.",
      });
      setUser({
        username: res.data.user.name,
        role: res.data.user.role as RoleType,
        token: res.data.token,
        email: res.data.user.email,
        facultyName: res.data.user.facultyName,
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
    mutationFn: async (data: RegisterType) => {
      //const response = await axios.post("/api/register", data);
      return data;
    },
    onSuccess: () => {
      showNotification({
        title: "Registration Successful!",
        message: "You have successfully registered.",
      });
      navigate("/d");
    },
    onError: (error) => {
      showNotification({
        title: "Registration Failed",
        message: error.message,
        color: "red",
      });
    },
  });
}
