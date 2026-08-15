import { api } from '../axios';
import { Product, ProductFilters } from '@/types/product.types';

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export const productsApi = {
  getAll: async (filters?: ProductFilters, page = 1, limit = 12): Promise<ProductsResponse> => {
    const { data } = await api.get<ProductsResponse>('/products', {
      params: { ...filters, page, limit },
    });
    return data;
  },

  getById: async (id: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },

  create: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const { data } = await api.post<Product>('/products', product);
    return data;
  },

  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    const { data } = await api.put<Product>(`/products/${id}`, product);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
