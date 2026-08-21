import { api } from '../axios';
import { CartItem } from '@/types/cart.types';

export interface CartResponse {
  success: boolean;
  data: {
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export const cartApi = {
  // Get user's cart
  getCart: async (): Promise<CartResponse> => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Add item to cart
  addToCart: async (data: AddToCartRequest) => {
    const response = await api.post('/cart', data);
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (productId: string, data: UpdateCartItemRequest) => {
    const response = await api.put(`/cart/${productId}`, data);
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (productId: string) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
  },

  // Clear cart
  clearCart: async () => {
    const response = await api.delete('/cart');
    return response.data;
  },
};
