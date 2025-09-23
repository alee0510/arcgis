import * as z from 'zod';

export const RegisterSchema = z.object({
  username: z.string().min(6),
  email: z.email('Invalid email address'),
  password: z.string().min(6),
});

export const LoginSchema = RegisterSchema.omit({username: true});
