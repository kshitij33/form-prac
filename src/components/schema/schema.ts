// schema.ts
import { z } from 'zod';

export const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type FormValues = z.infer<typeof formSchema>;
