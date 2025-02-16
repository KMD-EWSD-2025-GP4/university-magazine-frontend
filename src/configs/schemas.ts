import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username cannot be blank."),
  password: z.string().min(1, "Password cannot be blank"),
});

export type LoginType = z.infer<typeof loginSchema>;
