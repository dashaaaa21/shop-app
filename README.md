
# VALORÉ - E-Commerce Shop

Modern e-commerce platform I built with React, TypeScript, Node.js, Express, and Supabase. Fast, secure, and made to actually work for both users and developers.

## Live Demo

Try it out right now:
- **Frontend**: https://shop-app-te6c.vercel.app
- **Backend API**: https://shop-app-0fiy.onrender.com

[View Full Deployment Status](./LIVE.md)

## About

VALORÉ is a full-featured e-commerce platform designed for both shoppers and developers. I built this to showcase modern web development practices: clean code, proper authentication, real inventory management, and actual order processing. It's production-ready but also a great learning resource.

View all deployment URLs in [DEPLOYMENT_URLS.md](./DEPLOYMENT_URLS.md)

<img width="1521" height="836" alt="Знімок екрана 2026-09-18 о 08 20 18" src="https://github.com/user-attachments/assets/c8afa5c2-56a5-49f4-937c-dfe75e02a004" /><img width="1537" height="835" alt="Знімок екрана 2026-09-18 о 08 20 31" src="https://github.com/user-attachments/assets/ca356e90-bfdc-4ef9-a727-d63aaacda104" />

## Quick Links

- [About](#about)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Docs](#api-docs)
- [Deploy](#deploy)

## Features

**Frontend**
- Product catalog with filtering & search
- Real-time shopping cart with Quick Add
- Instant authentication (no email confirmation)
- Order tracking & history
- Mobile-responsive design
- Error handling & skeleton loaders
- Category browsing

**Backend**
- Clean REST API
- Input validation on all endpoints
- Stock management & inventory tracking
- Instant user registration without email confirmation
- JWT token refresh
- Rate limiting & security headers
- Supabase integration

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, React Router, Zustand, Axios

**Backend:** Node.js, Express.js, Supabase, JWT, express-validator, Helmet

**DevOps:** Git, npm, Docker

## Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn
- Git

### Setup

```bash
git clone https://github.com/dashaaaa21/shop-app.git
cd shop-app

# Frontend
cd client
cp .env.example .env
npm install

# Backend (new terminal)
cd server
cp .env.example .env
npm install
```
<img width="1428" height="823" alt="Знімок екрана 2026-09-18 о 08 25 52" src="https://github.com/user-attachments/assets/e9c4928b-cdf3-4984-a763-e75452c70ae8" />
<img width="1425" height="834" alt="Знімок екрана 2026-09-18 о 08 25 32" src="https://github.com/user-attachments/assets/42318900-9636-478e-9538-056010e80cda" />
<img width="1449" height="816" alt="Знімок екрана 2026-09-18 о 08 25 20" src="https://github.com/user-attachments/assets/64d23189-90ba-4fca-8093-e4928cd7f723" />
<img width="569" height="429" alt="Знімок екрана 2026-09-18 о 08 25 09" src="https://github.com/user-attachments/assets/2fe4f2f6-c536-49b6-9e11-dc6de738deb5" />
<img width="1508" height="832" alt="Знімок екрана 2026-09-18 о 08 24 53" src="https://github.com/user-attachments/assets/161eb4d2-e711-462c-810f-12169e029434" />
<img width="1489" height="811" alt="Знімок екрана 2026-09-18 о 08 22 05" src="https://github.com/user-attachments/assets/9b8bd549-15b8-4920-8881-26f75aafa638" />
<img width="1454" height="820" alt="Знімок екрана 2026-09-18 о 08 21 39" src="https://github.com/user-attachments/assets/e9aa9ff8-f60d-493f-9766-6ab05c6f7462" />
<img width="1515" height="782" alt="Знімок екрана 2026-09-18 о 08 21 30" src="https://github.com/user-attachments/assets/7263e510-1626-4496-af36-d3ae9119dd14" />
<img width="1507" height="819" alt="Знімок екрана 2026-09-18 о 08 21 22" src="https://github.com/user-attachments/assets/81230de9-e7cd-4aa0-afc6-10fca00114b2" />
<img width="1479" height="840" alt="Знімок екрана 2026-09-18 о 08 21 12" src="https://github.com/user-attachments/assets/42de4464-34c5-41cb-a92b-f0a683ac8969" />
<img width="1475" height="831" alt="Знімок екрана 2026-09-18 о 08 21 04" src="https://github.com/user-attachments/assets/3cc362ce-1857-45f6-8fb2-6f5b7c0b779d" />
<img width="1499" height="806" alt="Знімок екрана 2026-09-18 о 08 20 52" src="https://github.com/user-attachments/assets/88dbfdbe-d81f-4f10-8ef1-a939e6c8d0a1" />
<img width="1552" height="831" alt="Знімок екрана 2026-09-18 о 08 20 42" src="https://github.com/user-attachments/assets/9aa27bcc-98af-4689-9cee-a441cc8679de" />

### Run

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5001

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup.

## Authentication

**Instant Registration**

Users can sign up and start using the shop immediately—no email confirmation required. The registration process:

1. User submits email, password, and name
2. Account created with auto-confirmed email
3. User automatically logged in
4. Access token returned immediately

This makes onboarding frictionless while maintaining security.

## Project Structure

```
shop-app/
├── client/
│   ├── src/
│   │   ├── api/          # API calls
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Zustand stores
│   │   ├── types/        # TypeScript types
│   │   └── App.tsx
│
├── server/
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth & validation
│   │   ├── config/       # Config files
│   │   └── server.js
│
├── DEPLOYMENT.md        # Setup & deployment guide
└── README.md
```

## API Docs

Base URL: `http://localhost:5001/api`

**Auth**
- `POST /auth/register` - Sign up (instant, no email confirmation needed)
- `POST /auth/login` - Log in
- `POST /auth/refresh` - Refresh token
- `GET /auth/me` - Get user

**Products**
- `GET /products` - List products
- `GET /products/:id` - Get product

**Cart**
- `GET /cart` - View cart
- `POST /cart` - Add item
- `PUT /cart/:itemId` - Update quantity
- `DELETE /cart/:itemId` - Remove item

**Orders**
- `POST /orders` - Create order
- `GET /orders` - View orders
- `GET /orders/:id` - Get order details

## Environment Setup

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5001/api
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

**Backend (.env)**
```env
NODE_ENV=development
PORT=5001
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_secret
SUPABASE_URL=your_url
SUPABASE_SECRET_KEY=your_key
```

## Build & Deploy

**Development**
```bash
cd client && npm run dev
cd server && npm run dev
```

**Production**
```bash
cd client && npm run build
cd server && npm start
```

Check [DEPLOYMENT.md](./DEPLOYMENT.md) for cloud options: Vercel, Railway, Render, Docker

**View Deployed Apps**
```bash
./open-deployment.sh
```
This automatically opens your frontend and backend in the browser.

## Security

- JWT authentication
- Password hashing (bcryptjs)
- Parameterized queries (no SQL injection)
- XSS protection
- CORS configured
- Rate limiting
- Input validation
- Helmet security headers

## Known Issues

- No payment processing (demo only)
- No admin dashboard
- No email notifications
- English only

## Roadmap

- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Product reviews
- [ ] Wishlist
- [ ] Multi-language
- [ ] 2FA
- [ ] E2E tests
- [ ] CI/CD pipeline

## Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/awesome`
3. Commit: `git commit -m 'Add: awesome feature'`
4. Push: `git push origin feature/awesome`
5. Open PR

## About

Built by **Dasha Tkachenko**

- GitHub: [@dashaaaa21](https://github.com/dashaaaa21)

---

Made with coffee and love
