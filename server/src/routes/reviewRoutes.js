import express from 'express';
import {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  markReviewHelpful,
  getMyReviews,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';
import { validateReview, mongoIdValidation } from '../middleware/validator.js';

const router = express.Router();

// Public route - get reviews for a product
router.get('/products/:productId/reviews', getProductReviews);

// Protected routes
router.use(protect);

router.get('/me', getMyReviews);
router.post('/products/:productId/reviews', validateReview, createReview);

router.route('/:id')
  .patch(validateReview, updateReview)
  .delete(deleteReview);

router.post('/:id/helpful', mongoIdValidation, markReviewHelpful);

export default router;
