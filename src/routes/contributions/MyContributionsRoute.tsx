import { PageLoading } from "@/components/loading/PageLoading";
import { useGetMyContributions } from "./queries";

export function MyContributionsRoute() {
  const { data, isPending } = useGetMyContributions();

  if (isPending) {
    return <PageLoading />;
  }

  console.log("data", data);

  return <div>my contribution</div>;
}
