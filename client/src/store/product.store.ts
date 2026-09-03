import { create } from 'zustand';
import { womenProducts, menProducts } from '../data/products.data';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  rating?: number;
  specifications?: Record<string, string>;
}

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  fetchProducts: (filters?: { category?: string }) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
}

// Convert women products to store format
const womenMockProducts: Product[] = womenProducts.map((p) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  price: p.discountPrice ?? p.price,
  originalPrice: p.discountPrice ? p.price : undefined,
  image: p.images[0],
  images: p.images,
  category: p.category,
  stock: p.stock,
  rating: p.rating,
  specifications: p.specifications,
}));

// Convert men products to store format
const menMockProducts: Product[] = menProducts.map((p) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  price: p.discountPrice ?? p.price,
  originalPrice: p.discountPrice ? p.price : undefined,
  image: p.images[0],
  images: p.images,
  category: p.category,
  stock: p.stock,
  rating: p.rating,
  specifications: p.specifications,
}));

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    stock: 15,
    rating: 4.8,
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '280g',
      'Drivers': '40mm'
    }
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and multiple sport modes.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 8,
    rating: 4.6,
    specifications: {
      'Battery Life': '7 days',
      'Display': 'AMOLED',
      'Water Resistance': '50m',
      'GPS': 'Built-in'
    }
  },
  {
    id: '3',
    name: 'Professional Camera Lens',
    description: 'High-performance telephoto lens for professional photography. Compatible with most DSLR cameras.',
    price: 899.99,
    originalPrice: 1099.99,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 5,
    rating: 4.9,
    specifications: {
      'Focal Length': '70-200mm',
      'Aperture': 'f/2.8',
      'Mount': 'Canon EF',
      'Weight': '1.5kg'
    }
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic office chair with lumbar support and adjustable height. Perfect for long work sessions.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
    category: 'Home & Garden',
    stock: 12,
    rating: 4.5,
    specifications: {
      'Material': 'Mesh & Fabric',
      'Weight Capacity': '150kg',
      'Height Range': '42-52cm',
      'Warranty': '3 years'
    }
  },
  {
    id: '5',
    name: 'Designer Cotton T-Shirt',
    description: 'Premium cotton t-shirt with modern design. Comfortable and stylish for everyday wear.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'Clothing',
    stock: 25,
    rating: 4.3,
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Regular',
      'Care': 'Machine wash',
      'Origin': 'Made in Italy'
    }
  },
  {
    id: '6',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with advanced cushioning and breathable mesh upper.',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'Sports',
    stock: 18,
    rating: 4.7,
    specifications: {
      'Upper': 'Breathable Mesh',
      'Sole': 'Rubber',
      'Weight': '280g',
      'Drop': '10mm'
    }
  }
];

// All products combined (general + women's + men's)
const allProducts: Product[] = [...mockProducts, ...womenMockProducts, ...menMockProducts];

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  currentProduct: null,
  loading: false,
  error: null,

  fetchProducts: async (filters) => {
    set({ loading: true, error: null });

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredProducts = allProducts;

      if (filters?.category) {
        filteredProducts = allProducts.filter(
          product => product.category.toLowerCase() === filters.category?.toLowerCase()
        );
      }

      set({ products: filteredProducts, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const product = allProducts.find(p => p.id === id);

      if (product) {
        set({ currentProduct: product, loading: false });
      } else {
        set({ error: 'Product not found', loading: false });
      }
    } catch (error) {
      set({ error: 'Failed to fetch product', loading: false });
    }
  },

  searchProducts: async (query) => {
    set({ loading: true, error: null });

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const filteredProducts = allProducts.filter(
        product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );

      set({ products: filteredProducts, loading: false });
    } catch (error) {
      set({ error: 'Failed to search products', loading: false });
    }
  },
}));