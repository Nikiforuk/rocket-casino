import { z } from 'zod';

export const modalSchema = z.object({
  username: z
    .string()
    .min(2, 'Username too short')
    .max(20, 'Username too long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Letters, numbers, and _ only'),
});
