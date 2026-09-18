# VALORÉ - E-Commerce Shop

Modern e-commerce platform I built with React, TypeScript, Node.js, Express, and Supabase. Fast, secure, and made to actually work for both users and developers.

## Quick Links

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Docs](#api-docs)
- [Deploy](#deploy)

## Features

**Frontend**
- Product catalog with filtering & search
- Real-time shopping cart
- Supabase authentication
- Order tracking & history
- Mobile-responsive design
- Error handling & skeleton loaders
- Category browsing

**Backend**
- Clean REST API
- Input validation on all endpoints
- Stock management & inventory tracking
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
- `POST /auth/register` - Sign up
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
