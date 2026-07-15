#!/usr/bin/env bash
set -euo pipefail

# deploy.sh <platform>
# Supported platforms: railway, flyio, render, vercel, aws, azure
PLATFORM="$1"
case "$PLATFORM" in
  railway)
    echo "Deploying to Railway..."
    # expects RAILWAY_TOKEN in env
    # railway up or use the CLI deploy command
    railway up
    ;;
  flyio)
    echo "Deploying to fly.io..."
    # expects FLY_API_TOKEN
    fly deploy
    ;;
  render)
    echo "Deploying to Render..."
    # Use render CLI or API with secrets
    # placeholder - use manual deploy or API
    echo "Please configure Render deploy steps or use their CLI/API"
    ;;
  vercel)
    echo "Deploying to Vercel..."
    vercel --prod
    ;;
  aws)
    echo "Deploying to AWS (ECR/ECS/EBS)..."
    # Build & push docker image by default
    ./deploy-aws.sh
    ;;
  azure)
    echo "Deploying to Azure..."
    # placeholder: az webapp up or container deploy
    ./deploy-azure.sh
    ;;
  *)
    echo "Unknown platform: $PLATFORM" >&2
    exit 2
    ;;
esac
