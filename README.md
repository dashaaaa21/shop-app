# Shop Application

Full-stack e-commerce application built with React, TypeScript, Node.js, and MongoDB.

## Features

- Product catalog with filtering and search
- Shopping cart functionality
- User authentication (JWT)
- Order management
- Admin panel for product management
- Responsive design

## Technologies

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Zustand (State Management)
- Axios
- CSS Modules

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Project Structure

```
shop-app/
├── client/          # Frontend React application
│   ├── src/
│   │   ├── api/           # API integration
│   │   ├── components/    # React components
│   │   ├── store/         # Zustand stores
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS styles
│   └── package.json
├── server/          # Backend API
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── config/        # Configuration files
│   │   └── utils/         # Utility functions
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/dashaaaa21/shop-app.git
cd shop-app
```

2. Install server dependencies
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your configuration
```

3. Install client dependencies
```bash
cd ../client
npm install
cp .env.example .env
# Edit .env with your API URL
```

### Running the Application

1. Start MongoDB service

2. Start the backend server
```bash
cd server
npm run dev
```
Server will run on http://localhost:5000

3. Start the frontend development server
```bash
cd client
npm run dev
```
Client will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

## Environment Variables

See `.env.example` files in `client/` and `server/` directories for required environment variables.

## License

MIT
