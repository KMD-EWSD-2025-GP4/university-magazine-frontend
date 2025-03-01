import { apiClient } from "@/configs/apiClient";
import { UserType } from "@/configs/schemas";

export function getUsers() {
  return apiClient.get("/users");
}

export function createUser(data: UserType) {
  return apiClient.post("/users", data);
}
