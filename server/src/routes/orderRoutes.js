import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, restrictTo } from '../middleware/supabaseAuth.js';
import { 
  validateCreateOrder,
  validateOrderId,
  validateCancelOrder
} from '../middleware/validation.js';

const router = express.Router();

// User routes
router.post('/', protect, validateCreateOrder, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, validateOrderId, getOrderById);
router.delete('/:id', protect, validateCancelOrder, cancelOrder);

// Admin routes
router.get('/admin/all', protect, restrictTo('admin'), getAllOrders);
router.put('/:id/status', protect, restrictTo('admin'), validateOrderId, updateOrderStatus);

export default router;
