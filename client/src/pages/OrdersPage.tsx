import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { SkeletonOrderItem } from '../components/Skeleton';
import { useAuthStore } from '../store/auth.store';
import { ordersApi, type Order } from '../api/orders/orders.api';
import './OrdersPage.css';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/orders' } });
      return;
    }
    fetchOrders();
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ordersApi.getUserOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: 'Pending', className: 'status-pending' },
      processing: { label: 'Processing', className: 'status-processing' },
      shipped: { label: 'Shipped', className: 'status-shipped' },
      delivered: { label: 'Delivered', className: 'status-delivered' },
      cancelled: { label: 'Cancelled', className: 'status-cancelled' },
    };
    const config = statusMap[status] || { label: status, className: '' };
    return <span className={`status-badge ${config.className}`}>{config.label}</span>;
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="orders-page">
        <Header />
        <main className="orders-main">
          <div className="container">
            <div className="orders-header">
              <h1>My Orders</h1>
            </div>
            <div className="orders-list">
              <SkeletonOrderItem />
              <SkeletonOrderItem />
              <SkeletonOrderItem />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <Header />
        <main className="orders-main">
          <div className="container">
            <div className="orders-error">
              <h2>Error loading orders</h2>
              <p>{error}</p>
              <Button onClick={fetchOrders}>Retry</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <Header />
        <main className="orders-main">
          <div className="container">
            <div className="empty-orders">
              <h2>No orders yet</h2>
              <p>You haven't placed any orders yet.</p>
              <Button onClick={() => navigate('/shop/women')}>
                Start Shopping
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="orders-page">
        <Header />
      
      <main className="orders-main">
        <div className="container">
          <div className="orders-header">
            <h1>My Orders</h1>
            <p className="orders-count">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
          </div>

          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-info">
                    <h3 className="order-number">Order #{order.id.slice(0, 8)}</h3>
                    <p className="order-date">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="order-status">
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                <div className="order-card-body">
                  <div className="order-items">
                    {order.order_items && order.order_items.length > 0 ? (
                      <>
                        <div className="order-items-preview">
                          {order.order_items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="order-item-preview">
                              <img 
                                src={item.product_image || 'https://via.placeholder.com/60'} 
                                alt={item.product_name}
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/60';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <p className="order-items-count">
                          {order.order_items.length} {order.order_items.length === 1 ? 'item' : 'items'}
                        </p>
                      </>
                    ) : (
                      <p className="order-items-count">No items</p>
                    )}
                  </div>

                  <div className="order-total">
                    <span className="order-total-label">Total</span>
                    <span className="order-total-amount">€{order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="order-card-footer">
                  <Link to={`/orders/${order.id}`} className="order-details-link">
                    View Details
                  </Link>
                  {['pending', 'processing'].includes(order.status) && (
                    <button 
                      className="order-cancel-btn"
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to cancel this order?')) {
                          try {
                            await ordersApi.cancelOrder(order.id);
                            fetchOrders(); // Refresh list
                          } catch (err) {
                            alert('Failed to cancel order');
                          }
                        }
                      }}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </ErrorBoundary>
  );
};

export default OrdersPage;
