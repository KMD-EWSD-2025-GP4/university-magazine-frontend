import { ContributionType } from "@/configs/schemas";
import { ContributionForm } from "./components/ContributionForm";
import { useCreateContribution } from "./queries";

export function NewContributionRoute() {
  const { isPending, mutate } = useCreateContribution();

  const onSubmit = (data: ContributionType) => {
    mutate(data);
  };

  return (
    <div>
      <ContributionForm
        create
        loading={isPending}
        handleSubmit={onSubmit}
        initialValues={{
          article: {
            path: "",
          },
          images: [],
          title: "",
          description: "",
        }}
      />
    </div>
  );
}
