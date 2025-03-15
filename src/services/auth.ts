import { apiClient } from "@/configs/apiClient";
import { LoginResponseType, LoginType,RegisterType,RegisterResponseType } from "@/configs/schemas";

export function login(data: LoginType) {
  return apiClient.post<LoginResponseType>("/user/login", data);
}


export function register (data: RegisterType){
  return apiClient.post<RegisterResponseType>("/user/register", data);
}