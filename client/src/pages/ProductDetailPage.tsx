import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { Button } from '../components/ui/button';
import { Loader } from '../components/loader';
import { useProductStore } from '../store/product.store';
import { useCartStore } from '../store/cart.store';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');

  const { 
    currentProduct, 
    loading, 
    error, 
    fetchProductById 
  } = useProductStore();

  const { addToCart, loading: cartLoading } = useCartStore();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  const handleAddToCart = async () => {
    if (currentProduct) {
      await addToCart(currentProduct.id, quantity);
    }
  };

  const handleBuyNow = async () => {
    if (currentProduct) {
      await addToCart(currentProduct.id, quantity);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <Header />
        <div className="container">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="product-detail-page">
        <Header />
        <div className="container">
          <div className="error-message">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/products')}>
              Browse Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const product = currentProduct;
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="product-detail-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <nav className="breadcrumb">
            <button onClick={() => navigate('/')} className="breadcrumb-link">
              Home
            </button>
            <span className="breadcrumb-separator">/</span>
            <button onClick={() => navigate('/products')} className="breadcrumb-link">
              Products
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </nav>

          <div className="product-container">
            <div className="product-images">
              <div className="main-image">
                <img 
                  src={images[selectedImage]} 
                  alt={product.name}
                  className="product-main-image"
                />
              </div>
              {images.length > 1 && (
                <div className="image-thumbnails">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="product-info">
              <div className="product-header">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`star ${i < Math.floor(product.rating || 0) ? 'filled' : ''}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="rating-text">({product.rating || 0}) - 24 reviews</span>
                </div>
              </div>

              <div className="product-pricing">
                <div className="price">
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                  <span className="current-price">${product.price}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="discount">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
                <div className="stock-status">
                  {product.stock > 0 ? (
                    <span className="in-stock">In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="product-options">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="quantity-btn"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max={product.stock}
                      className="quantity-input"
                    />
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="quantity-btn"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="action-buttons">
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || cartLoading}
                    variant="outline"
                    className="add-to-cart-btn"
                  >
                    {cartLoading ? 'Adding...' : 'Add to Cart'}
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0 || cartLoading}
                    className="buy-now-btn"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              <div className="product-features">
                <div className="feature">
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="feature">
                  <span>30-day return policy</span>
                </div>
                <div className="feature">
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </div>

          <div className="product-details">
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews (24)
              </button>
              <button
                className={`tab ${activeTab === 'shipping' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping & Returns
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="description-content">
                  <p>{product.description}</p>
                  {product.specifications && (
                    <div className="specifications">
                      <h3>Specifications</h3>
                      <ul>
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="reviews-content">
                  <p>Customer reviews coming soon...</p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="shipping-content">
                  <h3>Shipping Information</h3>
                  <p>We offer free standard shipping on orders over $50. Orders are typically processed within 1-2 business days.</p>
                  <h3>Return Policy</h3>
                  <p>Items can be returned within 30 days of purchase for a full refund. Items must be in original condition.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;