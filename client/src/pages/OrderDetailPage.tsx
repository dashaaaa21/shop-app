import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useAuthStore } from '../store/auth.store';
import { ordersApi, type Order } from '../api/orders/orders.api';
import './OrderDetailPage.css';

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/orders/${id}` } });
      return;
    }

    if (!id) {
      navigate('/orders');
      return;
    }

    fetchOrder();
  }, [isAuthenticated, id, navigate]);

  const fetchOrder = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await ordersApi.getOrderById(id);
      setOrder(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;

    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    setCancelling(true);
    try {
      await ordersApi.cancelOrder(order.id);
      setOrder({ ...order, status: 'cancelled' });
    } catch (err: any) {
      setError(err?.message || 'Failed to cancel order');
    } finally {
      setCancelling(false);
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

  const getStatusTimeline = () => {
    const stages = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = stages.indexOf(order?.status || '');
    
    return (
      <div className="status-timeline">
        {stages.map((stage, idx) => (
          <div key={stage} className="timeline-item">
            <div className={`timeline-dot ${idx <= currentIndex ? 'active' : ''}`} />
            <div className="timeline-label">{stage.charAt(0).toUpperCase() + stage.slice(1)}</div>
            {idx < stages.length - 1 && (
              <div className={`timeline-line ${idx < currentIndex ? 'active' : ''}`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="order-detail-page">
        <Header />
        <main className="order-detail-main">
          <div className="container">
            <div className="detail-loading">Loading order details...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-detail-page">
        <Header />
        <main className="order-detail-main">
          <div className="container">
            <button className="back-link" onClick={() => navigate('/orders')}>
              ← Back to Orders
            </button>
            <div className="detail-error">
              <h2>Error loading order</h2>
              <p>{error || 'Order not found'}</p>
              <Button onClick={() => navigate('/orders')}>Go to Orders</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="order-detail-page">
        <Header />

      <main className="order-detail-main">
        <div className="container">
          <button className="back-link" onClick={() => navigate('/orders')}>
            ← Back to Orders
          </button>

          <div className="order-detail-header">
            <div className="detail-title-section">
              <h1 className="detail-title">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
              <p className="detail-order-date">
                {new Date(order.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="detail-status-section">
              {getStatusBadge(order.status)}
            </div>
          </div>

          {/* Status Timeline */}
          {order.status !== 'cancelled' && getStatusTimeline()}

          <div className="detail-content">
            {/* Order Items */}
            <section className="detail-section order-items-section">
              <h2 className="section-title">Order Items</h2>
              
              {order.order_items && order.order_items.length > 0 ? (
                <div className="items-table">
                  <div className="items-header">
                    <div className="col-product">Product</div>
                    <div className="col-quantity">Quantity</div>
                    <div className="col-price">Price</div>
                    <div className="col-total">Total</div>
                  </div>
                  {order.order_items.map((item, idx) => (
                    <div key={idx} className="items-row">
                      <div className="col-product">
                        <div className="product-info">
                          <img
                            src={item.product_image || 'https://via.placeholder.com/80'}
                            alt={item.product_name}
                            className="product-image"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/80';
                            }}
                          />
                          <div className="product-details">
                            <p className="product-name">{item.product_name}</p>
                            <p className="product-id">ID: {item.product_id}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-quantity">
                        <span>{item.quantity}</span>
                      </div>
                      <div className="col-price">
                        <span>€{item.price.toFixed(2)}</span>
                      </div>
                      <div className="col-total">
                        <span>€{(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-items">No items in this order</p>
              )}
            </section>

            {/* Order Summary */}
            <section className="detail-section order-summary-section">
              <h2 className="section-title">Order Summary</h2>
              <div className="summary-box">
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-value">€{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value">€{order.shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Tax</span>
                  <span className="summary-value">€{order.tax.toFixed(2)}</span>
                </div>
                <div className="summary-row summary-total">
                  <span className="summary-label">Total</span>
                  <span className="summary-value">€{order.total.toFixed(2)}</span>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            {order.shipping_address && (
              <section className="detail-section shipping-address-section">
                <h2 className="section-title">Shipping Address</h2>
                <div className="address-box">
                  <p className="address-name">
                    {order.shipping_address.firstName} {order.shipping_address.lastName}
                  </p>
                  <p className="address-line">{order.shipping_address.address}</p>
                  <p className="address-line">
                    {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zipCode}
                  </p>
                  <p className="address-line">{order.shipping_address.country}</p>
                  <p className="address-phone">{order.shipping_address.phone}</p>
                </div>
              </section>
            )}

            {/* Payment Information */}
            {order.payment_method && (
              <section className="detail-section payment-section">
                <h2 className="section-title">Payment Method</h2>
                <div className="payment-box">
                  <p className="payment-method">{order.payment_method}</p>
                </div>
              </section>
            )}

            {/* Order Actions */}
            <section className="detail-section actions-section">
              <div className="actions-container">
                {['pending', 'processing'].includes(order.status) && (
                  <button
                    className="cancel-order-btn"
                    onClick={handleCancelOrder}
                    disabled={cancelling}
                  >
                    {cancelling ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                )}
                <Button onClick={() => navigate('/shop/women')}>
                  Continue Shopping
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </ErrorBoundary>
  );
};

export default OrderDetailPage;
