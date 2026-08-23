import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkInWishlist,
} from '../controllers/wishlistController.js';
import { protect } from '../middleware/auth.js';
import { mongoIdValidation } from '../middleware/validator.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getWishlist)
  .delete(clearWishlist);

router.get('/check/:productId', mongoIdValidation, checkInWishlist);

router.route('/:productId')
  .post(mongoIdValidation, addToWishlist)
  .delete(mongoIdValidation, removeFromWishlist);

export default router;
