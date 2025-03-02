export const usersKeys = {
  all: ["users"],
  lists: () => [...usersKeys.all, "list"],
  list: (id: number | string) => [...usersKeys.lists(), { id }],
};
export const facultiesKeys = {
  all: ["faculties"],
  lists: () => [...usersKeys.all, "list"],
  list: (id: number | string) => [...usersKeys.lists(), { id }],
};
