import { routes } from "@/configs/menus";
import { academicYearsKeys } from "@/configs/query-keys";
import { AcademicYearDetailType, AcademicYearType } from "@/configs/schemas";
import {
  createAcademicYear,
  deleteAcademicYear,
  getAcademicYear,
  getAcademicYears,
  updateAcademicYear,
} from "@/services/academic-years";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

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
    select: (res) => res.data?.[0],
    enabled: !!id,
  });
}

export function useCreateAcademicYear() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AcademicYearType) => createAcademicYear(data),
    onSuccess: (res) => {
      const message = res.data?.message || "Academic year created successfully";
      showNotification({
        title: "Success!",
        message,
      });
      queryClient.invalidateQueries({
        queryKey: academicYearsKeys.lists(),
      });
      navigate(routes["academic-years"]);
    },
  });
}

export function useUpdateAcademicYear() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AcademicYearDetailType) => updateAcademicYear(data),
    onSuccess: (res) => {
      const message = res.data?.message || "Academic year updated successfully";
      showNotification({
        title: "Success!",
        message,
      });
      queryClient.invalidateQueries({
        queryKey: academicYearsKeys.lists(),
      });
    },
  });
}

export function useDeleteAcademicYear() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAcademicYear(id),
    onSuccess: (res) => {
      const message = res.data?.message || "Academic year deleted successfully";
      showNotification({
        title: "Success!",
        message,
      });
      queryClient.invalidateQueries({
        queryKey: academicYearsKeys.lists(),
      });
      navigate(routes["academic-years"]);
    },
  });
}
