import { UpdateUserType, UserType } from "@/configs/schemas";
import { useGetUser, useUpdateUser } from "./queries";
import { UserForm } from "./components/UserForm";
import { useParams } from "react-router";
import { PageLoading } from "@/components/loading/PageLoading";

export function EditUserRoute() {
  const { id = "" } = useParams();
  const { data, isPending } = useGetUser(id);
  const updateMutation = useUpdateUser();

  const onSubmit = (data: UserType | UpdateUserType) => {
    updateMutation.mutate({
      ...data,
      userId: id,
    });
  };

  if (isPending) {
    return <PageLoading />;
  }

  return (
    <div>
      <UserForm
        loading={updateMutation.isPending}
        handleSubmit={onSubmit}
        initialValues={{
          name: data?.name || "",
          email: data?.email || "",
          facultyId: data?.facultyId || "",
          role: data?.role || "",
          password: "",
          status: data?.status || "active",
        }}
      />
    </div>
  );
}
