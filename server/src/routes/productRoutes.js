import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, restrictTo } from '../middleware/supabaseAuth.js';
import { 
  validateCreateProduct, 
  validateUpdateProduct, 
  validateProductId,
  validateSearchQuery 
} from '../middleware/validation.js';

const router = express.Router();

router.get('/', validateSearchQuery, getAllProducts);
router.get('/:id', validateProductId, getProductById);

// Admin only routes
router.post('/', protect, restrictTo('admin'), validateCreateProduct, createProduct);
router.put('/:id', protect, restrictTo('admin'), validateUpdateProduct, updateProduct);
router.delete('/:id', protect, restrictTo('admin'), validateProductId, deleteProduct);

export default router;
