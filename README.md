# Banco de Manco - Alpha Build 🚀

Multi-service AI Agent portfolio with 10 profitable microservices and dual-settlement cryptocurrency infrastructure.

## 📋 Overview

Banco de Manco is a sophisticated microservices platform offering specialized AI agents and modernization tools:

- **COBOL Mainframe Bridge** - $0.50/call
- **SAP/Oracle ERP Connector** - $0.15/call
- **Document Intelligence OCR+AI** - $0.10/call
- **Real-Time Data ETL** - $0.01/call
- **Code Modernization Agent** - $1.00/call
- **Compliance & Regulatory** - $0.25/call
- **Multi-Agent Orchestration** - $0.05/call
- **Secure Data Anonymizer** - $0.08/call
- **AI Agent Memory & Context** - $0.03/call
- **Synthetic Test Data Generator** - $0.20/call

## 🏗️ Architecture

### Settlement Infrastructure
- **Primary:** USDC on Base Network via x402 Facilitator
- **Secondary:** Alternative coins (EURC, DEGEN, WETH) routing to dedicated settlement address
- **Smart Routing:** Automatic asset routing based on payment method

### Deployment Targets
- Render (Primary)
- Vercel (Serverless)
- Railway (Containerized)
- Fly.io (Distributed)
- AWS App Runner

### Platform Integration
- Loomal automated service registry
- Dynamic pricing models
- Real-time settlement tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/woodersdj/Ai-agent-services.git
cd Ai-agent-services

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration
```

### Development

```bash
# Run in development mode with hot reload
npm run dev

# Build TypeScript
npm run build

# Run production build
npm start

# Run pre-flight checks
npm run preflight

# Register services on Loomal
npm run register:loomal
```

### Validation & Testing

```bash
# Run all validations
npm run validate

# Type checking
npm run typecheck

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run tests
npm run test

# Coverage report
npm run test:coverage
```

## 📁 Project Structure

```
banco-manco-alpha-services/
├── src/
│   ├── config/
│   │   └── index.ts              # Zod environment validation
│   ├── services/
│   │   ├── cobol.ts              # COBOL Mainframe Bridge
│   │   ├── erp.ts                # ERP Connector
│   │   ├── ocr.ts                # Document Intelligence
│   │   ├── etl.ts                # Data ETL Pipeline
│   │   ├── modernize.ts          # Code Modernization
│   │   ├── compliance.ts         # Compliance & Regulatory
│   │   ├── orchestrate.ts        # Multi-Agent Orchestration
│   │   ├── anonymize.ts          # Data Anonymizer
│   │   ├── memory.ts             # Agent Memory & Context
│   │   └── synthetic.ts          # Synthetic Data Generator
│   ├── routes/
│   │   └── api.ts                # Express API routes
│   ├── middleware/
│   │   ├── auth.ts               # Authentication
│   │   └── errorHandler.ts       # Error handling
│   └── index.ts                  # Application entry point
├── scripts/
│   ├── preflight-check.ts        # Pre-deployment validation
│   └── register-loomal.ts        # Loomal service registration
├── .github/
│   └── workflows/
│       └── ci-cd.yml             # GitHub Actions pipeline
├── render.yaml                   # Render deployment config
├── vercel.json                   # Vercel deployment config
├── railway.json                  # Railway deployment config
├── fly.toml                      # Fly.io deployment config
├── Dockerfile                    # Docker containerization
├── .env.example                  # Environment variables template
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project dependencies
└── README.md                     # This file
```

## ⚙️ Configuration

### Environment Variables

Required environment variables (see `.env.example`):

```bash
# Server
PORT=4021
NODE_ENV=production

# Blockchain/Settlement
NETWORK=eip155:84532
PAY_TO_ADDRESS=0x...              # Primary USDC settlement address
SECONDARY_PAY_TO_ADDRESS=0x...    # Alternative coins settlement address
SUPPORTED_ALT_COINS=EURC,DEGEN,WETH

