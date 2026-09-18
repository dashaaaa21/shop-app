# VALORÉ Shop - Setup & Deployment Guide

## Local Development Setup

### Environment Variables

Never commit `.env` files with real secrets. Use `.env.example` as a template.

### Frontend Setup

1. Copy `.env.example` to `.env`:
```bash
cd client
cp .env.example .env
```

2. Update with your Supabase credentials:
```env
CONFIG_API_URL=http://localhost:5001/api
CONFIG_SUPABASE_URL=your_supabase_url
CONFIG_SUPABASE_ANON_KEY=your_anon_key
```

### Backend Setup

1. Copy `.env.example` to `.env`:
```bash
cd server
cp .env.example .env
```

2. Generate JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. Update `.env`:
```env
NODE_ENV=development
PORT=5001
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_generated_secret_key
JWT_EXPIRE=7d

SUPABASE_URL=your_supabase_url
SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_SECRET_KEY=your_secret_key
SUPABASE_JWKS_URL=https://your-project.supabase.co/auth/v1/.well-known/jwks.json
```

### Installation

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### Run Locally

Terminal 1 - Backend:
```bash
cd server
npm run dev
```
Runs on http://localhost:5001

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```
Runs on http://localhost:3000

---

# Production Deployment

Deploy to production for FREE using Vercel + Render + Supabase

## Architecture

```
Frontend (Vercel)     Backend (Render)      Database (Supabase)
    ↓                       ↓                        ↓
React/Vite  ←--API--→  Express.js  ←---DB---→  PostgreSQL
FREE                     FREE                    FREE (Free tier)
```

## Prerequisites

- Node.js 18+ and npm
- GitHub account (free)
- Vercel account (free at vercel.com)
- Render account (free at render.com)
- Supabase account (free at supabase.com)

## Step 1: Prepare Repository

```bash
git checkout main
git push origin main

# Verify no uncommitted changes
git status
```

## Step 2: Deploy Backend to Render (FREE)

### 2.1 Create Render Account
1. Go to render.com
2. Sign up with GitHub
3. Authorize access to your repositories

### 2.2 Create Web Service
```
Dashboard → New+ → Web Service
- Select your Shop repository
- Root directory: server
- Name: valoré-backend
- Environment: Node
- Build command: npm install
- Start command: npm start
- Plan: FREE
```

### 2.3 Set Environment Variables
In Render dashboard → Environment:

```env
NODE_ENV=production
PORT=3000

JWT_SECRET=<GENERATE_RANDOM_KEY>
JWT_EXPIRE=7d

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_secret_key
SUPABASE_JWKS_URL=https://your-project.supabase.co/auth/v1/.well-known/jwks.json
```

Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.4 Deploy
- Click "Create Web Service"
- Render auto-deploys from GitHub
- Wait for build completion
- Copy your backend URL: https://valoré-backend.onrender.com

Note: Render free tier spins down after 15 minutes of inactivity. This is acceptable for development.

## Step 3: Deploy Frontend to Vercel (FREE)

### 3.1 Create Vercel Account
1. Go to vercel.com
2. Sign up with GitHub
3. Authorize access

### 3.2 Import Project
```
Dashboard → Add New → Project
- Select your Shop repository
- Framework: Vite
- Root Directory: client
- Plan: FREE
```

### 3.3 Configure Build Settings
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 3.4 Set Environment Variables
In Vercel dashboard → Settings → Environment Variables:

```env
CONFIG_API_URL=https://shop-app-0fiy.onrender.com/api
CONFIG_SUPABASE_URL=https://your-project.supabase.co
CONFIG_SUPABASE_ANON_KEY=your_anon_key
```

### 3.5 Deploy
- Click "Deploy"
- Vercel auto-deploys from GitHub main branch
- Copy your frontend URL: https://valoré-shop.vercel.app

## Step 4: Configure Supabase

### 4.1 Create/Setup Supabase Project
1. Go to supabase.com
2. Create new project (free tier)
3. Go to Settings → API
4. Copy:
   - Project URL → SUPABASE_URL
   - Anon Key → CONFIG_SUPABASE_ANON_KEY and SUPABASE_PUBLISHABLE_KEY
   - Service Role Key → SUPABASE_SECRET_KEY

### 4.2 Run Database Migrations
In Supabase SQL Editor, create tables:

```sql
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT UNIQUE,
  name TEXT NOT NULL,
  price DECIMAL(10,2),
  discount_price DECIMAL(10,2),
  category TEXT,
  gender TEXT,
  description TEXT,
  stock INT DEFAULT 0,
  images TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending',
  subtotal DECIMAL(10,2),
  tax DECIMAL(10,2),
  shipping DECIMAL(10,2),
  total DECIMAL(10,2),
  shipping_address JSONB,
  payment_method TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order Items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT,
  product_image TEXT,
  quantity INT,
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cart table
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  items JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4.3 Seed Products (Optional)
Run from server directory:
```bash
npm run seed
```

