import { create } from 'zustand';
import { cartApi, type CartItem, type CartSummary } from '../api/cart/cart.api';
import { useAuthStore } from './auth.store';

interface CartState extends CartSummary {
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  clearError: () => void;
  
  // Helpers
  getItemsCount: () => number;
  getItemByProductId: (productId: string) => CartItem | undefined;
}

const initialState: CartSummary = {
  items: [],
  items_count: 0,
  total_quantity: 0,
  subtotal: 0,
  tax: 0,
  shipping: 8,
  total: 8
};

export const useCartStore = create<CartState>((set, get) => ({
  ...initialState,
  loading: false,
  error: null,

  fetchCart: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    
    if (!isAuthenticated) {
      set({ ...initialState, loading: false, error: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      const cartData = await cartApi.getCart();
      set({ 
        ...cartData,
        loading: false, 
        error: null 
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch cart';
      set({ 
        ...initialState,
        loading: false, 
        error: message 
      });
      throw error;
    }
  },

  addToCart: async (productId, quantity = 1) => {
    const { isAuthenticated } = useAuthStore.getState();
    
    if (!isAuthenticated) {
      throw new Error('Please login to add items to cart');
    }

    set({ loading: true, error: null });
    try {
      await cartApi.addToCart(productId, quantity);
      // Refresh cart after adding
      await get().fetchCart();
    } catch (error) {
      set({ loading: false });
      const message = error instanceof Error ? error.message : 'Failed to add item to cart';
      set({ error: message });
      throw error;
    }
  },

  updateQuantity: async (itemId, quantity) => {
    if (quantity <= 0) {
      await get().removeFromCart(itemId);
      return;
    }

    set({ loading: true, error: null });
    try {
      await cartApi.updateCartItem(itemId, quantity);
      // Refresh cart after updating
      await get().fetchCart();
    } catch (error) {
      set({ loading: false });
      const message = error instanceof Error ? error.message : 'Failed to update cart item';
      set({ error: message });
      throw error;
    }
  },

  removeFromCart: async (itemId) => {
    set({ loading: true, error: null });
    try {
      await cartApi.removeFromCart(itemId);
      // Refresh cart after removing
      await get().fetchCart();
    } catch (error) {
      set({ loading: false });
      const message = error instanceof Error ? error.message : 'Failed to remove item from cart';
      set({ error: message });
      throw error;
    }
  },

  clearCart: async () => {
    set({ loading: true, error: null });
    try {
      await cartApi.clearCart();
      set({ 
        ...initialState,
        loading: false, 
        error: null 
      });
    } catch (error) {
      set({ loading: false });
      const message = error instanceof Error ? error.message : 'Failed to clear cart';
      set({ error: message });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  getItemsCount: () => {
    const state = get();
    return state.total_quantity || 0;
  },

  getItemByProductId: (productId) => {
    const state = get();
    return state.items.find(item => 
      item.product_id === productId || item.external_product_id === productId
    );
  }
}));
