export const usersKeys = {
  all: ["users"],
  lists: () => [...usersKeys.all, "list"],
  list: (id: number) => [...usersKeys.lists(), { id }],
};