## Step 5: Update Backend Render Config

After getting Vercel URL, update Render environment:

```env
CLIENT_URL=https://valoré-shop.vercel.app
```

This ensures CORS allows requests from your frontend.

## Step 6: Test Everything

### Test Backend
```bash
curl https://valoré-backend.onrender.com/api/products
```

### Test Frontend
1. Open https://valoré-shop.vercel.app
2. Test login with Supabase
3. Add items to cart
4. Create an order
5. Check order history

### Test API Connection
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to load products
4. Check for CORS errors

## Troubleshooting

### Backend won't start
Check Render logs:
- Render Dashboard → your-service → Logs
- Verify NODE_ENV=production
- Check all env vars are set

### Frontend shows blank page
Check Vercel logs:
- Vercel Dashboard → Deployments → Logs
- Verify CONFIG_API_URL is correct
- Check browser console (F12)

### CORS error: "Access to XMLHttpRequest blocked"
Solution:
- Update CLIENT_URL in Render env vars
- Verify CORS middleware in server/src/server.js
- Check API URL in client .env

### Login not working
Check:
1. SUPABASE_URL is correct
2. SUPABASE_ANON_KEY is correct (public key)
3. No SUPABASE_SECRET_KEY exposed in client

### Products not loading
Check:
1. Database tables exist in Supabase
2. Products have been seeded
3. SUPABASE_SECRET_KEY is set in backend
4. Backend can reach Supabase

## Cost Analysis

| Service | Free Tier | Cost/Month |
|---------|-----------|-----------|
| Vercel (Frontend) | Yes | $0 |
| Render (Backend) | Yes | $0 |
| Supabase (Database) | Yes (limited) | $0 |
| TOTAL | | $0/month |

Limitations:
- Render: Spins down after 15 min inactivity (OK for testing)
- Supabase Free: 500MB storage, limited requests

## Continuous Deployment

After initial setup:
1. Make changes locally
2. Commit to main branch: `git push origin main`
3. Both Vercel and Render auto-deploy
4. Changes live in 2-5 minutes

## Production Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Supabase project created
- [ ] Database tables migrated
- [ ] All environment variables set
- [ ] CORS configured properly
- [ ] JWT_SECRET is random (32+ chars)
- [ ] SUPABASE_SECRET_KEY not exposed
- [ ] Frontend → Backend API communication works
- [ ] Login/logout works
- [ ] Cart operations work
- [ ] Orders can be created
- [ ] Stock deduction works
- [ ] No console errors

## Next Steps

Custom Domain (Optional)
- Vercel: Projects → Settings → Domains
- Render: Services → Environment → Custom Domain

Error Monitoring (Optional)
- Add Sentry for error tracking
- Set up email alerts

Analytics (Optional)
- Google Analytics
- Vercel Analytics

Database Backups
- Supabase auto-backups (7-day retention on free tier)
- Upgrade to Pro for longer retention

## Support

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Supabase Docs: https://supabase.com/docs
- Express Docs: https://expressjs.com

---

Ready for FREE production deployment
