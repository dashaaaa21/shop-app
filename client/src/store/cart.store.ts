import { create } from 'zustand';
import { CartItem } from '../types/cart.types';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getItemsCount: () => number;
  initialize: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  loading: false,

  addToCart: async (productId, quantity = 1) => {
    set({ loading: true });
    try {
      // Mock adding to cart - in real app would call API
      const items = get().items;
      const existingItem = items.find(item => item.productId === productId);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = items.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Mock product data - in real app would fetch from API
        const newItem: CartItem = {
          id: `${productId}_${Date.now()}`,
          productId,
          name: `Product ${productId}`,
          price: 99.99,
          quantity,
          image: 'https://via.placeholder.com/100',
        };
        newItems = [...items, newItem];
      }
      
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      storage.set(STORAGE_KEYS.CART, newItems);
      set({ items: newItems, total: newTotal, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error('Error adding to cart:', error);
    }
  },

  removeFromCart: async (itemId) => {
    set({ loading: true });
    try {
      const newItems = get().items.filter(item => item.id !== itemId);
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      storage.set(STORAGE_KEYS.CART, newItems);
      set({ items: newItems, total: newTotal, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error('Error removing from cart:', error);
    }
  },

  updateQuantity: async (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(itemId);
      return;
    }

    set({ loading: true });
    try {
      const newItems = get().items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      storage.set(STORAGE_KEYS.CART, newItems);
      set({ items: newItems, total: newTotal, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error('Error updating quantity:', error);
    }
  },

  clearCart: async () => {
    set({ loading: true });
    try {
      storage.remove(STORAGE_KEYS.CART);
      set({ items: [], total: 0, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error('Error clearing cart:', error);
    }
  },

  getItemsCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  initialize: () => {
    const savedCart = storage.get<CartItem[]>(STORAGE_KEYS.CART);
    if (savedCart) {
      const total = savedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      set({ items: savedCart, total });
    }
  },
}));
