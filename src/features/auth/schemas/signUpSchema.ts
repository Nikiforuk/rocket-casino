import { z } from 'zod';

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, 'Username too short')
    .max(20, 'Username too long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Letters, numbers, and _ only'),

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
