import { apiClient } from "@/configs/apiClient";
import { GetFacultiesResponseType, GetTermsResponseType } from "@/configs/schemas";


// faculties
export function getFaculties() {
  return apiClient.get<{ faculties: GetFacultiesResponseType[] }>("academic/faculty");
}

export function getFaculty(id: string) {
  return apiClient.get<GetFacultiesResponseType>(`/academic/faculty/by-id/${id}`);
}


export function createFaculty(data: { name: string, status:string }) {
  return apiClient.post("admin/faculty", data);
}

export function updateFaculty(faculty: { id: string; name: string, status:string }) {
  return apiClient.put("admin/faculty",faculty);
}


export function deleteFaculty(facultyId: string) {
  return apiClient.delete("/admin/faculty", {
    data: { id: facultyId },
  });
}

// Terms & conditions
export function getTerms() {
  return apiClient.get<{ faculties: GetTermsResponseType[] }>("academic/term");
}

export function getTermsById(id: string) {
  return apiClient.get<GetFacultiesResponseType>(`/academic/term/by-id/${id}`);
}


export function createTerms(data: { name: string, content:string }) {
  return apiClient.post("admin/term", data);
}

export function updateTerms(terms: { id: string; name: string, content:string }) {
  return apiClient.put("admin/term",terms);
}

export function deleteTerms(id: string) {
  return apiClient.delete("/admin/term", {
    data: { id: id },
  });
}