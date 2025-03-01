import { UserType } from "@/configs/schemas";
import { useCreateUsers } from "./queries";
import { UserForm } from "./components/UserForm";

export function NewUserRoute() {
  const { isPending, mutate } = useCreateUsers();

  const onSubmit = (data: UserType) => {
    mutate(data);
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
          faculty: "",
          role: "",
          password: "",
          status: "active",
        }}
      />
    </div>
  );
}
