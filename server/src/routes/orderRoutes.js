import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';
import { mongoIdValidation } from '../middleware/validator.js';

const router = express.Router();

// User routes
router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, mongoIdValidation, getOrderById);
router.delete('/:id', protect, mongoIdValidation, cancelOrder);

// Admin routes
router.get('/admin/all', protect, authorize('admin'), getAllOrders);
router.put('/:id/status', protect, authorize('admin'), mongoIdValidation, updateOrderStatus);

export default router;
