import { AcademicYearType } from "@/configs/schemas";
import { useGetAcademicYear, useUpdateAcademicYear } from "./queries";
import { AcademicYearForm } from "./components/AcademicYearForm";
import { useParams } from "react-router";
import { PageLoading } from "@/components/loading/PageLoading";

export function EditAcademicYearRoute() {
  const { id = "" } = useParams();
  const updateMutation = useUpdateAcademicYear();
  const { data, isPending } = useGetAcademicYear(id);

  const onSubmit = (data: AcademicYearType) => {
    updateMutation.mutate({
      id,
      ...data,
    });
  };

  if (isPending) {
    return <PageLoading />;
  }

  return (
    <div>
      <AcademicYearForm
        loading={updateMutation.isPending}
        handleSubmit={onSubmit}
        initialValues={{
          status: data?.status || "active",
          startDate: data?.startDate
            ? new Date(data.startDate)
            : (null as unknown as Date),
          endDate: data?.endDate
            ? new Date(data.endDate)
            : (null as unknown as Date),
          finalClosureDate: data?.finalClosureDate
            ? new Date(data.finalClosureDate)
            : (null as unknown as Date),
          newClosureDate: data?.newClosureDate
            ? new Date(data.newClosureDate)
            : (null as unknown as Date),
        }}
      />
    </div>
  );
}
