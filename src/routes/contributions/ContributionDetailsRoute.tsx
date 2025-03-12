import { useNavigate, useParams } from "react-router";
import { useGetContribution } from "./queries";
import { PageLoading } from "@/components/loading/PageLoading";
import { Contribution } from "./components/Contribution";
import { Button, Container } from "@mantine/core";

export default function ContributionDetailsRoute() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { data, isPending } = useGetContribution(id);

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
      <Contribution contribution={data!} detailed />
    </Container>
  );
}
