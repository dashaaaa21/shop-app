# Shop Backend API

Professional e-commerce backend API built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Customer, Admin)
  - Secure password hashing with bcrypt

- **Product Management**
  - Full CRUD operations
  - Advanced filtering, sorting, and pagination
  - Category-based organization
  - Image support
  - Stock management

- **Shopping Cart**
  - Add/update/remove items
  - Real-time stock validation
  - Automatic total calculation

- **Order Management**
  - Order creation and tracking
  - Order status updates
  - Order history
  - Admin order management
  - Automatic stock adjustment

- **Reviews & Ratings**
  - Product reviews (verified purchases only)
  - Star ratings
  - Automatic average rating calculation
  - Helpful review marking

- **Wishlist**
  - Save favorite products
  - Quick wishlist management

- **Security Features**
  - Helmet.js for HTTP headers security
  - Rate limiting
  - XSS protection
  - MongoDB sanitization
  - CORS configuration
  - Input validation

- **Developer Experience**
  - Comprehensive error handling
  - Request logging with Morgan
  - Environment-based configuration
  - Clean code architecture

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/shop
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRES_IN=7d
   
   # Client
   CLIENT_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud database
   ```

5. **Run the application**
   
   Development mode:
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
server/
├── src/
│   ├── config/           # Configuration files
│   │   └── db.js        # Database connection
│   ├── constants/        # Application constants
│   ├── controllers/      # Route controllers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── reviewController.js
│   │   └── wishlistController.js
│   ├── middleware/       # Custom middleware
│   │   ├── auth.js      # Authentication middleware
│   │   ├── errorHandler.js
│   │   ├── security.js   # Security middleware
│   │   └── validator.js  # Input validation
│   ├── models/          # Mongoose models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   └── Wishlist.js
│   ├── routes/          # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── wishlistRoutes.js
│   ├── utils/           # Utility functions
│   │   ├── AppError.js  # Custom error class
│   │   ├── catchAsync.js # Async error handler
│   │   ├── jwt.js       # JWT utilities
│   │   └── logger.js    # Logging utilities
│   └── server.js        # Application entry point
├── logs/                # Application logs
├── .env                 # Environment variables
├── .env.example         # Example environment variables
├── package.json
├── API_DOCUMENTATION.md # API documentation
└── README.md
```

## 🔑 API Endpoints

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API documentation.

### Quick Overview

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/auth/register` | POST | Register new user | No |
| `/api/auth/login` | POST | Login user | No |
| `/api/auth/me` | GET | Get current user | Yes |
| `/api/products` | GET | Get all products | No |
| `/api/products/:id` | GET | Get product by ID | No |
| `/api/products` | POST | Create product | Admin |
| `/api/cart` | GET | Get cart | Yes |
| `/api/cart/items` | POST | Add to cart | Yes |
| `/api/orders` | GET | Get user orders | Yes |
| `/api/orders` | POST | Create order | Yes |
| `/api/reviews/products/:id/reviews` | GET | Get product reviews | No |
| `/api/reviews/products/:id/reviews` | POST | Create review | Yes |
| `/api/wishlist` | GET | Get wishlist | Yes |
| `/api/wishlist/:productId` | POST | Add to wishlist | Yes |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Roles

- **Customer** - Regular user with basic permissions
- **Admin** - Full access to all resources

## 🧪 Testing

You can test the API using:

1. **Postman/Insomnia**
   - Import the API endpoints from the documentation
   - Set up authentication tokens

2. **cURL**
   ```bash
   # Register
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com","password":"SecurePass123","firstName":"John","lastName":"Doe"}'
   
   # Get products
   curl http://localhost:5000/api/products
   ```

## 🛡️ Security

The application implements multiple security measures:

- **Helmet.js** - Sets secure HTTP headers
- **Rate Limiting** - Prevents brute force attacks
- **XSS Protection** - Sanitizes user input
- **NoSQL Injection Prevention** - MongoDB sanitization
- **CORS** - Cross-Origin Resource Sharing configuration
- **Password Hashing** - Bcrypt with salt rounds
- **JWT** - Secure token-based authentication

## 📊 Database Models

### User
- Email (unique, required)
- Password (hashed, required)
- First Name, Last Name
- Role (customer/admin)
- Avatar, Phone

### Product
- Name, Description
- Price, Discount Price
- Category
- Images (array)
- Stock
- Rating, Reviews Count

### Order
- User reference
- Items (product, quantity, price)
- Subtotal, Tax, Shipping, Total
- Status (pending/processing/shipped/delivered/cancelled)
- Shipping Address
- Payment Method

### Review
- Product reference
- User reference
- Rating (1-5)
- Comment
- Helpful count

### Wishlist
- User reference
- Products (array)

## 🚦 Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [...]
}
```

## 📝 Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:3000 |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Developer Notes

### Code Style
- Use ES6+ features
- Follow async/await pattern
- Use meaningful variable names
- Add comments for complex logic

### Best Practices
- Always validate user input
- Use proper HTTP status codes
- Handle errors gracefully
- Keep controllers thin, business logic in services
- Use middleware for reusable logic

### Performance Tips
- Use database indexes
- Implement caching (Redis) for frequently accessed data
- Paginate large result sets
- Use MongoDB aggregation for complex queries

## 🔄 Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Product search with Elasticsearch
- [ ] Caching with Redis
- [ ] Real-time notifications with WebSockets
- [ ] Image upload to cloud storage (AWS S3, Cloudinary)
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Multi-language support
- [ ] Automated testing (Jest, Supertest)

## 📞 Support

For questions or issues, please open an issue in the repository.
