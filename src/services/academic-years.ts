import { apiClient } from "@/configs/apiClient";
import {
  AcademicYearType,
  GetAcademicYearResponseType,
  GetAcademicYearsResponseType,
} from "@/configs/schemas";

export function getAcademicYears() {
  return apiClient.get<GetAcademicYearsResponseType>("/academic/academic-year");
}

export function getAcademicYear(id: string) {
  return apiClient.get<GetAcademicYearResponseType>(
    `academic/academic-year/by-id/${id}`
  );
}

export function createUser(data: AcademicYearType) {
  return apiClient.post("", data);
}
