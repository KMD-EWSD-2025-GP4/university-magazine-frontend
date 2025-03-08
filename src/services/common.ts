import { apiClient } from "@/configs/apiClient";
import { GetFacultiesResponseType } from "@/configs/schemas";



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
  console.log('faculty',faculty)
  return apiClient.put("admin/faculty",faculty);
}


export function deleteFaculty(facultyId: string) {
  return apiClient.delete("/admin/faculty", {
    data: { id: facultyId },
  });
}