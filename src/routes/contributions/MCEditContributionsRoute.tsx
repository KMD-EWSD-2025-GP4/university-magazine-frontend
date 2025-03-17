import { useNavigate, useParams } from "react-router";
import {
  useCommentContribution,
  useGetContribution,
  useUpdateContributionStatus,
} from "./queries";
import { PageLoading } from "@/components/loading/PageLoading";
import { Contribution } from "./components/Contribution";
import { Button, Container } from "@mantine/core";

export function MCEditContributionsRoute() {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const { data, isPending } = useGetContribution(id);
  const updateMutation = useUpdateContributionStatus();
  const commentMutation = useCommentContribution(id);

  const handleSubmit = (status: "selected" | "rejected") => {
    updateMutation.mutate({
      id,
      status,
    });
  };

  const handleComment = (comment: string) => {
    commentMutation.mutate({
      id,
      comment,
    });
  };

  if (isPending) {
    return <PageLoading />;
  }

  return (
    <Container size="sm" py="20px">
      <Button onClick={() => navigate(-1)} my="md">
        Back
      </Button>
      <Contribution
        loading={updateMutation.isPending}
        commenting={commentMutation.isPending}
        contribution={data!}
        detailed
        onUpdate={handleSubmit}
        onComment={handleComment}
      />
    </Container>
  );
}
