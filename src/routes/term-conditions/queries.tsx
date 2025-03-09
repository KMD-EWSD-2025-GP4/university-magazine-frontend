import { termsKeys } from "@/configs/query-keys"; 
import { createTerms, updateTerms, deleteTerms, getTerms,getTermsById } from "@/services/common"; 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TermsType } from "@/configs/schemas";


export function useGetTerms() {
    return useQuery({
      queryKey: [termsKeys.lists()],
      queryFn: () => getTerms(),
      select: (res) => res.data,
    });
  }
  
export function useCreateTerms() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; content: string }) =>
        createTerms(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: termsKeys.lists() }); 
    },
  });
}

export function useGetTermById(id: string, options = {}) {
    return useQuery({
      queryKey: [termsKeys.detail(id)],
      queryFn: () => getTermsById(id),
      enabled: !!id,
      select: (res) => res.data,
      ...options, 
    });
}

export function useUpdateTerms() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (terms: TermsType) => updateTerms(terms),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: termsKeys.lists() }); 
    },
  });
}


export function useDeleteFaculty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTerms(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: termsKeys.lists() });
    },
  });
}
