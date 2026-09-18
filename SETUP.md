# Project Setup Guide

## 🔐 Environment Variables Setup

### Critical Security Notice
⚠️ **NEVER commit `.env` files with real secrets to the repository!**

### Client Setup (Frontend)

1. Copy `.env.example` to `.env`:
```bash
cd client
cp .env.example .env
```

2. Update with your Supabase credentials (anon key only):
```env
VITE_API_URL=http://localhost:5001/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key  # Safe to expose (client-side)
```

### Server Setup (Backend)

1. Copy `.env.example` to `.env`:
```bash
cd server
cp .env.example .env
```

2. Generate strong JWT secret (min 32 chars):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. Update `.env` with:
```env
NODE_ENV=development
PORT=5001
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_generated_secret_key
JWT_EXPIRE=7d

# Add your Supabase credentials (SECRET KEY - NEVER expose publicly)
SUPABASE_URL=your_supabase_url
SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_SECRET_KEY=your_secret_key  # 🔐 Keep this private!
SUPABASE_JWKS_URL=https://your-project.supabase.co/auth/v1/.well-known/jwks.json
```

## 🚀 Installation

```bash
# Install dependencies
npm install

# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

## 🏃 Running Locally

### Terminal 1 - Backend
```bash
cd server
npm run dev
# Runs on http://localhost:5001
```

### Terminal 2 - Frontend
```bash
cd client
npm run dev
# Runs on http://localhost:3000
```

## ⚠️ Production Deployment

### Secrets Management
Use your hosting provider's secrets manager:
- **Vercel/Netlify**: Environment variables dashboard
- **Heroku**: Config vars
- **AWS**: Secrets Manager
- **Docker**: Use Docker secrets or environment variables

### Before Deploying
1. ✅ Generate new strong JWT_SECRET
2. ✅ Use production Supabase project (not development)
3. ✅ Enable HTTPS
4. ✅ Configure CORS with production domain
5. ✅ Set NODE_ENV=production
6. ✅ Configure database backups
7. ✅ Set up monitoring (Sentry, DataDog, etc.)

### Environment Variable Validation
The server checks for required environment variables on startup:
```bash
SUPABASE_URL, SUPABASE_SECRET_KEY, JWT_SECRET, CLIENT_URL
```

If any are missing, the server will fail to start with a clear error message.

## 🔄 Git Workflow

Never commit:
- ❌ `.env` files with real secrets
- ❌ `node_modules/` (in .gitignore)
- ❌ `.log` files (in .gitignore)
- ❌ Build artifacts (in .gitignore)

Always commit:
- ✅ `.env.example` (as template)
- ✅ `.gitignore`
- ✅ Package files (`package.json`, `package-lock.json`)

## 📋 Checklist

- [ ] Copy `.env.example` to `.env`
- [ ] Fill in all required environment variables
- [ ] `.env` is in `.gitignore`
- [ ] Run `npm install` in both client and server
- [ ] Backend starts on port 5001
- [ ] Frontend starts on port 3000
- [ ] Search for products works
- [ ] Add to cart works
- [ ] Checkout flow works
- [ ] Can create account and login

---

For more information, see README.md
