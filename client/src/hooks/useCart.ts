import { useState } from 'react';
import { cartApi } from '@/api/cart/cart.api';
import { useCartStore } from '@/store/cart.store';

export const useCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { items, removeFromCart: removeFromCartStore, updateQuantity, clearCart } = useCartStore();

  const syncCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await cartApi.getCart();
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to sync cart';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      await cartApi.addToCart({ productId, quantity });
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to add item to cart';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      setIsLoading(true);
      setError(null);
      await cartApi.updateCartItem(productId, { quantity });
      updateQuantity(productId, quantity);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update cart item';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await cartApi.removeFromCart(productId);
      removeFromCartStore(productId);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to remove item from cart';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearUserCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await cartApi.clearCart();
      clearCart();
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to clear cart';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    items,
    isLoading,
    error,
    syncCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart: clearUserCart,
  };
};
