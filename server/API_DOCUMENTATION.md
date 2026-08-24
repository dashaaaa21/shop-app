# Shop API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

---

## Authentication Endpoints

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "customer"
    }
  }
}
```

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

### Get Current User
```http
GET /api/auth/me
```
*Requires authentication*

---

## Product Endpoints

### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `category` (string): Filter by category
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `search` (string): Search in name and description
- `sort` (string): Sort field (price, -price, createdAt, -createdAt)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

### Get Product by ID
```http
GET /api/products/:id
```

### Create Product (Admin)
```http
POST /api/products
```
*Requires authentication and admin role*

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "discountPrice": 79.99,
  "category": "Electronics",
  "stock": 50,
  "images": ["url1", "url2"]
}
```

### Update Product (Admin)
```http
PATCH /api/products/:id
```
*Requires authentication and admin role*

### Delete Product (Admin)
```http
DELETE /api/products/:id
```
*Requires authentication and admin role*

---

## Cart Endpoints

### Get Cart
```http
GET /api/cart
```
*Requires authentication*

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "item_id",
        "product": {
          "id": "product_id",
          "name": "Product Name",
          "price": 99.99,
          "images": ["url"]
        },
        "quantity": 2,
        "subtotal": 199.98
      }
    ],
    "total": 199.98,
    "itemsCount": 1
  }
}
```

### Add to Cart
```http
POST /api/cart/items
```
*Requires authentication*

**Request Body:**
```json
{
  "productId": "product_id",
  "quantity": 1
}
```

### Update Cart Item
```http
PATCH /api/cart/items/:itemId
```
*Requires authentication*

**Request Body:**
```json
{
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /api/cart/items/:itemId
```
*Requires authentication*

### Clear Cart
```http
DELETE /api/cart
```
*Requires authentication*

---

## Order Endpoints

### Create Order
```http
POST /api/orders
```
*Requires authentication*

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  },
  "paymentMethod": "credit_card"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "order_id",
    "userId": "user_id",
    "items": [...],
    "subtotal": 199.98,
    "tax": 19.99,
    "shipping": 10.00,
    "total": 229.97,
    "status": "pending",
    "shippingAddress": {...},
    "paymentMethod": "credit_card"
  }
}
```

### Get User Orders
```http
GET /api/orders
```
*Requires authentication*

**Query Parameters:**
- `status` (string): Filter by status (pending, processing, shipped, delivered, cancelled)
- `page` (number): Page number
- `limit` (number): Items per page

### Get Order by ID
```http
GET /api/orders/:id
```
*Requires authentication*

### Cancel Order
```http
DELETE /api/orders/:id
```
*Requires authentication*

### Update Order Status (Admin)
```http
PATCH /api/orders/:id/status
```
*Requires authentication and admin role*

**Request Body:**
```json
{
  "status": "shipped"
}
```

### Get All Orders (Admin)
```http
GET /api/orders/admin/all
```
*Requires authentication and admin role*

### Get Order Statistics (Admin)
```http
GET /api/orders/admin/stats
```
*Requires authentication and admin role*

---

## Review Endpoints

### Get Product Reviews
```http
GET /api/reviews/products/:productId/reviews
```

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `sort` (string): Sort field (default: -createdAt)

### Create Review
```http
POST /api/reviews/products/:productId/reviews
```
*Requires authentication*

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent product! Highly recommended."
}
```

**Note:** User must have purchased the product to leave a review.

### Update Review
```http
PATCH /api/reviews/:id
```
*Requires authentication*

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated review text"
}
```

### Delete Review
```http
DELETE /api/reviews/:id
```
*Requires authentication*

### Mark Review as Helpful
```http
POST /api/reviews/:id/helpful
```
*Requires authentication*

### Get My Reviews
```http
GET /api/reviews/me
```
*Requires authentication*

---

## Wishlist Endpoints

### Get Wishlist
```http
GET /api/wishlist
```
*Requires authentication*

**Response:**
```json
{
  "success": true,
  "data": {
    "user": "user_id",
    "products": [
      {
        "id": "product_id",
        "name": "Product Name",
        "price": 99.99,
        "images": ["url"]
      }
    ]
  }
}
```

### Add to Wishlist
```http
POST /api/wishlist/:productId
```
*Requires authentication*

### Remove from Wishlist
```http
DELETE /api/wishlist/:productId
```
*Requires authentication*

### Clear Wishlist
```http
DELETE /api/wishlist
```
*Requires authentication*

### Check if Product in Wishlist
```http
GET /api/wishlist/check/:productId
```
*Requires authentication*

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

The API implements rate limiting:
- **General endpoints:** 100 requests per 15 minutes per IP
- **Auth endpoints:** 5 requests per 15 minutes per IP

---

## Categories

Available product categories:
- Electronics
- Clothing
- Books
- Home & Garden
- Sports & Outdoors
- Toys & Games
- Health & Beauty
- Automotive
- Food & Beverage
- Office Supplies

---

## Order Statuses

Available order statuses:
- `pending` - Order created, awaiting processing
- `processing` - Order is being prepared
- `shipped` - Order has been shipped
- `delivered` - Order has been delivered
- `cancelled` - Order has been cancelled
