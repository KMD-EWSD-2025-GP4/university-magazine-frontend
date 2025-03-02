import { apiClient } from "@/configs/apiClient";
import { GetFacultiesResponseType } from "@/configs/schemas";

export function getFaculties() {
  return apiClient.get<GetFacultiesResponseType>("academic/faculty");
}
