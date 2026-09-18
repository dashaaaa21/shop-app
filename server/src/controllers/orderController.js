import { supabaseAdmin } from '../config/supabase.js';

/**
 * POST /api/orders
 * Body: { items: [{productId, productName, productImage, quantity, price}], shippingAddress, paymentMethod }
 */
export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    // ✅ Step 1: Verify stock availability for all items
    const stockChecks = await Promise.all(
      items.map(async (item) => {
        const { data: product, error } = await supabaseAdmin
          .from('products')
          .select('stock')
          .eq('id', item.productId)
          .single();

        if (error || !product) {
          return { available: false, productId: item.productId, reason: 'Product not found' };
        }
        if (product.stock < item.quantity) {
          return { available: false, productId: item.productId, reason: `Insufficient stock. Available: ${product.stock}` };
        }
        return { available: true, productId: item.productId };
      })
    );

    // Check if all items have sufficient stock
    const unavailableItems = stockChecks.filter(check => !check.available);
    if (unavailableItems.length > 0) {
      return res.status(400).json({
        message: 'Insufficient stock for some items',
        unavailableItems,
      });
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = parseFloat((subtotal * 0.1).toFixed(2));
    const shipping = subtotal > 100 ? 0 : 10;
    const total = parseFloat((subtotal + tax + shipping).toFixed(2));

    // ✅ Step 2: Create order
    const { data: order, error: orderErr } = await supabaseAdmin
      .from('orders')
      .insert({
        user_id: req.user.id,
        status: 'pending',
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax,
        shipping,
        total,
        shipping_address: shippingAddress ?? null,
        payment_method: paymentMethod ?? null,
      })
      .select()
      .single();

    if (orderErr) return res.status(400).json({ message: orderErr.message });

    // ✅ Step 3: Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      product_image: item.productImage ?? null,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsErr } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems);

    if (itemsErr) {
      // Rollback: Delete the order if items creation fails
      await supabaseAdmin.from('orders').delete().eq('id', order.id);
      return res.status(400).json({ message: 'Failed to create order items' });
    }

    // ✅ Step 4: Deduct stock from products
    const stockUpdateErrors = [];
    for (const item of items) {
      const { error: updateErr } = await supabaseAdmin
        .from('products')
        .update({ stock: supabaseAdmin.rpc('decrement_stock', { product_id: item.productId, quantity: item.quantity }) })
        .eq('id', item.productId);

      // Fallback: Manual update if RPC fails
      if (updateErr) {
        const { data: product } = await supabaseAdmin
          .from('products')
          .select('stock')
          .eq('id', item.productId)
          .single();

        const { error: manualErr } = await supabaseAdmin
          .from('products')
          .update({ stock: Math.max(0, (product?.stock ?? 0) - item.quantity) })
          .eq('id', item.productId);

        if (manualErr) {
          stockUpdateErrors.push({ productId: item.productId, error: manualErr.message });
        }
      }
    }

    // Log stock update errors but don't fail order creation
    if (stockUpdateErrors.length > 0) {
      console.warn('⚠️ Stock update errors:', stockUpdateErrors);
    }

    // Return full order with items
    const { data: fullOrder } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', order.id)
      .single();

    res.status(201).json({ data: fullOrder });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/orders
 * Returns all orders for the authenticated user.
 */
export const getUserOrders = async (req, res, next) => {
  try {
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ message: error.message });

    res.json({ data: orders });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/orders/:id
 */
export const getOrderById = async (req, res, next) => {
  try {
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', req.params.id)
      .single();

    if (error || !order) return res.status(404).json({ message: 'Order not found' });

    if (order.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({ data: order });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/orders/:id/status  (admin only)
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const valid = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!valid.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) return res.status(400).json({ message: error.message });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/orders/:id  (cancel)
 */
export const cancelOrder = async (req, res, next) => {
  try {
    const { data: order, error: fetchErr } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', req.params.id)
      .single();

    if (fetchErr || !order) return res.status(404).json({ message: 'Order not found' });
    if (order.user_id !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    if (!['pending', 'processing'].includes(order.status)) {
      return res.status(400).json({ message: 'Cannot cancel order with current status' });
    }

    // ✅ Step 1: Restore stock for all items
    if (order.order_items && order.order_items.length > 0) {
      for (const item of order.order_items) {
        const { data: product } = await supabaseAdmin
          .from('products')
          .select('stock')
          .eq('id', item.product_id)
          .single();

        const newStock = (product?.stock ?? 0) + item.quantity;
        await supabaseAdmin
          .from('products')
          .update({ stock: newStock })
          .eq('id', item.product_id);
      }
    }

    // ✅ Step 2: Update order status
    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) return res.status(400).json({ message: error.message });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/orders/admin/all  (admin only)
 */
export const getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabaseAdmin
      .from('orders')
      .select('*, order_items(*)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (status) query = query.eq('status', status);

    const { data, error, count } = await query;
    if (error) return res.status(400).json({ message: error.message });

    res.json({ data, total: count, page, limit });
  } catch (err) {
    next(err);
  }
};
