import { supabaseAdmin } from '../config/supabase.js';

/**
 * GET /api/cart
 * Returns user's cart items with totals
 */
export const getCart = async (req, res, next) => {
  try {
    // Get user's cart items
    const { data: cartItems, error: itemsError } = await supabaseAdmin
      .from('cart_items')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: true });

    if (itemsError) {
      return res.status(400).json({ message: itemsError.message });
    }

    // Get cart summary (totals)
    const { data: summary, error: summaryError } = await supabaseAdmin
      .from('user_cart_summary')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    if (summaryError && summaryError.code !== 'PGRST116') { // PGRST116 = no rows found
      return res.status(400).json({ message: summaryError.message });
    }

    // If no items, return empty cart with zero totals
    if (!cartItems || cartItems.length === 0) {
      return res.json({
        success: true,
        data: {
          items: [],
          items_count: 0,
          total_quantity: 0,
          subtotal: 0,
          tax: 0,
          shipping: 8, // Default shipping for empty cart
          total: 8
        }
      });
    }

    res.json({
      success: true,
      data: {
        items: cartItems,
        items_count: summary?.items_count || 0,
        total_quantity: summary?.total_quantity || 0,
        subtotal: parseFloat(summary?.subtotal || '0'),
        tax: parseFloat(summary?.tax || '0'),
        shipping: parseFloat(summary?.shipping || '8'),
        total: parseFloat(summary?.total || '8')
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/cart
 * Add item to cart (or update quantity if exists)
 */
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    // Get product details for snapshot
    let product;
    
    // Try UUID first, then external_id
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const field = uuidRegex.test(productId) ? 'id' : 'external_id';
    
    const { data: productData, error: productError } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq(field, productId)
      .single();

    if (productError || !productData) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product = productData;

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Only ${product.stock} items available.`
      });
    }

    // Check if item already exists in cart
    const { data: existingItem, error: checkError } = await supabaseAdmin
      .from('cart_items')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('product_id', product.id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      return res.status(400).json({ message: checkError.message });
    }

    if (existingItem) {
      // Update existing item quantity
      const newQuantity = existingItem.quantity + quantity;
      
      if (product.stock < newQuantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock. Only ${product.stock} items available.`
        });
      }

      const { data: updatedItem, error: updateError } = await supabaseAdmin
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id)
        .select()
        .single();

      if (updateError) {
        return res.status(400).json({ message: updateError.message });
      }

      return res.json({
        success: true,
        message: 'Cart updated successfully',
        data: updatedItem
      });
    } else {
      // Add new item to cart
      const cartItem = {
        user_id: req.user.id,
        product_id: product.id,
        external_product_id: product.external_id,
        product_name: product.name,
        product_price: product.price,
        product_discount_price: product.discount_price,
        product_image: product.images?.[0] || 'https://via.placeholder.com/300x300?text=Product',
        product_category: product.category,
        quantity
      };

      const { data: newItem, error: insertError } = await supabaseAdmin
        .from('cart_items')
        .insert(cartItem)
        .select()
        .single();

      if (insertError) {
        return res.status(400).json({ message: insertError.message });
      }

      return res.status(201).json({
        success: true,
        message: 'Item added to cart successfully',
        data: newItem
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/cart/:itemId
 * Update cart item quantity
 */
export const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    // Get cart item and verify ownership
    const { data: cartItem, error: itemError } = await supabaseAdmin
      .from('cart_items')
      .select('*, products!cart_items_product_id_fkey(stock)')
      .eq('id', itemId)
      .eq('user_id', req.user.id) // Ensure user owns this item
      .single();

    if (itemError || !cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    // Check stock availability
    const productStock = cartItem.products?.stock || 0;
    if (productStock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Only ${productStock} items available.`
      });
    }

    // Update quantity
    const { data: updatedItem, error: updateError } = await supabaseAdmin
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select()
      .single();

    if (updateError) {
      return res.status(400).json({ message: updateError.message });
    }

    res.json({
      success: true,
      message: 'Cart item updated successfully',
      data: updatedItem
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/cart/:itemId
 * Remove item from cart
 */
export const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    // Delete item and verify ownership
    const { data: deletedItem, error: deleteError } = await supabaseAdmin
      .from('cart_items')
      .delete()
      .eq('id', itemId)
      .eq('user_id', req.user.id) // Ensure user owns this item
      .select()
      .single();

    if (deleteError || !deletedItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item removed from cart successfully',
      data: deletedItem
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/cart
 * Clear entire cart
 */
export const clearCart = async (req, res, next) => {
  try {
    const { data: deletedItems, error: deleteError } = await supabaseAdmin
      .from('cart_items')
      .delete()
      .eq('user_id', req.user.id)
      .select();

    if (deleteError) {
      return res.status(400).json({ message: deleteError.message });
    }

    res.json({
      success: true,
      message: `Cleared ${deletedItems?.length || 0} items from cart`,
      data: { cleared_count: deletedItems?.length || 0 }
    });
  } catch (error) {
    next(error);
  }
};