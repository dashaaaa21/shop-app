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

const router = express.Router();

// User routes
router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrderById);
router.delete('/:id', protect, cancelOrder);

// Admin routes
router.get('/admin/all', protect, restrictTo('admin'), getAllOrders);
router.put('/:id/status', protect, restrictTo('admin'), updateOrderStatus);

export default router;
