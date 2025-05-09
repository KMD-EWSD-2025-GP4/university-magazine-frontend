import { z } from "zod";
import { roles } from "./rbac";

export const loginSchema = z.object({
  email: z.string().min(1, "Email cannot be blank."),
  password: z.string().min(1, "Password cannot be blank"),
});

export type LoginType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email address format" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Invalid email format",
      }),
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .regex(/^[A-Za-z\s]+$/, {
        message: "Name must not contain special characters or numbers",
      }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
    facultyId: z.string().min(1, { message: "Faculty is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;
export type RegisterResponseType = RegisterType;
export type LoginResponseType = {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    facultyId: string;
    facultyName: string;
    lastLogin: string;
    firstTimeLogin: boolean;
  };
  token: string;
};

export const userSchema = z
  .object({
    name: z.string().min(1, "Name cannot be blank."),
    email: z.string().min(1, "Email cannot be blank."),
    facultyId: z.string().optional(),
    role: z.string().min(1, "Role cannot be blank."),
    password: z.string().min(1, "Password cannot be blank."),
    status: z.string().min(1, "Status cannot be blank."),
  })
  .refine(
    (data) => {
      if (data.facultyId) return true;
      if (data.role === roles.guest) return false;
      if (data.role === roles.student) return false;
      return true;
    },
    {
      message: "Faculty cannot be blank.",
      path: ["facultyId"],
    }
  );

export const updateUserSchema = z
  .object({
    name: z.string().min(1, "Name cannot be blank."),
    email: z.string().min(1, "Email cannot be blank."),
    facultyId: z.string().optional(),
    role: z.string().min(1, "Role cannot be blank."),
    password: z.string().optional(),
    status: z.string().min(1, "Status cannot be blank."),
  })
  .refine(
    (data) => {
      if (data.facultyId) return true;
      if (data.role === roles.guest) return false;
      if (data.role === roles.student) return false;
      return true;
    },
    {
      message: "Faculty cannot be blank.",
      path: ["facultyId"],
    }
  );

export type UserType = z.infer<typeof userSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema> & {
  userId: string;
};
export type UserDetailType = Omit<UserType, "password"> & {
  id: string;
  // lastLogin: boolean | null;
  lastLogin: string | null;
  browser: string | null;
  totalLogins: number | null;
};

export type GetUsersResponseType = UserDetailType[];
export type GetUserResponseType = UserDetailType;

export const facultySchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
});
export type FacultyType = z.infer<typeof facultySchema>;
export type GetFacultiesResponseType = FacultyType;

export const termsSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
});

export type TermsType = z.infer<typeof termsSchema>;
export type GetTermsResponseType = TermsType;

export const academicYearsSchema = z.object({
  status: z.enum(["active", "inactive"], {
    message: "Status must be active or inactive",
  }),
  startDate: z
    .date()
    .nullable()
    .refine((val) => val !== null, {
      message: "Start date cannot be blank.",
    }),
  endDate: z
    .date()
    .nullable()
    .refine((val) => val !== null, {
      message: "End date cannot be blank.",
    }),
  finalClosureDate: z
    .date()
    .nullable()
    .refine((val) => val !== null, {
      message: "Final closure date cannot be blank.",
    }),
  newClosureDate: z
    .date()
    .nullable()
    .refine((val) => val !== null, {
      message: "New closure date cannot be blank.",
    }),
});

export type AcademicYearType = z.infer<typeof academicYearsSchema>;
export type AcademicYearDetailType = AcademicYearType & {
  id: string;
};

export type GetAcademicYearsResponseType = AcademicYearDetailType[];
export type GetAcademicYearResponseType = [AcademicYearDetailType];

export const contributionSchema = z.object({
  title: z.string().min(1, "Title cannot be blank."),
  description: z.string(),
  article: z.object({
    path: z.string(),
  }),
  images: z
    .array(
      z.object({
        path: z.string(),
      })
    )
    .optional(),
});

export type ContributionType = z.infer<typeof contributionSchema>;
export type ContributionDetailType = ContributionType & {
  id: string;
  studentName: string;
  status: "pending" | "selected" | "rejected";
  submissionDate: string;
  academicYear: string;
  academicYearId: string;
  assets: {
    id: string;
    type: "image" | "article";
    url: string;
    filePath: string;
  }[];
  updatedAt: string;
  comments: {
    by: string;
    content: string;
    createdAt: string;
  }[];
  studentId: string;
};

export type GetMyContributionsResponseType = {
  items: ContributionDetailType[];
  nextCursor: number | null;
};

export type GetContributionDetailType = {
  success: true;
  data: ContributionDetailType;
};
