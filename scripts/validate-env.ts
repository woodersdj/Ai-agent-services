// scripts/validate-env.ts
import { loadEnv } from "../src/config";

if (require.main === module) {
  const env = loadEnv();
  console.log("Environment validated:", {
    SERVICE_BASE_URL: env.SERVICE_BASE_URL,
    X402_FACILITATOR_URL: env.X402_FACILITATOR_URL,
    PAY_TO_ADDRESS: env.PAY_TO_ADDRESS,
    NETWORK: env.NETWORK,
    NODE_ENV: env.NODE_ENV,
    PORT: env.PORT
  });
}
