import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { useCartStore } from '../store/cart.store';
import { ROUTES } from '../constants/routes';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    items, 
    total, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCartStore();

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsLoading(true);
    await updateQuantity(itemId, newQuantity);
    setIsLoading(false);
  };

  const handleRemoveItem = async (itemId: string) => {
    setIsLoading(true);
    await removeFromCart(itemId);
    setIsLoading(false);
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to remove all items from your cart?')) {
      setIsLoading(true);
      await clearCart();
      setIsLoading(false);
    }
  };

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT);
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <Header />
        <main className="main-content">
          <div className="container">
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your Cart is Empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Button onClick={() => navigate(ROUTES.PRODUCTS)} className="continue-shopping-btn">
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
            <button onClick={handleClearCart} className="clear-cart-btn" disabled={isLoading}>
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

              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <Link to={`${ROUTES.PRODUCTS}/${item.productId}`} className="item-image">
                      <img src={item.image} alt={item.name} />
                    </Link>
                    <div className="item-details">
                      <Link 
                        to={`${ROUTES.PRODUCTS}/${item.productId}`} 
                        className="item-name"
                      >
                        {item.name}
                      </Link>
                      {item.attributes && Object.keys(item.attributes).length > 0 && (
                        <div className="item-attributes">
                          {Object.entries(item.attributes).map(([key, value]) => (
                            <span key={key} className="attribute">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="item-price">
                    ${item.price.toFixed(2)}
                  </div>

                  <div className="item-quantity">
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || isLoading}
                        className="quantity-btn"
                      >
                        -
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
                    ${(item.price * item.quantity).toFixed(2)}
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
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{total >= 50 ? 'Free' : '$5.99'}</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${(total + (total < 50 ? 5.99 : 0) + (total * 0.08)).toFixed(2)}</span>
                </div>

                {total < 50 && (
                  <div className="shipping-notice">
                    <span className="shipping-icon">🚚</span>
                    <span>Add ${(50 - total).toFixed(2)} more for free shipping!</span>
                  </div>
                )}

                <div className="summary-actions">
                  <Button onClick={handleCheckout} className="checkout-btn" disabled={isLoading}>
                    Proceed to Checkout
                  </Button>
                  <Button 
                    onClick={() => navigate(ROUTES.PRODUCTS)} 
                    variant="outline" 
                    className="continue-shopping-btn"
                  >
                    Continue Shopping
                  </Button>
                </div>

                <div className="payment-methods">
                  <p>We accept:</p>
                  <div className="payment-icons">
                    <span>💳</span>
                    <span>🏦</span>
                    <span>📱</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-features">
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <div>
                <h4>Secure Checkout</h4>
                <p>Your payment information is encrypted and secure</p>
              </div>
            </div>
            <div className="feature">
              <span className="feature-icon">↩️</span>
              <div>
                <h4>Easy Returns</h4>
                <p>30-day return policy on all items</p>
              </div>
            </div>
            <div className="feature">
              <span className="feature-icon">🚚</span>
              <div>
                <h4>Fast Shipping</h4>
                <p>Free shipping on orders over $50</p>
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