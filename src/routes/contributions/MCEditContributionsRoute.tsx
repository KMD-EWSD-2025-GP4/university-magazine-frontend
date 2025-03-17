import { useParams } from "react-router";
import { useGetContribution, useUpdateContribution } from "./queries";
import { PageLoading } from "@/components/loading/PageLoading";
import { ContributionType } from "@/configs/schemas";
import { ContributionForm } from "./components/ContributionForm";

export function MCEditContributionsRoute() {
  const { id = "" } = useParams();

  const { data, isPending } = useGetContribution(id);
  const updateMutation = useUpdateContribution();

  if (isPending) {
    return <PageLoading />;
  }

  const onSubmit = (data: ContributionType) => {
    updateMutation.mutate({
      id,
      data,
    });
  };

  const articles = data?.assets.filter((a) => a.type === "article");
  const images = data?.assets.filter((a) => a.type === "image");

  return (
    <div>
      <ContributionForm
        loading={updateMutation.isPending}
        handleSubmit={onSubmit}
        initialValues={{
          article: {
            path: articles && articles?.length > 0 ? articles[0].filePath : "",
          },
          images:
            images?.map((i) => ({
              path: i.filePath,
            })) || [],
          title: data?.title || "",
          description: data?.description || "",
        }}
      />
    </div>
  );
}
