# 🚀 Banco de Manco - Complete Deployment Guide

## Quick Start (5 Minutes)

### Step 1: Local Setup
```bash
# Clone repository
git clone https://github.com/woodersdj/Ai-agent-services.git
cd Ai-agent-services

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your values
nano .env
```

### Step 2: Pre-Flight Check
```bash
# Run validation
npm run preflight

# Output should show:
# ✅ Settlement separation verified
# ✅ Loomal environment settings valid
# ✅ Base Service URL format verified
# ✅ Alternative coins configured
# 🚀 ALL PRE-FLIGHT CHECKS PASSED
```

### Step 3: Build & Test
```bash
# Build TypeScript
npm run build

# Start development server
npm run dev

# Test health endpoint
curl http://localhost:4021/health
```

### Step 4: Deploy to Render
```bash
# Push to GitHub (triggers auto-deployment)
git add .
git commit -m "Deploy Banco de Manco Alpha Build"
git push origin main
```

---

## 📋 Environment Variables (Simplified)

Create `.env` file with these exact variables:

```bash
# Server Settings
PORT=4021
NODE_ENV=production
NETWORK=eip155:84532

# Settlement Addresses (Your Crypto Wallets)
PAY_TO_ADDRESS=0x2777777777777777777777777777777777775d91
SECONDARY_PAY_TO_ADDRESS=0x8888888888888888888888888888888888888888

# API Keys
X402_FACILITATOR_URL=https://facilitator.x402.network
LOOMAL_API_KEY=your_loomal_api_key_here
SERVICE_BASE_URL=https://your-deployed-url.com

# Supported Tokens
SUPPORTED_ALT_COINS=EURC,DEGEN,WETH
```

**Where to get values:**
- `PAY_TO_ADDRESS` - Your Base network wallet (primary settlement)
- `SECONDARY_PAY_TO_ADDRESS` - Your Base network wallet (alternative coins)
- `X402_FACILITATOR_URL` - Fixed URL (no changes needed)
- `LOOMAL_API_KEY` - From your Loomal dashboard
- `SERVICE_BASE_URL` - Your Render/Vercel/Railway URL (after first deployment)

---

## 🌐 Platform Selection & Setup

### Option A: Render (Recommended - Easiest)

**1. Connect GitHub**
- Go to https://render.com
- Click "New +" → "Web Service"
- Select your GitHub repo
- Click "Connect"

**2. Configure**
- Name: `banco-manco-alpha-build`
- Build: `npm install && npm run build`
- Start: `node dist/index.js`
- Plan: Free or Starter

**3. Add Environment Variables**
```
NODE_ENV = production
PORT = 4021
PAY_TO_ADDRESS = 0x...
SECONDARY_PAY_TO_ADDRESS = 0x...
X402_FACILITATOR_URL = https://facilitator.x402.network
LOOMAL_API_KEY = (from Loomal)
SERVICE_BASE_URL = (your render url)
NETWORK = eip155:84532
SUPPORTED_ALT_COINS = EURC,DEGEN,WETH
```

**4. Deploy**
- Click "Create Web Service"
- Wait 2-3 minutes for deployment
- Copy your URL: `https://xxxx.onrender.com`

---

### Option B: Vercel (Quick & Global)

**1. Deploy**
```bash
npm install -g vercel
vercel --prod
```

**2. Set Environment Variables**
```bash
vercel env add
```

Add same variables as Render section

---

### Option C: Railway (Simple)

**1. Connect GitHub**
- Go to https://railway.app
- Click "New Project"
- Select "GitHub Repo"
- Choose your repo

**2. Deploy**
- Railway auto-detects `railway.json`
- Auto-deploys on push

---

### Option D: Docker (Any Cloud)

```bash
# Build Docker image
docker build -t banco-manco .

# Run container
docker run -p 4021:4021 \
  -e PAY_TO_ADDRESS=0x... \
  -e SECONDARY_PAY_TO_ADDRESS=0x... \
  -e LOOMAL_API_KEY=xxx \
  banco-manco
```

---

## 🔑 GitHub Secrets (Auto-Deploy Setup)

### Step 1: Get Render Deploy Hook
1. Go to Render dashboard
2. Select "banco-manco-alpha-build" service
3. Settings → Deploy Hook
4. Copy the URL

