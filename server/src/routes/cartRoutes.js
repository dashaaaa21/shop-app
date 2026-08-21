import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';
import { mongoIdValidation } from '../middleware/validator.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/:productId', protect, mongoIdValidation, updateCartItem);
router.delete('/:productId', protect, mongoIdValidation, removeFromCart);
router.delete('/', protect, clearCart);

export default router;
