import { apiClient } from "@/configs/apiClient";

export function getUsers() {
  return apiClient.get("/users");
}