### Step 2: Add GitHub Secrets
1. Go to repo → Settings → Secrets and Variables → Actions
2. Click "New repository secret"
3. Add these secrets:

| Secret Name | Value |
|---|---|
| `LOOMAL_API_KEY` | Your Loomal key |
| `PAY_TO_ADDRESS` | Your primary wallet |
| `SECONDARY_PAY_TO_ADDRESS` | Your secondary wallet |
| `PRODUCTION_SERVICE_BASE_URL` | Your deployed URL |
| `RENDER_DEPLOY_HOOK_URL` | Render webhook URL |

### Step 3: Done!
- CI/CD pipeline automatically runs on `git push`
- Auto-validates code
- Auto-deploys to Render
- Auto-registers on Loomal

---

## 📡 Testing Deployment

### Test Health Endpoint
```bash
# Replace with your deployed URL
curl https://your-url.com/health

# Should return:
# {
#   "status": "healthy",
#   "timestamp": "2026-07-15T...",
#   "environment": "production"
# }
```

### Test Service Endpoint
```bash
curl -X POST https://your-url.com/api/cobol

# Should return:
# {
#   "service": "COBOL Mainframe Bridge",
#   "price": 0.5,
#   "currency": "USDC"
# }
```

### Check Loomal Registration
1. Go to https://loomal.ai
2. Search for your service
3. Should see all 10 endpoints registered with prices

---

## 🔧 Troubleshooting (Common Issues)

### Issue: `Build Failed`
**Solution:**
```bash
# Run locally first
npm install
npm run build
npm run preflight

# Check for errors
npm run lint
```

### Issue: `Pre-Flight Check Failed`
**Solution:**
```
❌ Primary USDC address and Secondary address cannot be identical
→ Use DIFFERENT wallet addresses

❌ LOOMAL_API_KEY missing
→ Set valid key in environment variables

❌ Production URLs should use HTTPS
→ Use https:// not http:// for SERVICE_BASE_URL
```

### Issue: `Service Returns 404`
**Solution:**
- Check all environment variables are set
- Verify `SERVICE_BASE_URL` matches your deployed URL
- Restart the service

### Issue: `Loomal Registration Failed`
**Solution:**
1. Verify LOOMAL_API_KEY is correct
2. Ensure addresses are valid Ethereum format: `0x...` (42 chars)
3. Check SERVICE_BASE_URL is publicly accessible
4. Wait 30 seconds after deployment before registering

---

## 📊 Service Pricing (10 APIs)

All services accept USDC or alternative coins:

```
🏛️  COBOL Mainframe Bridge       → $0.50/call
💼 SAP/Oracle ERP Connector      → $0.15/call
📄 Document Intelligence OCR+AI  → $0.10/call
⚡ Real-Time Data ETL            → $0.01/call
🤖 Code Modernization Agent      → $1.00/call
⚖️  Compliance & Regulatory      → $0.25/call
🎭 Multi-Agent Orchestration     → $0.05/call
🔐 Secure Data Anonymizer        → $0.08/call
🧠 AI Agent Memory & Context     → $0.03/call
🎲 Synthetic Test Data Generator → $0.20/call
```

---

## 🎯 Next Actions

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Create `.env` file with values
- [ ] Run `npm run preflight`
- [ ] Run `npm run build`
- [ ] Choose deployment platform (Render recommended)
- [ ] Deploy and get URL
- [ ] Update `SERVICE_BASE_URL` in env vars
- [ ] Add GitHub secrets for auto-deploy
- [ ] Push to main to trigger pipeline
- [ ] Verify all services on Loomal

---

## 💡 Pro Tips

1. **Always run preflight before pushing**
   ```bash
   npm run preflight
   ```

2. **Test locally first**
   ```bash
   npm run dev
   # Then in another terminal:
   curl http://localhost:4021/health
   ```

3. **Check logs**
   - Render: Dashboard → Logs
   - Vercel: Deployments → Logs
   - Railway: Deploy tab → Logs

4. **Restart service if needed**
   - Render: Click "Manual Deploy"
   - Vercel: Redeploy
   - Railway: Restart

---

## 📞 Support Resources

- **GitHub Issues:** https://github.com/woodersdj/Ai-agent-services/issues
- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://railway.app/docs
- **Loomal Platform:** https://loomal.ai

---

**Happy Deploying! 🚀**