# API Integration
X402_FACILITATOR_URL=https://...  # x402 payment facilitator
LOOMAL_API_KEY=...                # Loomal registry API key
SERVICE_BASE_URL=https://...      # Your deployed service URL
```

### Validation

The configuration is validated at startup using Zod schemas. Invalid configurations will cause the application to exit with clear error messages.

```typescript
// Example: Configuration loading
import { config } from './src/config';

console.log(`Server running on port ${config.PORT}`);
console.log(`Settlement address: ${config.PAY_TO_ADDRESS}`);
```

## 🔐 Security Best Practices

- **Never commit `.env` files** - Use `.gitignore` to exclude them
- **Secrets in platform dashboards** - Store sensitive values in Render, Vercel, Railway, etc.
- **Environment validation** - Zod ensures type safety before runtime
- **HTTPS enforcement** - Production deployments require HTTPS
- **Address separation** - Primary and secondary settlement addresses must differ

## 📊 Deployment

### Render (Recommended)

```bash
# Render Blueprint automatically deploys from render.yaml
# Push to main/master branch to trigger deployment
git push origin main
```

**Features:**
- Zero-config deployments
- Automatic branch deployments
- Built-in PostgreSQL/Redis support
- Pay-per-use pricing

### Vercel

```bash
# Serverless deployment
npx vercel --prod
```

**Features:**
- Global edge network
- Automatic API routes
- Built-in CI/CD from GitHub

### Railway

```bash
# Railway auto-detects from railway.json
git push origin main
```

**Features:**
- Simple configuration
- Native GitHub integration
- PostgreSQL & Redis templates

### Fly.io

```bash
# Deploy from fly.toml
flyctl deploy
```

**Features:**
- Global infrastructure
- Distributed by default
- Cost-effective scaling

### AWS App Runner

```bash
aws apprunner create-service \
  --service-name banco-manco-alpha-services \
  --source-configuration TemplateType=REPOSITORY
```

**Features:**
- Fully managed containers
- Auto-scaling included
- Private registry support

## 🧪 Pre-Flight Checks

Before deployment, run validation:

```bash
npm run preflight
```

This verifies:
- ✅ Primary and secondary addresses are different
- ✅ Loomal API key is valid
- ✅ Service Base URL structure is correct
- ✅ HTTPS is enforced in production

## 📡 Service Registration

After deployment, auto-register all services on Loomal:

```bash
npm run register:loomal
```

This registers:
- All 10 microservice endpoints
- Individual pricing models
- Settlement addresses
- Supported alternative coins

## 🔄 CI/CD Pipeline

GitHub Actions automates the entire deployment workflow:

1. **Validate & Test** - Code quality, type checking, pre-flight checks
2. **Build** - TypeScript compilation and verification
3. **Deploy** - Render push trigger (or alternative platforms)
4. **Register** - Auto-register on Loomal platform

### Setting Up CI/CD

1. Add repository secrets in GitHub:
   - `LOOMAL_API_KEY`
   - `SECONDARY_PAY_TO_ADDRESS`
   - `PRODUCTION_SERVICE_BASE_URL`
   - `RENDER_DEPLOY_HOOK_URL`

2. Push to `main` or `master` branch to trigger pipeline

## 📈 Monitoring & Logging

Each service emits structured logs:

```
✅ Service registered successfully
❌ Settlement address validation failed
📡 Incoming request to /api/cobol
🔄 Processing payment transaction
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/new-service`
2. Make changes and commit: `git commit -am 'feat: add new service'`
3. Push to branch: `git push origin feature/new-service`
4. Submit a pull request

## 📜 License

MIT - See LICENSE file for details

## 👨‍💼 Support

**Author:** Banco de Manco
**Repository:** https://github.com/woodersdj/Ai-agent-services
**Issues:** https://github.com/woodersdj/Ai-agent-services/issues

---

**Ready to transform your enterprise? Deploy Banco de Manco today! 🚀**
