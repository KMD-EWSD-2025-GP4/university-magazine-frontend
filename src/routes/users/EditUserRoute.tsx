import { UserType } from "@/configs/schemas";
import { useGetUser } from "./queries";
import { UserForm } from "./components/UserForm";
import { useParams } from "react-router";
import { PageLoading } from "@/components/loading/PageLoading";

export function EditUserRoute() {
  const { id = "" } = useParams();

  const { data, isPending } = useGetUser(id);

  const onSubmit = (data: UserType) => {
    console.log("data", data);
  };

  if (isPending) {
    return <PageLoading />;
  }

  return (
    <div>
      <UserForm
        loading={false}
        handleSubmit={onSubmit}
        initialValues={{
          name: data?.name || "",
          email: data?.email || "",
          faculty: data?.faculty || "",
          role: data?.role || "",
          password: "",
          status: data?.status || "active",
        }}
      />
    </div>
  );
}
