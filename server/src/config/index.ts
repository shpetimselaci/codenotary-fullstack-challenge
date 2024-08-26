import * as z from 'zod';

export const environmentVariablesSchema = z.object({
  IMMUDB_HOST: z.string().min(2),
  IMMUDB_PORT: z.string().min(4),
  IMMUDB_USER: z.string(),
  IMMUDB_PASSWORD: z.string().min(3),
  IMMUDB_DB: z.string(),
  NODE_ENV: z.string(),
  PORT: z.string(),
});

export type EnvSchema = z.infer<typeof environmentVariablesSchema>;

const parsedEnv = environmentVariablesSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(parsedEnv.error.message);
}

export const config = parsedEnv.data;
