import { useNavigate, useParams } from "react-router";
import { useCommentContribution, useGetContribution } from "./queries";
import { PageLoading } from "@/components/loading/PageLoading";
import { Contribution } from "./components/Contribution";
import { Button, Container } from "@mantine/core";
import { useUserStore } from "@/store/useUser";

export default function ContributionDetailsRoute() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { data, isPending } = useGetContribution(id);
  const user = useUserStore((state) => state.user);

  const commentMutation = useCommentContribution(id);

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
      <Button
        ml="auto"
        mb="md"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <Contribution
        contribution={data!}
        detailed
        authored={user?.userId === data?.studentId}
        onComment={handleComment}
      />
    </Container>
  );
}
