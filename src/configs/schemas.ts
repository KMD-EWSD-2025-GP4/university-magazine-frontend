import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username cannot be blank."),
  password: z.string().min(1, "Password cannot be blank"),
});

export type LoginType = z.infer<typeof loginSchema>;
export type LoginResponseType = {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    facultyId: string;
  };
  token: string;
};

export const userSchema = z.object({
  name: z.string().min(1, "Name cannot be blank."),
  email: z.string().min(1, "Email cannot be blank."),
  faculty: z.string().min(1, "Faculty cannot be blank."),
  role: z.string().min(1, "Role cannot be blank."),
  password: z.string().min(1, "Password cannot be blank."),
  status: z.string().min(1, "Status cannot be blank."),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name cannot be blank."),
  email: z.string().min(1, "Email cannot be blank."),
  faculty: z.string().min(1, "Faculty cannot be blank."),
  role: z.string().min(1, "Role cannot be blank."),
  password: z.string().optional(),
  status: z.string().min(1, "Status cannot be blank."),
});

export type UserType = z.infer<typeof userSchema>;
export type UserDetailType = Omit<UserType, "password"> & {
  id: string;
  lastLogin: boolean | null;
  lastLoginAt: string | null;
  browser: string | null;
  totalLogins: number | null;
};

export type GetUsersResponseType = UserDetailType[];
export type GetUserResponseType = UserDetailType;

export const facultySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type FacultyType = z.infer<typeof facultySchema>;
export type GetFacultiesResponseType = FacultyType[];
// {
//   "id": "ee723117-daeb-4c29-a587-963d0e455895",
//   "email": "student1@gmail.com",
//   "role": "student",
//   "name": "Student One",
//   "facultyId": "2a9a5bce-da09-4fb9-9eea-1c4794c7bfb7",
//   "lastLogin": null,
//   "totalLogins": 0,
//   "browser": null,
//   "facultyName": "Faculty of Medicine"
// }

export const academicYearsSchema = z.object({
  status: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  newClosureDate: z.string(),
  finalClosureDate: z.string(),
});

export type AcademicYearType = z.infer<typeof academicYearsSchema>;
export type AcademicYearDetailType = AcademicYearType & {
  id: string;
};

export type GetAcademicYearsResponseType = AcademicYearDetailType[];
export type GetAcademicYearResponseType = AcademicYearDetailType;

// id: uuid('id').primaryKey().defaultRandom(),
// startDate: date('start_date', { mode: 'date' }).notNull(),
// endDate: date('end_date', { mode: 'date' }).notNull(),
// newClosureDate: timestamp('new_closure_date', {
//   withTimezone: true,
// }).notNull(),
// finalClosureDate: timestamp('final_closure_date', {
//   withTimezone: true,
// }).notNull(),
// createdAt: timestamp('created_at').defaultNow(),
// updatedAt: timestamp('updated_at').defaultNow(),
