import { facultiesKeys } from "@/configs/query-keys";
import { getFaculties } from "@/services/common";
import { useQuery } from "@tanstack/react-query";

export function useGetFaculties() {
  return useQuery({
    queryKey: facultiesKeys.lists(),
    queryFn: getFaculties,
    select: (res) => res.data,
  });
}
