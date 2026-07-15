#!/bin/bash

# Quick command reference for Banco de Manco

echo "🚀 Banco de Manco - Quick Command Reference"
echo "=============================================="
echo ""

echo "📝 Setup & Installation:"
echo "  bash setup.sh                    # Run complete setup"
echo "  npm install                      # Install dependencies"
echo "  cp .env.example .env             # Create .env file"
echo ""

echo "🔍 Validation & Testing:"
echo "  npm run preflight                # Run pre-flight checks"
echo "  npm run build                    # Build TypeScript"
echo "  npm run lint                     # Lint code"
echo "  npm run lint:fix                 # Auto-fix lint issues"
echo "  npm run format                   # Format code"
echo "  npm run typecheck                # Check types"
echo ""

echo "🏃 Development:"
echo "  npm run dev                      # Start dev server with hot reload"
echo "  npm start                        # Start production server"
echo ""

echo "📡 Deployment:"
echo "  npm run register:loomal          # Register services on Loomal"
echo "  bash provision-secrets.sh        # Setup GitHub secrets"
echo ""

echo "🧪 Testing:"
echo "  npm run test                     # Run tests"
echo "  npm run test:coverage            # Run tests with coverage"
echo ""

echo "📋 Testing Endpoints:"
echo "  # Health check"
echo "  curl http://localhost:4021/health"
echo ""
echo "  # COBOL service"
echo "  curl -X POST http://localhost:4021/api/cobol"
echo ""
echo "  # ERP service"
echo "  curl -X POST http://localhost:4021/api/erp"
echo ""

echo "=============================================="
