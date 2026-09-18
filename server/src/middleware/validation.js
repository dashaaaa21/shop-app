import { body, param, query, validationResult } from 'express-validator';

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation error',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

// ──────────────────────────────────────────────────────
// PRODUCTS VALIDATION
// ──────────────────────────────────────────────────────

export const validateCreateProduct = [
  body('name')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Name must be 3-255 characters'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('discount_price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discount price must be a positive number'),
  
  body('category')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  
  body('gender')
    .isIn(['women', 'men', null])
    .withMessage('Gender must be "women", "men", or null'),
  
  body('description')
    .optional()
    .isString()
    .trim(),
  
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  
  handleValidationErrors,
];

export const validateUpdateProduct = [
  param('id')
    .notEmpty()
    .withMessage('Product ID is required'),
  
  body('name')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Name must be 3-255 characters'),
  
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('discount_price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discount price must be a positive number'),
  
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  
  handleValidationErrors,
];

export const validateProductId = [
  param('id')
    .notEmpty()
    .withMessage('Product ID is required'),
  
  handleValidationErrors,
];

// ──────────────────────────────────────────────────────
// CART VALIDATION
// ──────────────────────────────────────────────────────

export const validateAddToCart = [
  body('product_id')
    .notEmpty()
    .withMessage('Product ID is required'),
  
  body('quantity')
    .isInt({ min: 1, max: 999 })
    .withMessage('Quantity must be between 1 and 999'),
  
  handleValidationErrors,
];

export const validateUpdateCartItem = [
  body('quantity')
    .isInt({ min: 1, max: 999 })
    .withMessage('Quantity must be between 1 and 999'),
  
  handleValidationErrors,
];

export const validateRemoveCartItem = [
  param('itemId')
    .notEmpty()
    .withMessage('Item ID is required'),
  
  handleValidationErrors,
];

// ──────────────────────────────────────────────────────
// ORDER VALIDATION
// ──────────────────────────────────────────────────────

export const validateCreateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least 1 item'),
  
  body('items.*.product_id')
    .notEmpty()
    .withMessage('Product ID is required in each item'),
  
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  
  body('items.*.price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('shipping_address')
    .notEmpty()
    .withMessage('Shipping address is required'),
  
  body('shipping_address.firstName')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('First name is required'),
  
  body('shipping_address.lastName')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Last name is required'),
  
  body('shipping_address.address')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  
  body('shipping_address.city')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  
  body('shipping_address.zipCode')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Zip code is required'),
  
  body('shipping_address.country')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  
  body('payment_method')
    .isIn(['card', 'bank', 'mobile', 'cash'])
    .withMessage('Payment method must be: card, bank, mobile, or cash'),
  
  body('subtotal')
    .isFloat({ min: 0 })
    .withMessage('Subtotal must be a positive number'),
  
  body('tax')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Tax must be a positive number'),
  
  body('shipping')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Shipping must be a positive number'),
  
  body('total')
    .isFloat({ min: 0 })
    .withMessage('Total must be a positive number'),
  
  handleValidationErrors,
];

export const validateOrderId = [
  param('id')
    .notEmpty()
    .withMessage('Order ID is required'),
  
  handleValidationErrors,
];

export const validateCancelOrder = [
  param('id')
    .notEmpty()
    .withMessage('Order ID is required'),
  
  handleValidationErrors,
];

// ──────────────────────────────────────────────────────
// SEARCH VALIDATION
// ──────────────────────────────────────────────────────

export const validateSearchQuery = [
  query('search')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search query must be max 100 characters'),
  
  query('gender')
    .optional()
    .isIn(['women', 'men'])
    .withMessage('Gender must be "women" or "men"'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be at least 1'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Min price must be a positive number'),
  
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Max price must be a positive number'),
  
  handleValidationErrors,
];
