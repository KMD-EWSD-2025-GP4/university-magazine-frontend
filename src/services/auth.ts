import { apiClient } from "@/configs/apiClient";
import { LoginResponseType, LoginType } from "@/configs/schemas";

export function login(data: LoginType) {
  console.log("data", data);
  return apiClient.post<LoginResponseType>("/api/user/login", {
    email: "admin@gmail.com",
    password: "admin",
  });
}
