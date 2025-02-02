import { apiClient } from "@/configs/apiClient";

export function login(data: Record<string, unknown>) {
  return apiClient.post("/auth/login", data);
}
