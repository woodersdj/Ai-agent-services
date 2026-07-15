# Deployment and integration notes

This repo contains helper scripts and CI workflows to safely register services with Loomal and deploy to cloud platforms.

Secrets required (set in GitHub Actions):
- LOOMAL_API_KEY_STAGING
- LOOMAL_API_KEY_PROD
- SERVICE_BASE_URL
- X402_FACILITATOR_URL
- PAY_TO_ADDRESS
- REDIS_URL (optional)

Usage:
- Run validation: npx ts-node scripts/validate-env.ts
- Dry-run Loomal registration: LOOMAL_ENV=staging LOOMAL_API_KEY_STAGING=... npx ts-node scripts/register-loomal.ts --dry
- Resume registration: npx ts-node scripts/register-loomal.ts --resume
- Deploy to a platform: ./scripts/deploy.sh flyio

Security:
- Do not commit API keys. Use GitHub Secrets.
- Use staging keys for CI dry-runs and only run production registration after manual review.
