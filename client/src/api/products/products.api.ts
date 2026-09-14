const API = import.meta.env.VITE_API_URL ?? 'http://localhost:5001/api';

export interface Product {
  id: string;
  external_id: string;
  name: string;
  price: number;
  discount_price: number | null;
  images: string[];
  category: string;
  gender: 'women' | 'men' | null;
  collection: string | null;
  is_new_arrival: boolean;
  is_featured: boolean;
  description: string;
  stock: number;
  rating: number;
  specifications: Record<string, string>;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ProductQuery {
  gender?: 'women' | 'men';
  category?: string;
  collection?: string;
  is_featured?: boolean;
  is_new_arrival?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

const buildQuery = (params: ProductQuery): string => {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) q.append(k, String(v));
  });
  return q.toString() ? `?${q.toString()}` : '';
};

export const productsApi = {
  getAll: async (params: ProductQuery = {}): Promise<ProductsResponse> => {
    const res = await fetch(`${API}/products${buildQuery(params)}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  getById: async (id: string): Promise<Product> => {
    const res = await fetch(`${API}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },
};

// ── Convenience helpers (mirror old products.data.ts API) ──────

export const fetchFeaturedProducts = (gender?: 'women' | 'men') =>
  productsApi.getAll({ is_featured: true, ...(gender ? { gender } : {}), limit: 20 });

export const fetchNewArrivals = (gender?: 'women' | 'men') =>
  productsApi.getAll({ is_new_arrival: true, ...(gender ? { gender } : {}), limit: 50 });

export const fetchByCategory = (category: string, gender?: 'women' | 'men') =>
  productsApi.getAll({ category, ...(gender ? { gender } : {}), limit: 50 });

export const fetchByCollection = (collection: string) =>
  productsApi.getAll({ collection, limit: 50 });

export const fetchProductById = (id: string) =>
  productsApi.getById(id);
