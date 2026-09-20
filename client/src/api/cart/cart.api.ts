import { supabase } from '../../lib/supabase';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:5001/api';

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  external_product_id: string;
  product_name: string;
  product_price: number;
  product_discount_price: number | null;
  product_image: string;
  product_category: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CartSummary {
  items: CartItem[];
  items_count: number;
  total_quantity: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface CartResponse {
  success: boolean;
  data: CartSummary;
  message?: string;
}

export interface CartItemResponse {
  success: boolean;
  data: CartItem;
  message?: string;
}

// Get auth token from Supabase session
const getAuthToken = async (): Promise<string | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  } catch {
    return null;
  }
};

// Build headers with authentication
const getHeaders = async (): Promise<HeadersInit> => {
  const token = await getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const cartApi = {
  // Get user's cart
  getCart: async (): Promise<CartSummary> => {
    const res = await fetch(`${API}/cart`, {
      method: 'GET',
      headers: await getHeaders()
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Failed to fetch cart' }));
      throw new Error(error.message || 'Failed to fetch cart');
    }
    
    const response: CartResponse = await res.json();
    return response.data;
  },

  // Add item to cart
  addToCart: async (productId: string, quantity: number = 1): Promise<CartItem> => {
    console.log('cartApi.addToCart called with:', { productId, quantity });
    const res = await fetch(`${API}/cart`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify({ product_id: productId, quantity })
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Failed to add item to cart' }));
      throw new Error(error.message || 'Failed to add item to cart');
    }
    
    const response: CartItemResponse = await res.json();
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (itemId: string, quantity: number): Promise<CartItem> => {
    const res = await fetch(`${API}/cart/${itemId}`, {
      method: 'PUT',
      headers: await getHeaders(),
      body: JSON.stringify({ quantity })
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Failed to update cart item' }));
      throw new Error(error.message || 'Failed to update cart item');
    }
    
    const response: CartItemResponse = await res.json();
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (itemId: string): Promise<void> => {
    const res = await fetch(`${API}/cart/${itemId}`, {
      method: 'DELETE',
      headers: await getHeaders()
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Failed to remove item from cart' }));
      throw new Error(error.message || 'Failed to remove item from cart');
    }
  },

  // Clear entire cart
  clearCart: async (): Promise<void> => {
    const res = await fetch(`${API}/cart`, {
      method: 'DELETE',
      headers: await getHeaders()
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Failed to clear cart' }));
      throw new Error(error.message || 'Failed to clear cart');
    }
  }
};