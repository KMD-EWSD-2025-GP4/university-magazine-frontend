import { apiClient } from "@/configs/apiClient";
import {
  AcademicYearDetailType,
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

export function createAcademicYear(academicYear: AcademicYearType) {
  return apiClient.post("/admin/academic-year", academicYear);
}

export function updateAcademicYear(academicYear: AcademicYearDetailType) {
  return apiClient.put("/admin/academic-year", academicYear);
}

export function deleteAcademicYear(id: string) {
  return apiClient.delete("/admin/academic-year", { data: { id: id } });
}
