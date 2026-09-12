import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/supabaseAuth.js';

const router = express.Router();

// All cart routes require authentication
router.get('/', protect, getCart);           // GET /api/cart
router.post('/', protect, addToCart);        // POST /api/cart
router.put('/:itemId', protect, updateCartItem);  // PUT /api/cart/:itemId (changed from :productId)
router.delete('/:itemId', protect, removeFromCart); // DELETE /api/cart/:itemId (changed from :productId)
router.delete('/', protect, clearCart);      // DELETE /api/cart

export default router;
