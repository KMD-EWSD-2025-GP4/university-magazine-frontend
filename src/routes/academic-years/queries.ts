import { academicYearsKeys } from "@/configs/query-keys";
import { AcademicYearType } from "@/configs/schemas";
import { getAcademicYear, getAcademicYears } from "@/services/academic-years";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetAcademicYears() {
  return useQuery({
    queryKey: academicYearsKeys.lists(),
    queryFn: getAcademicYears,
    select: (res) => res.data,
  });
}

export function useGetAcademicYear(id: string) {
  return useQuery({
    queryKey: academicYearsKeys.list(id),
    queryFn: () => getAcademicYear(id),
    select: (res) => res.data,
    enabled: !!id,
  });
}

export function useCreateAcademicYear() {
  return useMutation({
    mutationFn: (data: AcademicYearType) => {
      console.log("data", data);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 1000);
      });
    },
  });
}

export function useUpdateUser() {}
