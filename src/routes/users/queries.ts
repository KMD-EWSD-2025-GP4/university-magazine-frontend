import { usersKeys } from "@/configs/query-keys";
import { UserType } from "@/configs/schemas";
import { createUser, getUser, getUsers } from "@/services/users";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: (data: UserType) => createUser(data),
    onSuccess: (res) => {
      console.log(res.data);
    },
  });
}

export function useUpdateUser() {}
