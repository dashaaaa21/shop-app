import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

/**
 * Get user's wishlist
 * @route GET /api/wishlist
 * @access Private
 */
export const getWishlist = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  let wishlist = await Wishlist.findOne({ user: userId }).populate('products');

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] });
  }

  res.status(200).json({
    success: true,
    data: wishlist,
  });
});

/**
 * Add product to wishlist
 * @route POST /api/wishlist/:productId
 * @access Private
 */
export const addToWishlist = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.params;

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      products: [productId],
    });
  } else {
    // Check if product already in wishlist
    if (wishlist.products.includes(productId)) {
      return next(new AppError('Product already in wishlist', 400));
    }

    wishlist.products.push(productId);
    await wishlist.save();
  }

  await wishlist.populate('products');

  res.status(200).json({
    success: true,
    message: 'Product added to wishlist',
    data: wishlist,
  });
});

/**
 * Remove product from wishlist
 * @route DELETE /api/wishlist/:productId
 * @access Private
 */
export const removeFromWishlist = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    return next(new AppError('Wishlist not found', 404));
  }

  const productIndex = wishlist.products.indexOf(productId);

  if (productIndex === -1) {
    return next(new AppError('Product not in wishlist', 404));
  }

  wishlist.products.splice(productIndex, 1);
  await wishlist.save();
  await wishlist.populate('products');

  res.status(200).json({
    success: true,
    message: 'Product removed from wishlist',
    data: wishlist,
  });
});

/**
 * Clear wishlist
 * @route DELETE /api/wishlist
 * @access Private
 */
export const clearWishlist = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    return next(new AppError('Wishlist not found', 404));
  }

  wishlist.products = [];
  await wishlist.save();

  res.status(200).json({
    success: true,
    message: 'Wishlist cleared',
    data: wishlist,
  });
});

/**
 * Check if product is in wishlist
 * @route GET /api/wishlist/check/:productId
 * @access Private
 */
export const checkInWishlist = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const wishlist = await Wishlist.findOne({ user: userId });

  const inWishlist = wishlist ? wishlist.products.includes(productId) : false;

  res.status(200).json({
    success: true,
    data: {
      inWishlist,
    },
  });
});
