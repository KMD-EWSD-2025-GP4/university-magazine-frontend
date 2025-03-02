import { Center, Loader } from "@mantine/core";

export function PageLoading() {
  return (
    <Center
      h={{
        base: "100vh",
        lg: "calc(100vh - 60px)",
      }}
    >
      <Loader />
    </Center>
  );
}
