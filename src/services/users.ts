import { apiClient } from "@/configs/apiClient";
import { GetUserResponseType, UserType } from "@/configs/schemas";

export function getUsers() {
  return apiClient.get<GetUserResponseType>("/user?email=student3@gmail.com");
}

export function createUser(data: UserType) {
  return apiClient.post("/users?email=student3@gmail.com", data);
}
