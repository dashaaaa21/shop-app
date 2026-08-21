import { useState } from 'react';
import { ordersApi } from '@/api/orders/orders.api';
import { Order, CreateOrderRequest } from '@/types/order.types';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (orderData: CreateOrderRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ordersApi.createOrder(orderData);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to create order';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ordersApi.getUserOrders();
      setOrders(response.data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch orders';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderById = async (orderId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ordersApi.getOrderById(orderId);
      setCurrentOrder(response.data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch order';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ordersApi.cancelOrder(orderId);
      // Update local state
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? response.data : order))
      );
      if (currentOrder?.id === orderId) {
        setCurrentOrder(response.data);
      }
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to cancel order';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ordersApi.updateOrderStatus(orderId, { status });
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update order status';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    orders,
    currentOrder,
    isLoading,
    error,
    createOrder,
    fetchUserOrders,
    fetchOrderById,
    cancelOrder,
    updateOrderStatus,
  };
};
