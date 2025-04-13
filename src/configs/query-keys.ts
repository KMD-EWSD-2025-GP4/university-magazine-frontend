export const usersKeys = {
  all: ["users"],
  lists: () => [...usersKeys.all, "list"],
  list: (id: number | string) => [...usersKeys.lists(), { id }],
  mostActive: (role?: string) => [...usersKeys.lists(), "most-active", role],
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
  mmLists: (academicYear: string) => [
    ...contributionsKeys.lists(),
    "mm",
    academicYear,
  ],
  details: (id: number | string) => [...contributionsKeys.lists(), { id }],
  report: () => [...contributionsKeys.lists(), "report"],
  report2: () => [...contributionsKeys.lists(), "report2"],
  report3: (id: number | string) => [
    ...contributionsKeys.lists(),
    { id },
    "report3",
  ],
  report4: () => [...contributionsKeys.lists(), "report4"],
  report5: () => [...contributionsKeys.lists(), "report5"],
  report6: () => [...contributionsKeys.lists(), "report6"],
  mostViewed: () => [...contributionsKeys.lists(), "mostViewed"],
};

export const pagesKeys = {
  all: ["pages"],
  lists: () => [...pagesKeys.all, "list"],
  list: (id: number | string) => [...pagesKeys.lists(), { id }],
};
