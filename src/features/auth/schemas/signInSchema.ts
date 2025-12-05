import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Invalid email'),

  password: z
    .string()
    .min(8, 'Password too short')
    .max(32, 'Password too long')
    .refine((val) => /[A-Z]/.test(val), 'Need at least 1 uppercase')
    .refine((val) => /[a-z]/.test(val), 'Need at least 1 lowercase')
    .refine((val) => /\d/.test(val), 'Need at least 1 number')
    .refine((val) => /[!@#$%^&*]/.test(val), 'Need at least 1 special char'),
});
