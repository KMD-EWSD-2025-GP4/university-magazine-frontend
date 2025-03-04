import { AcademicYearType } from "@/configs/schemas";
import { useCreateAcademicYear } from "./queries";
import { AcademicYearForm } from "./components/AcademicYearForm";

export function NewAcademicYearRoute() {
  const { isPending, mutate } = useCreateAcademicYear();

  const onSubmit = (data: AcademicYearType) => {
    mutate(data);
  };

  return (
    <div>
      <AcademicYearForm
        create
        loading={isPending}
        handleSubmit={onSubmit}
        initialValues={{
          status: "active",
          startDate: null as unknown as Date,
          endDate: null as unknown as Date,
          finalClosureDate: null as unknown as Date,
          newClosureDate: null as unknown as Date,
        }}
      />
    </div>
  );
}
