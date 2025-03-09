import { UpdateUserType, UserType } from "@/configs/schemas";
import { useCreateUser } from "./queries";
import { UserForm } from "./components/UserForm";

export function NewUserRoute() {
  const { isPending, mutate } = useCreateUser();

  const onSubmit = (data: UserType | UpdateUserType) => {
    mutate(data as UserType);
  };

  return (
    <div>
      <UserForm
        create
        loading={isPending}
        handleSubmit={onSubmit}
        initialValues={{
          name: "",
          email: "",
          facultyId: "",
          role: "",
          password: "",
          status: "active",
        }}
      />
    </div>
  );
}
