import { useState, useEffect, useCallback } from 'react';
import { ordersApi } from '../lib/api';

export interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: string;
  product_image?: string;
}

export interface Order {
  id: number;
  order_id: string;
  customer_name: string;
  customer_email: string;
  total_amount: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  payment_method: string;
  created_at: string;
  items: OrderItem[];
}

export const useOrders = (filters: any) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ordersApi.list(filters);
      // The backend might return a paginated response or a simple list
      const data = response.data.results || response.data;
      setOrders(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch orders');
      // If API fails, we could potentially fallback to mock data if needed, 
      // but user asked for REAL APIs.
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      await ordersApi.updateStatus(id.toString(), status);
      await fetchOrders(); // Refresh list
      return true;
    } catch (err) {
      console.error('Failed to update status', err);
      return false;
    }
  };

  return { orders, loading, error, refresh: fetchOrders, updateOrderStatus };
};
