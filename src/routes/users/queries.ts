import { usersKeys } from "@/configs/query-keys";
import { UserType } from "@/configs/schemas";
import { createUser, getUsers } from "@/services/users";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetUsers() {
  return useQuery({
    queryKey: usersKeys.lists(),
    queryFn: getUsers,
    select: (res) => res.data,
  });
}

export function useCreateUsers() {
  return useMutation({
    mutationFn: (data: UserType) => createUser(data),
    onSuccess: (res) => {
      console.log(res.data);
    },
  });
}
