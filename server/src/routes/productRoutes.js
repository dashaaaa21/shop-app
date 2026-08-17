import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin only routes
router.post('/', protect, restrictTo('admin'), createProduct);
router.put('/:id', protect, restrictTo('admin'), updateProduct);
router.delete('/:id', protect, restrictTo('admin'), deleteProduct);

export default router;
