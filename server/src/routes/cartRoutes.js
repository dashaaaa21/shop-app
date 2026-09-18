import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/supabaseAuth.js';
import {
  validateAddToCart,
  validateUpdateCartItem,
  validateRemoveCartItem
} from '../middleware/validation.js';

const router = express.Router();

// All cart routes require authentication
router.get('/', protect, getCart);           // GET /api/cart
router.post('/', protect, validateAddToCart, addToCart);        // POST /api/cart
router.put('/:itemId', protect, validateUpdateCartItem, updateCartItem);  // PUT /api/cart/:itemId
router.delete('/:itemId', protect, validateRemoveCartItem, removeFromCart); // DELETE /api/cart/:itemId
router.delete('/', protect, clearCart);      // DELETE /api/cart

export default router;
