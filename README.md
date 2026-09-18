# VALORÉ - E-Commerce Shop

A full-stack e-commerce application built with React, TypeScript, Node.js, Express, and Supabase.


## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### Frontend
- ✅ Product catalog with filtering and search
- ✅ Shopping cart with real-time updates
- ✅ User authentication (Supabase)
- ✅ Order tracking and history
- ✅ Search functionality
- ✅ Responsive mobile design
- ✅ Error boundaries with retry
- ✅ Skeleton loaders for better UX
- ✅ Category browsing
- ✅ Product details page

### Backend
- ✅ RESTful API
- ✅ Input validation on all endpoints
- ✅ Stock management and inventory tracking
- ✅ Order processing with automatic stock deduction
- ✅ JWT token refresh mechanism
- ✅ Rate limiting
- ✅ Security middleware (CORS, Helmet)
- ✅ Error handling and logging
- ✅ Supabase integration

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Zustand** - State management
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Supabase** - Database & Auth
- **JWT** - Authentication
- **express-validator** - Input validation
- **Helmet** - Security headers

### DevOps
- **Git** - Version control
- **npm** - Package manager
- **Docker** - Containerization (optional)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone repository:**
   ```bash
   git clone https://github.com/dashaaaa21/shop-app.git
   cd shop-app
   ```

2. **Setup client:**
   ```bash
   cd client
   cp .env.example .env
   # Edit .env with your Supabase credentials
   npm install
   ```

3. **Setup server:**
   ```bash
   cd ../server
   cp .env.example .env
   # Edit .env with your environment variables
   npm install
   ```

4. **Start development:**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

5. **Open browser:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5001

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 📁 Project Structure

```
shop-app/
├── client/                          # Frontend application
│   ├── src/
│   │   ├── api/                     # API integration
│   │   │   ├── auth/                # Authentication API
│   │   │   ├── cart/                # Cart API
│   │   │   ├── orders/              # Orders API
│   │   │   └── products/            # Products API
│   │   ├── components/              # React components
│   │   │   ├── ErrorBoundary/       # Error handling
│   │   │   ├── Header/              # Navigation
│   │   │   ├── Skeleton/            # Loading states
│   │   │   ├── ProductCard/         # Product display
│   │   │   └── ...
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage/
│   │   │   ├── CartPage/
│   │   │   ├── CheckoutPage/
│   │   │   ├── OrdersPage/
│   │   │   └── SearchPage/
│   │   ├── store/                   # Zustand stores
│   │   │   ├── auth.store.ts
│   │   │   └── cart.store.ts
│   │   ├── types/                   # TypeScript types
│   │   └── App.tsx
│   ├── index.html
│   ├── package.json
│   └── tsconfig.json
│
├── server/                          # Backend API
│   ├── src/
│   │   ├── controllers/             # Route handlers
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   └── orderController.js
│   │   ├── routes/                  # API routes
│   │   ├── middleware/              # Express middleware
│   │   │   ├── supabaseAuth.js      # JWT verification
│   │   │   └── validation.js        # Input validation
│   │   ├── config/                  # Configuration
│   │   └── server.js                # Entry point
│   ├── package.json
│   └── .env.example
│
├── SETUP.md                         # Development setup guide
├── DEPLOYMENT.md                    # Production deployment guide
├── README.md                        # This file
└── package.json

```

## 🔌 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication
```
POST /auth/register     # User registration
POST /auth/login        # User login
POST /auth/logout       # User logout
POST /auth/refresh      # Token refresh
GET  /auth/me          # Get current user
```

### Products
```
GET  /products          # List all products (with filters)
GET  /products/:id      # Get product by ID
POST /products          # Create product (admin)
PUT  /products/:id      # Update product (admin)
DELETE /products/:id    # Delete product (admin)
```

### Cart
```
GET    /cart            # Get user's cart
POST   /cart            # Add item to cart
PUT    /cart/:itemId    # Update cart item quantity
DELETE /cart/:itemId    # Remove item from cart
DELETE /cart            # Clear entire cart
```

### Orders
```
POST   /orders          # Create new order
GET    /orders          # Get user's orders
GET    /orders/:id      # Get order details
DELETE /orders/:id      # Cancel order
```

See [API specification](./API.md) for detailed documentation.

## 🔐 Environment Variables

### Client (.env)
```env
VITE_API_URL=http://localhost:5001/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Server (.env)
```env
NODE_ENV=development
PORT=5001
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_SECRET_KEY=your_secret_key
```

See [SETUP.md](./SETUP.md) for detailed configuration.

## 📦 Build & Deploy

### Development
```bash
# Frontend
cd client && npm run dev

# Backend
cd server && npm run dev
```

### Production Build
```bash
# Frontend
cd client && npm run build

# Backend (no build needed, runs directly)
cd server && npm start
```

### Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Vercel (Frontend)
- Railway (Full Stack)
- Render (Backend)
- Docker (Self-hosted)

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## 📊 Performance

- Skeleton loaders for perceived performance
- Image optimization
- Lazy loading for routes
- Gzip compression on server
- CDN-ready static assets
- Database query optimization

## 🔒 Security

- ✅ JWT authentication
- ✅ Password hashing (bcryptjs)
- ✅ SQL injection protection (parameterized queries)
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Input validation
- ✅ Security headers (Helmet)
- ✅ Environment variable management

## 🐛 Known Issues

- No payment processing (placeholder only)
- No admin dashboard UI
- No email notifications
- No multi-language support

## 🚧 Roadmap

- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Multi-language support
- [ ] Two-factor authentication
- [ ] API rate limit increase
- [ ] Automated testing
- [ ] CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 👤 Author

**Dasha Tkachenko**
- GitHub: [@dashaaaa21](https://github.com/dashaaaa21)

