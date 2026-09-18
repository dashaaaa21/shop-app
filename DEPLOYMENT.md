# Deployment Guide

This guide covers deploying the e-commerce shop application to production.

## Prerequisites

- Node.js 18+ and npm
- Supabase account with project created
- Git repository with SSH keys configured
- Hosting provider account (Vercel, Netlify, Railway, etc.)

##  Environment Setup

### 1. Generate Strong Secrets

Generate a strong JWT secret for server:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Supabase Configuration

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to **Settings > API**
3. Copy:
   - Project URL → `SUPABASE_URL`
   - Public Anon Key → `VITE_SUPABASE_ANON_KEY` (client)
   - Secret Key → `SUPABASE_SECRET_KEY` (server only)

### 3. Set Environment Variables

**Server (.env):**
```env
NODE_ENV=production
PORT=5001
CLIENT_URL=https://yourdomain.com

JWT_SECRET=your_generated_secret_key
JWT_EXPIRE=7d

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_secret_key
SUPABASE_JWKS_URL=https://your-project.supabase.co/auth/v1/.well-known/jwks.json
```

**Client (.env):**
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended for Frontend)

#### Frontend Deployment
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Select repository
4. Configure:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
5. Add environment variables:
   - `VITE_API_URL`: Your API URL
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy

#### Backend Deployment (Railway or Render)
See options below.

### Option 2: Railway (Full Stack)

**Frontend + Backend on Railway:**

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Create two services:
   - **Frontend Service**
     - Root directory: `client`
     - Build command: `npm run build`
     - Start command: `npm run preview`
   - **Backend Service**
     - Root directory: `server`
     - Build command: `npm install`
     - Start command: `npm start`

5. Add environment variables to Backend service
6. Set up PostgreSQL (Railway provides it)
7. Deploy

### Option 3: Render

**Frontend:**
1. Go to [render.com](https://render.com)
2. Create Static Site
3. Connect GitHub
4. Build command: `npm run build`
5. Publish directory: `dist`

**Backend:**
1. Create Web Service
2. Build command: `npm install`
3. Start command: `npm start`
4. Add environment variables

### Option 4: Docker (Self-hosted or Any Cloud)

#### Build Docker Image

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Build client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci

# Build
RUN npm run build

# Set up server
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci

EXPOSE 5001
CMD ["npm", "start"]
```

**Build and push:**
```bash
docker build -t shop-app:1.0.0 .
docker tag shop-app:1.0.0 your-registry/shop-app:1.0.0
docker push your-registry/shop-app:1.0.0
```

## ✅ Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Supabase database migrations applied
- [ ] Database backups enabled
- [ ] SSL certificate configured (auto-renew)
- [ ] CORS configured for frontend domain
- [ ] Rate limiting enabled
- [ ] Error monitoring set up (Sentry)
- [ ] CDN configured for static assets
- [ ] Database connection pooling enabled
- [ ] Monitoring and alerting configured
- [ ] Health check endpoint accessible
- [ ] All secrets rotate from .env.example, not hardcoded

##  Health Checks

After deployment, verify:

```bash
# Check health endpoint
curl https://api.yourdomain.com/api/health

# Response should be:
# {"status":"ok","message":"Server is running"}

# Check Supabase connection
curl https://yourdomain.com/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📊 Monitoring

### Set Up Sentry for Error Tracking
1. Create [Sentry](https://sentry.io) account
2. Create project for Node.js and React
3. Add SENTRY_DSN to environment variables
4. Errors will be automatically tracked

### Set Up Application Metrics
- Monitor database query times
- Track API response times
- Monitor error rates
- Set up alerts for high error rates (>5%)

## 🔄 Database Backups

**Supabase Backups:**
1. Go to Settings > Backups
2. Enable daily backups
3. Set retention to 7+ days
4. Enable point-in-time recovery if available

## 🚨 Rollback Procedure

If deployment fails:

1. **Check logs:**
   ```bash
   # Railway/Render/Vercel: Check deployment logs in dashboard
   # Docker: docker logs <container-id>
   ```

2. **Rollback to previous version:**
   - Vercel: Click "Deployments" → Select previous → "Redeploy"
   - Railway: Select previous deployment
   - Docker: Pull and run previous image tag

3. **Database rollback** (if needed):
   - Supabase: Use "Restore from backup"

## 🔐 Production Security Checklist

- [ ] HTTPS enabled (SSL/TLS)
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (ORM/parameterized queries)
- [ ] XSS protection headers configured
- [ ] CSRF protection enabled
- [ ] Secrets never in logs
- [ ] Database credentials rotated
- [ ] Regular security updates applied

##  Performance Optimization

- Enable gzip compression
- Use CDN for static assets
- Enable database query caching
- Use connection pooling
- Optimize images and assets
- Enable browser caching headers

## Troubleshooting

### Service won't start
- Check environment variables
- Check database connection
- Check logs for error messages
- Verify all required dependencies installed

### High latency
- Check database performance
- Check network connectivity
- Enable caching
- Review slow queries

### Memory issues
- Check for memory leaks
- Increase allocated memory
- Review application logs
- Consider horizontal scaling

## 📞 Support Resources

- Supabase Docs: https://supabase.com/docs
- Node.js Best Practices: https://nodejs.org/en/docs/
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs

## 🔗 Links

- Project Repository: https://github.com/dashaaaa21/shop-app
- Setup Guide: See SETUP.md
- Local Development: See README.md
