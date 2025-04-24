import { PageLoading } from "@/components/loading/PageLoading";
import { useGetMyContributions } from "./queries";
import { Contribution } from "./components/Contribution";
import { Container, Stack } from "@mantine/core";
import { NoContribution } from "@/components/NoContribution";
import { ContributionDetailType } from "@/configs/schemas";

export function MyContributionsRoute() {
  const { data, isPending } = useGetMyContributions();

  if (isPending) {
    return <PageLoading />;
  }

  const contributions = data?.items || [];

  return (
    <Container size="sm" py="20px">
      <Stack gap="xl">
        {contributions?.length === 0 && <NoContribution mylist />}
        {contributions.map((contribution: ContributionDetailType) => (
          <Contribution
            authored
            key={contribution.id}
            contribution={contribution}
          />
        ))}
      </Stack>
    </Container>
  );
}
