import { z } from "zod";

const EnvSchema = z
  .object({
    VITE_API_URL: z
      .string()
      .trim()
      .min(1, "VITE_API_URL is required"),
  })
  .passthrough();

const parsedEnv = EnvSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  const details = parsedEnv.error.issues
    .map((issue) => `${issue.path.join(".") || "env"}: ${issue.message}`)
    .join("; ");

  throw new Error(`[ENV] Invalid configuration. ${details}`);
}

export const ENV = parsedEnv.data;
