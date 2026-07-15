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
  LOOMAL_API_KEY: z.string().optional(),
  LOOMAL_API_KEY_STAGING: z.string().optional(),
  LOOMAL_API_KEY_PROD: z.string().optional(),
  NETWORK: z.string().optional().default("eip155:84532"),
  NODE_ENV: z.string().optional().default("development")
});

export type Env = z.infer<typeof EnvSchema>;

export function loadEnv(): Env {
  try {
    const parsed = EnvSchema.parse(process.env);

    // At runtime, ensure at least one Loomal key is available when not running in test mode
    const hasLoomalKey = !!(
      parsed.LOOMAL_API_KEY || parsed.LOOMAL_API_KEY_STAGING || parsed.LOOMAL_API_KEY_PROD
    );

    if (!hasLoomalKey && parsed.NODE_ENV !== "test") {
      console.warn(
        "Warning: No Loomal API key found in environment. For CI dry-runs set LOOMAL_API_KEY_STAGING or LOOMAL_API_KEY."
      );
      // Do not exit here; individual scripts will enforce presence of a key when required.
    }

    return parsed;
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
