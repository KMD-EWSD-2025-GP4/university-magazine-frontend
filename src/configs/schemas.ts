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

export type UserType = z.infer<typeof userSchema>;
