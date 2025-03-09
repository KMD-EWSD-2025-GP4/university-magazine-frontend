import { apiClient } from "@/configs/apiClient";
import { LoginResponseType, LoginType } from "@/configs/schemas";

export function login(data: LoginType) {
  return apiClient.post<LoginResponseType>("/user/login", data);
}
