import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
  PORT: z.string().optional().default("4021"),
  PAY_TO_ADDRESS: z.string().min(1, "PAY_TO_ADDRESS is required"),
  X402_FACILITATOR_URL: z
    .string()
    .url("X402_FACILITATOR_URL must be a valid URL"),
  SERVICE_BASE_URL: z
    .string()
    .url("SERVICE_BASE_URL must be a valid URL"),
  LOOMAL_API_KEY: z.string().min(1, "LOOMAL_API_KEY is required"),
  NETWORK: z.string().optional().default("eip155:84532"),
  NODE_ENV: z.string().optional().default("development")
});

export type Env = z.infer<typeof EnvSchema>;

export function loadEnv(): Env {
  try {
    return EnvSchema.parse(process.env);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Environment validation failed:");
      console.error(err.message);
    } else {
      console.error("Environment validation failed:", err);
    }
    process.exit(1);
  }
}
