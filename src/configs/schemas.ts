import { z } from "zod";
import { roles } from "./rbac";

export const loginSchema = z.object({
  email: z.string().min(1, "Email cannot be blank."),
  password: z.string().min(1, "Password cannot be blank"),
});

export type LoginType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    faculty: z.string().min(1, { message: "Faculty is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;
export type LoginResponseType = {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    facultyId: string;
    facultyName: string;
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
  status: string;
  submissionDate: string;
  assets: {
    id: string;
    type: "image" | "article";
    url: string;
  }[];
};
export type GetMyContributionsResponseType = {
  items: ContributionDetailType[];
  nextCursor: number | null;
};
export type GetContributionDetailType = {
  success: true;
  data: ContributionDetailType;
};

// {
//   "id": "f080a454-6676-4e7d-9b3e-a9c99312cc99",
//   "title": "Test a1",
//   "description": "test d1",
//   "studentId": "e5604d51-f4c9-418f-b2a1-8c71c007c930",
//   "academicYearId": "40c4c70f-4824-4d56-bc9c-c71fb5870cdc",
//   "facultyId": "a9373d6e-7792-40e3-a984-8d578e3c1e68",
//   "submissionDate": "2025-03-12T07:50:32.793Z",
//   "lastUpdated": "2025-03-12T07:50:32.801Z",
//   "status": "pending",
//   "viewCount": 0,
//   "createdAt": "2025-03-12T07:50:32.801Z",
//   "updatedAt": "2025-03-12T07:50:32.801Z",
//   "assets": [
//     {
//       "id": "faeaf34e-aec3-4679-a5cb-afd93376b199",
//       "contributionId": "f080a454-6676-4e7d-9b3e-a9c99312cc99",
//       "type": "article",
//       "filePath": "uploads/e5604d51-f4c9-418f-b2a1-8c71c007c930/150f6b5e-d559-452a-8bdc-00fbbcccfcd9.docx",
//       "createdAt": "2025-03-12T07:50:32.805Z",
//       "updatedAt": "2025-03-12T07:50:32.805Z",
//       "url": "https://ewsd-bucket.s3.ap-southeast-1.amazonaws.com/uploads/e5604d51-f4c9-418f-b2a1-8c71c007c930/150f6b5e-d559-452a-8bdc-00fbbcccfcd9.docx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQFLZDMRPCOHBBG52%2F20250312%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250312T080610Z&X-Amz-Expires=604800&X-Amz-Signature=e3463bd3313e944fbaaff52f6ae60ebca7f6bb9a5bd71a882e78c83a5c06fdf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
//     },
//     {
//       "id": "50d5aaf0-20c9-4ceb-821e-34d42d606d84",
//       "contributionId": "f080a454-6676-4e7d-9b3e-a9c99312cc99",
//       "type": "image",
//       "filePath": "uploads/e5604d51-f4c9-418f-b2a1-8c71c007c930/9310e1a5-7e2a-4955-af33-b715af63668a.jpg",
//       "createdAt": "2025-03-12T07:50:32.808Z",
//       "updatedAt": "2025-03-12T07:50:32.808Z",
//       "url": "https://ewsd-bucket.s3.ap-southeast-1.amazonaws.com/uploads/e5604d51-f4c9-418f-b2a1-8c71c007c930/9310e1a5-7e2a-4955-af33-b715af63668a.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQFLZDMRPCOHBBG52%2F20250312%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250312T080610Z&X-Amz-Expires=604800&X-Amz-Signature=dcf158bf891eb3b966baeda044c89956aa850dcb3e71a656b69483d808a2dd7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
//     }
//   ]
// }
