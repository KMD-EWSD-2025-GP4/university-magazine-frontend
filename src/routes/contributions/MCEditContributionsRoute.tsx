import { useParams } from "react-router";
import { useGetContribution, useUpdateContributionStatus } from "./queries";
import { PageLoading } from "@/components/loading/PageLoading";
import { Contribution } from "./components/Contribution";
import { Container } from "@mantine/core";

export function MCEditContributionsRoute() {
  const { id = "" } = useParams();

  const { data, isPending } = useGetContribution(id);
  const updateMutation = useUpdateContributionStatus();

  const handleSubmit = (status: "selected" | "rejected") => {
    updateMutation.mutate({
      id,
      status,
    });
  };

  if (isPending) {
    return <PageLoading />;
  }

  return (
    <Container size="sm" py="20px">
      <Contribution contribution={data!} detailed onUpdate={handleSubmit} />
    </Container>
  );
}
