import {
  API_BASE_URL,
  API_TIMEOUT,
  APP_NAME,
  APP_VERSION,
  ARCGIS_API_KEY,
  DEBUG_MODE,
  NODE_ENV,
} from '@env';
import * as z from 'zod';

export const EnvSchema = z.object({
  API_BASE_URL: z.url(),
  API_TIMEOUT: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => !isNaN(val) && val > 0, {
      message: 'API_TIMEOUT must be a positive integer',
    }),
  APP_NAME: z.string().min(1),
  APP_VERSION: z.string().min(1),
  ARCGIS_API_KEY: z.string().min(1),
  DEBUG_MODE: z.string().transform(val => val === 'true' || val === '1'),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

export const env = EnvSchema.parse({
  API_BASE_URL,
  API_TIMEOUT,
  APP_NAME,
  APP_VERSION,
  ARCGIS_API_KEY,
  DEBUG_MODE,
  NODE_ENV,
});

export type Env = z.infer<typeof EnvSchema>;
