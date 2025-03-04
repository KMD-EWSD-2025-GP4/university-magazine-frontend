import { apiClient } from "@/configs/apiClient";
import {
  GetUserResponseType,
  GetUsersResponseType,
  UserType,
} from "@/configs/schemas";

export function getUsers() {
  return apiClient.get<GetUsersResponseType>("/user?email=student3@gmail.com");
}

export function getUser(id: string) {
  return apiClient.get<GetUserResponseType>(`/user/${id}`);
}

export function createUser(data: UserType) {
  return apiClient.post("/users?email=student3@gmail.com", data);
}
