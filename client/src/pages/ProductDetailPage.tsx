import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { Loader } from '../components/loader';
import { useProductStore } from '../store/product.store';
import { useCartStore } from '../store/cart.store';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'shipping'>('description');
  const [addedToCart, setAddedToCart] = useState(false);

  const { currentProduct, loading, error, fetchProductById } = useProductStore();
  const { addToCart, loading: cartLoading } = useCartStore();

  useEffect(() => {
    if (id) fetchProductById(id);
    window.scrollTo(0, 0);
  }, [id, fetchProductById]);

  const handleAddToCart = async () => {
    if (currentProduct) {
      await addToCart(currentProduct.id, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2500);
    }
  };

  const handleBuyNow = async () => {
    if (currentProduct) {
      await addToCart(currentProduct.id, quantity);
      navigate('/checkout');
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).src =
      'https://via.placeholder.com/800x1000/f8f7f4/999999?text=Fashion+Item';
  };

  if (loading) {
    return (
      <div className="pdp">
        <Header />
        <div className="pdp__loader"><Loader /></div>
        <Footer />
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="pdp">
        <Header />
        <div className="pdp__not-found">
          <h2>Product not found</h2>
          <p>The item you're looking for has been removed or doesn't exist.</p>
          <button onClick={() => navigate('/shop/women')} className="pdp__not-found-btn">
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const product = currentProduct;
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="pdp">
      <Header />

      <main className="pdp__main">
        {/* Breadcrumbs */}
        <div className="container">
          <nav className="pdp__breadcrumbs">
            <Link to="/" className="pdp__breadcrumb-link">Home</Link>
            <span className="pdp__breadcrumb-sep">/</span>
            <span className="pdp__breadcrumb-link" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
              {product.category}
            </span>
            <span className="pdp__breadcrumb-sep">/</span>
            <span className="pdp__breadcrumb-current">{product.name}</span>
          </nav>
        </div>

        {/* Main product layout */}
        <div className="pdp__body">
          {/* Gallery */}
          <div className="pdp__gallery">
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="pdp__thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`pdp__thumb ${selectedImage === i ? 'pdp__thumb--active' : ''}`}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} onError={handleImageError} />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="pdp__main-image">
              {hasDiscount && (
                <span className="pdp__sale-badge">SALE — {discountPercent}% OFF</span>
              )}
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="pdp__image"
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Info panel */}
          <div className="pdp__info">
            {/* Category + name */}
            <p className="pdp__category">{product.category}</p>
            <h1 className="pdp__name">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="pdp__rating">
                <div className="pdp__stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      className={`pdp__star ${s <= Math.round(product.rating!) ? 'pdp__star--filled' : ''}`}
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="pdp__rating-text">{product.rating} — 24 reviews</span>
              </div>
            )}

            {/* Price */}
            <div className="pdp__pricing">
              <span className="pdp__price">€{product.price}</span>
              {hasDiscount && (
                <span className="pdp__original-price">€{product.originalPrice}</span>
              )}
            </div>

            {/* Short description */}
            <p className="pdp__lead">{product.description}</p>

            {/* Stock */}
            <p className={`pdp__stock ${product.stock > 0 ? 'pdp__stock--in' : 'pdp__stock--out'}`}>
              {product.stock > 5
                ? 'In stock'
                : product.stock > 0
                ? `Only ${product.stock} left`
                : 'Out of stock'}
            </p>

            {/* Quantity */}
            <div className="pdp__quantity">
              <button
                className="pdp__qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="pdp__qty-value">{quantity}</span>
              <button
                className="pdp__qty-btn"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Actions */}
            <div className="pdp__actions">
              <button
                className={`pdp__add-btn ${addedToCart ? 'pdp__add-btn--added' : ''}`}
                onClick={handleAddToCart}
                disabled={product.stock === 0 || cartLoading}
              >
                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <button
                className="pdp__buy-btn"
                onClick={handleBuyNow}
                disabled={product.stock === 0 || cartLoading}
              >
                Buy Now
              </button>
            </div>

            {/* Trust badges */}
            <ul className="pdp__trust">
              <li className="pdp__trust-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Free shipping on orders over €150
              </li>
              <li className="pdp__trust-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
                30-day returns, no questions asked
              </li>
              <li className="pdp__trust-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure checkout
              </li>
            </ul>
          </div>
        </div>

        {/* Editorial detail section */}
        <div className="pdp__editorial">
          <div className="pdp__editorial-inner">
            {/* Tabs */}
            <div className="pdp__tabs">
              {(['description', 'details', 'shipping'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`pdp__tab ${activeTab === tab ? 'pdp__tab--active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'description' ? 'About this piece'
                    : tab === 'details' ? 'Materials & Care'
                    : 'Delivery & Returns'}
                </button>
              ))}
            </div>

            <div className="pdp__tab-content">
              {activeTab === 'description' && (
                <div className="pdp__desc">
                  <p className="pdp__desc-text">{product.description}</p>
                  <div className="pdp__desc-philosophy">
                    <h3 className="pdp__desc-subtitle">Our Design Philosophy</h3>
                    <p className="pdp__desc-text">
                      Every piece in our collection is approached with the same commitment — to create garments
                      that serve as investments rather than impulse purchases. We work exclusively with suppliers
                      who share our values of ethical production and material excellence.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="pdp__specs">
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    <dl className="pdp__specs-list">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="pdp__spec-row">
                          <dt className="pdp__spec-key">{key}</dt>
                          <dd className="pdp__spec-val">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="pdp__desc-text">Material details available upon request.</p>
                  )}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="pdp__shipping">
                  <div className="pdp__shipping-grid">
                    <div className="pdp__shipping-block">
                      <h3 className="pdp__shipping-title">Standard Delivery</h3>
                      <p className="pdp__shipping-text">
                        3–5 business days. Free on orders over €150, otherwise €8.
                        Orders placed before 2pm ship the same day.
                      </p>
                    </div>
                    <div className="pdp__shipping-block">
                      <h3 className="pdp__shipping-title">Express Delivery</h3>
                      <p className="pdp__shipping-text">
                        Next business day. €18. Available for orders placed before noon.
                        Tracking provided via email confirmation.
                      </p>
                    </div>
                    <div className="pdp__shipping-block">
                      <h3 className="pdp__shipping-title">Returns</h3>
                      <p className="pdp__shipping-text">
                        30-day returns on all full-price items. Items must be unworn, with
                        original tags attached. Return postage is free.
                      </p>
                    </div>
                    <div className="pdp__shipping-block">
                      <h3 className="pdp__shipping-title">International</h3>
                      <p className="pdp__shipping-text">
                        We ship worldwide. Duties and taxes may apply depending on your
                        country. Estimated 5–10 business days.
                      </p>
                    </div>
                  </div>
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
