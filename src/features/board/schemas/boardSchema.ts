import z from 'zod';

export const getBoardSchema = () =>
  z.object({
    amount: z.string().nonempty({ message: 'Enter a valid amount' }),
  });
