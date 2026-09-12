import { create } from 'zustand';
import { productsApi, type Product, type ProductQuery } from '../api/products/products.api';

export type { Product };

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  fetchProducts: (query?: ProductQuery) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  currentProduct: null,
  loading: false,
  error: null,

  fetchProducts: async (query = {}) => {
    set({ loading: true, error: null });
    try {
      const res = await productsApi.getAll({ limit: 100, ...query });
      set({ products: res.products, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch products', loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const product = await productsApi.getById(id);
      set({ currentProduct: product, loading: false });
    } catch {
      set({ error: 'Product not found', loading: false });
    }
  },

  searchProducts: async (query) => {
    set({ loading: true, error: null });
    try {
      const res = await productsApi.getAll({ search: query, limit: 100 });
      set({ products: res.products, loading: false });
    } catch {
      set({ error: 'Failed to search products', loading: false });
    }
  },
}));
