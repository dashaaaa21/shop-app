import Product from '../models/Product.js';

// In-memory cart storage (in production, use Redis or database)
const userCarts = new Map();

// Helper function to get user's cart
const getUserCart = (userId) => {
  if (!userCarts.has(userId)) {
    userCarts.set(userId, []);
  }
  return userCarts.get(userId);
};

// Helper function to calculate cart totals
const calculateCartTotals = (cartItems) => {
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return { subtotal, tax, shipping, total };
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    const cart = getUserCart(req.user._id.toString());

    // Populate product details
    const cartWithProducts = [];
    for (const item of cart) {
      const product = await Product.findById(item.productId);
      if (product) {
        cartWithProducts.push({
          product: {
            _id: product._id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            images: product.images,
            stock: product.stock,
          },
          quantity: item.quantity,
        });
      }
    }

    const totals = calculateCartTotals(cartWithProducts);

    res.status(200).json({
      success: true,
      data: {
        items: cartWithProducts,
        ...totals,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    const cart = getUserCart(req.user._id.toString());

    // Check if item already in cart
    const existingItemIndex = cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart[existingItemIndex].quantity + quantity;
      if (product.stock < newQuantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock',
        });
      }
      cart[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item
      cart.push({ productId, quantity });
    }

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    const cart = getUserCart(req.user._id.toString());
    const itemIndex = cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    cart[itemIndex].quantity = quantity;

    res.status(200).json({
      success: true,
      message: 'Cart updated',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = getUserCart(req.user._id.toString());
    const itemIndex = cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    cart.splice(itemIndex, 1);

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res, next) => {
  try {
    userCarts.set(req.user._id.toString(), []);

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
    });
  } catch (error) {
    next(error);
  }
};
