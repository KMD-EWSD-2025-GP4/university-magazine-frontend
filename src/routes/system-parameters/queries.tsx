import { facultiesKeys } from "@/configs/query-keys"; 
import { createFaculty, updateFaculty, deleteFaculty, getFaculties,getFaculty } from "@/services/common"; 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FacultyType } from "@/configs/schemas";


export function useGetFaculties() {
    return useQuery({
      queryKey: [facultiesKeys.lists()],
      queryFn: () => getFaculties(),
      select: (res) => res.data,
    });
  }
  

export function useCreateFaculty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; status: string }) =>
      createFaculty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: facultiesKeys.lists() }); 
    },
  });
}

export function useGetFacultyById(id: string, options = {}) {
    return useQuery({
      queryKey: [facultiesKeys.detail(id)],
      queryFn: () => getFaculty(id),
      enabled: !!id,
      select: (res) => res.data,
      ...options, 
    });
}

export function useUpdateFaculty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (faculty: FacultyType) => updateFaculty(faculty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: facultiesKeys.lists() }); 
    },
  });
}


export function useDeleteFaculty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (facultyId: string) => deleteFaculty(facultyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: facultiesKeys.lists() });
    },
  });
}
