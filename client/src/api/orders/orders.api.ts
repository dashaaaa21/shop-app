import { api } from '../axios';
import { Order, CreateOrderRequest, OrdersResponse } from '@/types/order.types';

export interface OrderResponse {
  success: boolean;
  data: Order;
}

export interface UpdateOrderStatusRequest {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export const ordersApi = {
  // Create new order
  createOrder: async (data: CreateOrderRequest): Promise<OrderResponse> => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  // Get user's orders
  getUserOrders: async (): Promise<OrdersResponse> => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Get single order by ID
  getOrderById: async (orderId: string): Promise<OrderResponse> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Cancel order
  cancelOrder: async (orderId: string): Promise<OrderResponse> => {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  },

  // Admin: Get all orders
  getAllOrders: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<OrdersResponse> => {
    const response = await api.get('/orders/admin/all', { params });
    return response.data;
  },

  // Admin: Update order status
  updateOrderStatus: async (
    orderId: string,
    data: UpdateOrderStatusRequest
  ): Promise<OrderResponse> => {
    const response = await api.put(`/orders/${orderId}/status`, data);
    return response.data;
  },
};
