import { apiClient } from "@/configs/apiClient";
import {
  GetUserResponseType,
  GetUsersResponseType,
  UpdateUserType,
  UserType,
} from "@/configs/schemas";

export function getUsers() {
  return apiClient.get<GetUsersResponseType>("/user");
}

export function getUser(id: string) {
  return apiClient.get<GetUserResponseType>(`/user/${id}`);
}

export function createUser(data: UserType) {
  return apiClient.post("/admin/user", data);
}

export function updateUser(data: UpdateUserType) {
  return apiClient.put("/admin/user", data);
}
