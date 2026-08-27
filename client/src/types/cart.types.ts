import { Product } from './product.types';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  attributes?: Record<string, string>;
}

export interface CartItemLegacy {
  product: Product;
  quantity: number;
}