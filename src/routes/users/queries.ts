import { routes } from "@/configs/menus";
import { usersKeys } from "@/configs/query-keys";
import { UpdateUserType, UserType } from "@/configs/schemas";
import { createUser, getUser, getUsers, updateUser } from "@/services/users";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useGetUsers() {
  return useQuery({
    queryKey: usersKeys.lists(),
    queryFn: getUsers,
    select: (res) => res.data,
  });
}

export function useGetUser(id: string) {
  return useQuery({
    queryKey: usersKeys.list(id),
    queryFn: () => getUser(id),
    select: (res) => res.data,
    enabled: !!id,
  });
}

export function useCreateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserType) => createUser(data),
    onSuccess: (res) => {
      showNotification({
        title: "Success",
        message: res?.data?.message || "User created successfully",
      });
      queryClient.invalidateQueries({
        queryKey: usersKeys.lists(),
      });
      navigate(routes["user-management"]);
    },
  });
}

export function useUpdateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserType) => updateUser(data),
    onSuccess: (res) => {
      showNotification({
        title: "Success",
        message: res?.data?.message || "User updated successfully",
      });
      queryClient.invalidateQueries({
        queryKey: usersKeys.lists(),
      });
      navigate(routes["user-management"]);
    },
  });
}
