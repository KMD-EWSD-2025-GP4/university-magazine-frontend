export const usersKeys = {
  all: ["users"],
  lists: () => [...usersKeys.all, "list"],
  list: (id: number | string) => [...usersKeys.lists(), { id }],
};

export const facultiesKeys = {
  lists: () => ["faculties"] as const,
  list: (id: string) => ["faculty", id] as const,
  detail: (id: string) => ["facultyDetail", id] as const,
};

export const termsKeys = {
  lists: () => ["terms"] as const,
  list: (id: string) => ["term", id] as const,
  detail: (id: string) => ["termsDetail", id] as const,
};

export const academicYearsKeys = {
  all: ["academic-years"],
  lists: () => [...academicYearsKeys.all, "list"],
  list: (id: number | string) => [...usersKeys.lists(), { id }],
};

export const contributionsKeys = {
  all: ["contributions"],
  lists: () => [...contributionsKeys.all, "list"],
  list: (id: number | string) => [...contributionsKeys.lists(), { id }],
  myLists: () => [...contributionsKeys.lists(), "my"],
  mcLists: () => [...contributionsKeys.lists(), "mc"],
  mmLists: () => [...contributionsKeys.lists(), "mm"],
  details: (id: number | string) => [...contributionsKeys.lists(), { id }],
};
