import * as z from 'zod';

export const RegisterSchema = z.object({
  username: z.string().min(6, 'Username must be at least 6 characters long'),
  email: z.email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const LoginSchema = RegisterSchema.omit({username: true});
