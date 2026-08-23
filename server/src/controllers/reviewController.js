import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

/**
 * Get all reviews for a product
 * @route GET /api/products/:productId/reviews
 * @access Public
 */
export const getProductReviews = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

  const skip = (page - 1) * limit;

  const reviews = await Review.find({ product: productId })
    .populate('user', 'firstName lastName avatar')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Review.countDocuments({ product: productId });

  res.status(200).json({
    success: true,
    data: {
      reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

/**
 * Create a review for a product
 * @route POST /api/products/:productId/reviews
 * @access Private
 */
export const createReview = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  // Check if user has purchased this product
  const hasPurchased = await Order.exists({
    userId,
    'items.product': productId,
    status: { $in: ['delivered'] },
  });

  if (!hasPurchased) {
    return next(
      new AppError('You can only review products you have purchased', 403)
    );
  }

  // Check if user has already reviewed this product
  const existingReview = await Review.findOne({ product: productId, user: userId });
  if (existingReview) {
    return next(new AppError('You have already reviewed this product', 400));
  }

  // Create review
  const review = await Review.create({
    product: productId,
    user: userId,
    rating,
    comment,
  });

  await review.populate('user', 'firstName lastName avatar');

  res.status(201).json({
    success: true,
    message: 'Review created successfully',
    data: review,
  });
});

/**
 * Update a review
 * @route PATCH /api/reviews/:id
 * @access Private
 */
export const updateReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  const review = await Review.findById(id);

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  // Check if review belongs to user
  if (review.user.toString() !== userId) {
    return next(new AppError('Not authorized to update this review', 403));
  }

  if (rating) review.rating = rating;
  if (comment) review.comment = comment;

  await review.save();
  await review.populate('user', 'firstName lastName avatar');

  res.status(200).json({
    success: true,
    message: 'Review updated successfully',
    data: review,
  });
});

/**
 * Delete a review
 * @route DELETE /api/reviews/:id
 * @access Private
 */
export const deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const review = await Review.findById(id);

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  // Check if review belongs to user or user is admin
  if (review.user.toString() !== userId && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to delete this review', 403));
  }

  await Review.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully',
  });
});

/**
 * Mark review as helpful
 * @route POST /api/reviews/:id/helpful
 * @access Private
 */
export const markReviewHelpful = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  review.helpful += 1;
  await review.save();

  res.status(200).json({
    success: true,
    message: 'Review marked as helpful',
    data: review,
  });
});

/**
 * Get user's reviews
 * @route GET /api/reviews/me
 * @access Private
 */
export const getMyReviews = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const reviews = await Review.find({ user: userId })
    .populate('product', 'name images price')
    .sort('-createdAt')
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Review.countDocuments({ user: userId });

  res.status(200).json({
    success: true,
    data: {
      reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});
