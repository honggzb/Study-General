import {z} from 'zod';

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(32, "Name must be at most 32 characters."),
    email: z.email({ error: "Please enter valid email address" }),
    password: z
      .string()
      .min(6, { error: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { error: "Password did not match" }),
    phoneNo: z
      .string()
      .min(10, { error: "Phone Number must be at least 10 characters long" })
      .refine((value) => /^\d{10}$/.test(value), {
        message: "Please enter a valid phone number",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export type SignUpSchema = z.infer<typeof registerFormSchema>;
  export type SignUpFields = keyof SignUpSchema;
