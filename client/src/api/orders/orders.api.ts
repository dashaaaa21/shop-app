import { supabase } from '../../lib/supabase';

const API = import.meta.env.CONFIG_API_URL ?? 'http://localhost:5001/api';

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shipping_address: ShippingAddress | null;
  payment_method: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderResponse {
  success: boolean;
  data: Order;
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface CreateOrderRequest {
  items: {
    productId: string;
    productName: string;
    productImage: string | null;
    quantity: number;
    price: number;
  }[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

// Get auth token from Supabase session
const getAuthToken = async (): Promise<string | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  } catch {
    return null;
  }
};

// Build headers with authentication
const getHeaders = async (): Promise<HeadersInit> => {
  const token = await getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export interface UpdateOrderStatusRequest {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export const ordersApi = {
  // Create new order
  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    const res = await fetch(`${API}/orders`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Failed to create order' }));
      throw new Error(error.message || 'Failed to create order');
    }
    
    const response: OrderResponse = await res.json();
    return response.data;
  },

  // Get user's orders
  getUserOrders: async (): Promise<Order[]> => {
    const res = await fetch(`${API}/orders`, {
      method: 'GET',
      headers: await getHeaders()
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Failed to fetch orders' }));
      throw new Error(error.message || 'Failed to fetch orders');
    }
    
    const response: OrdersResponse = await res.json();
    return response.data;
  },

  // Get single order by ID
  getOrderById: async (orderId: string): Promise<Order> => {
    const res = await fetch(`${API}/orders/${orderId}`, {
      method: 'GET',
      headers: await getHeaders()
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Order not found' }));
      throw new Error(error.message || 'Order not found');
    }
    
    const response: OrderResponse = await res.json();
    return response.data;
  },

  // Cancel order
  cancelOrder: async (orderId: string): Promise<Order> => {
    const res = await fetch(`${API}/orders/${orderId}`, {
      method: 'DELETE',
      headers: await getHeaders()
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Failed to cancel order' }));
      throw new Error(error.message || 'Failed to cancel order');
    }
    
    const response: OrderResponse = await res.json();
    return response.data;
  },

  // Admin: Get all orders
  getAllOrders: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<OrdersResponse> => {
    const query = new URLSearchParams();
    if (params?.status) query.append('status', params.status);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    
    const res = await fetch(`${API}/orders/admin/all?${query.toString()}`, {
      method: 'GET',
      headers: await getHeaders()
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Failed to fetch orders' }));
      throw new Error(error.message || 'Failed to fetch orders');
    }
    
    return res.json();
  },

  // Admin: Update order status
  updateOrderStatus: async (
    orderId: string,
    data: UpdateOrderStatusRequest
  ): Promise<Order> => {
    const res = await fetch(`${API}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: await getHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Failed to update order status' }));
      throw new Error(error.message || 'Failed to update order status');
    }
    
    const response: OrderResponse = await res.json();
    return response.data;
  },
};
