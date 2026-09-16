import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { useCartStore } from '../store/cart.store';
import { useAuthStore } from '../store/auth.store';
import { ROUTES } from '../constants/routes';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    items, 
    subtotal,
    tax,
    shipping,
    total,
    loading,
    error,
    updateQuantity, 
    removeFromCart, 
    clearCart,
    fetchCart
  } = useCartStore();

  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    fetchCart();
  }, [isAuthenticated, fetchCart, navigate]);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsLoading(true);
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
    setIsLoading(false);
  };

  const handleRemoveItem = async (itemId: string) => {
    setIsLoading(true);
    try {
      await removeFromCart(itemId);
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
    setIsLoading(false);
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to remove all items from your cart?')) {
      setIsLoading(true);
      try {
        await clearCart();
      } catch (err) {
        console.error('Failed to clear cart:', err);
      }
      setIsLoading(false);
    }
  };

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT);
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="cart-page">
        <Header />
        <main className="main-content">
          <div className="container">
            <div className="cart-loading">
              <div>Loading cart...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-page">
        <Header />
        <main className="main-content">
          <div className="container">
            <div className="cart-error">
              <h2>Error loading cart</h2>
              <p>{error}</p>
              <Button onClick={() => fetchCart()} className="retry-btn">
                Retry
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <Header />
        <main className="main-content">
          <div className="container">
            <div className="empty-cart">
              <div className="empty-cart-message">Cart</div>
              <h2>Your Cart is Empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Button onClick={() => navigate('/shop/women')} className="continue-shopping-btn">
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <button onClick={handleClearCart} className="clear-cart-btn" disabled={isLoading || loading}>
              Clear Cart
            </button>
          </div>

          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-items-header">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span>Action</span>
              </div>

              {items.map((item) => {
                const currentPrice = item.product_discount_price || item.product_price;
                const lineTotal = currentPrice * item.quantity;

                return (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <Link to={`/product/${item.external_product_id}`} className="item-image">
                        <img 
                          src={item.product_image} 
                          alt={item.product_name}
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/150x150?text=Product';
                          }}
                        />
                      </Link>
                      <div className="item-details">
                        <Link 
                          to={`/product/${item.external_product_id}`} 
                          className="item-name"
                        >
                          {item.product_name}
                        </Link>
                        <div className="item-category">
                          {item.product_category}
                        </div>
                        {item.product_discount_price && (
                          <div className="item-discount">
                            <span className="original-price">€{item.product_price}</span>
                            <span className="discount-price">€{item.product_discount_price}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="item-price">
                      €{currentPrice.toFixed(2)}
                    </div>

                    <div className="item-quantity">
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || isLoading}
                          className="quantity-btn"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          min="1"
                          className="quantity-input"
                          disabled={isLoading}
                        />
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="item-total">
                      €{lineTotal.toFixed(2)}
                    </div>

                    <div className="item-action">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isLoading}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal ({items.length} items)</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax</span>
                  <span>€{tax.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>

                {shipping > 0 && subtotal < 150 && (
                  <div className="shipping-notice">
                    <span>Add €{(150 - subtotal).toFixed(2)} more for free shipping!</span>
                  </div>
                )}

                <div className="summary-actions">
                  <Button onClick={handleCheckout} className="checkout-btn" disabled={isLoading}>
                    Proceed to Checkout
                  </Button>
                  <Button 
                    onClick={() => navigate('/shop/women')} 
                    variant="outline" 
                    className="continue-shopping-btn"
                  >
                    Continue Shopping
                  </Button>
                </div>

                <div className="payment-methods">
                  <p>Need help with ordering?</p>
                  <div className="payment-notice">
                    Contact us on WhatsApp for personalized assistance
                  </div>
                  <a href="https://wa.me/380YourPhoneNumber" className="whatsapp-link" target="_blank" rel="noopener noreferrer">
                    Message on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-features">
            <div className="feature">
              <div>
                <h4>Secure Checkout</h4>
                <p>Your payment information is encrypted and secure</p>
              </div>
            </div>
            <div className="feature">
              <div>
                <h4>Easy Returns</h4>
                <p>30-day return policy on all items</p>
              </div>
            </div>
            <div className="feature">
              <div>
                <h4>Fast Shipping</h4>
                <p>Free shipping on orders over €150</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;