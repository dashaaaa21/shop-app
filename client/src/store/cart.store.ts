import { create } from 'zustand';
import { Product } from '@/types/product.types';
import { CartItem } from '@/types/cart.types';
import { storage, STORAGE_KEYS } from '@/utils/storage';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemsCount: () => number;
  initialize: () => void;
}

const TAX_RATE = 0.1; // 10%

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product, quantity = 1) => {
    const items = get().items;
    const existingItem = items.find((item) => item.product.id === product.id);

    let newItems: CartItem[];
    if (existingItem) {
      newItems = items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...items, { product, quantity }];
    }

    storage.set(STORAGE_KEYS.CART, newItems);
    set({ items: newItems });
  },

  removeItem: (productId) => {
    const newItems = get().items.filter((item) => item.product.id !== productId);
    storage.set(STORAGE_KEYS.CART, newItems);
    set({ items: newItems });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    const newItems = get().items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    storage.set(STORAGE_KEYS.CART, newItems);
    set({ items: newItems });
  },

  clearCart: () => {
    storage.remove(STORAGE_KEYS.CART);
    set({ items: [] });
  },

  getTotal: () => {
    const items = get().items;
    const subtotal = items.reduce(
      (sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity,
      0
    );
    const tax = subtotal * TAX_RATE;
    return subtotal + tax;
  },

  getItemsCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  initialize: () => {
    const savedCart = storage.get<CartItem[]>(STORAGE_KEYS.CART);
    if (savedCart) {
      set({ items: savedCart });
    }
  },
}));
