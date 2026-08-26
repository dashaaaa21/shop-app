import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: id || '1',
    name: 'Premium Wool Overcoat',
    price: 299,
    discountPrice: 249,
    description: 'A timeless overcoat crafted from premium wool blend. Features a classic silhouette with modern tailoring details. Perfect for elevating any outfit during colder months.',
    composition: '80% Wool, 15% Polyester, 5% Cashmere',
    care: 'Dry clean only',
    fit: 'Regular fit with structured shoulders',
    category: 'Outerwear',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=90',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=90',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=90',
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=90',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    console.log('Add to cart:', { productId: id, size: selectedSize, quantity });
  };

  return (
    <div className="product-detail-page">
      <Header />
      
      <div className="product-detail">
        <div className="product-detail__container">
          {/* Images Section */}
          <div className="product-detail__images">
            <div className="product-detail__gallery">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`product-detail__thumbnail ${
                    selectedImage === index ? 'product-detail__thumbnail--active' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className="product-detail__main-image">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="product-detail__info">
            <div className="product-detail__breadcrumb">
              <span>Home</span>
              <span>/</span>
              <span>{product.category}</span>
            </div>

            <h1 className="product-detail__title">{product.name}</h1>

            <div className="product-detail__price">
              {product.discountPrice ? (
                <>
                  <span className="product-detail__price-current">€{product.discountPrice}</span>
                  <span className="product-detail__price-original">€{product.price}</span>
                  <span className="product-detail__price-save">
                    Save €{product.price - product.discountPrice}
                  </span>
                </>
              ) : (
                <span className="product-detail__price-current">€{product.price}</span>
              )}
            </div>

            <p className="product-detail__description">{product.description}</p>

            {/* Size Selector */}
            <div className="product-detail__size">
              <div className="product-detail__size-header">
                <label>Select Size</label>
                <button className="product-detail__size-guide">Size Guide</button>
              </div>
              <div className="product-detail__size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`product-detail__size-btn ${
                      selectedSize === size ? 'product-detail__size-btn--selected' : ''
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="product-detail__quantity">
              <label>Quantity</label>
              <div className="product-detail__quantity-controls">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="product-detail__quantity-btn"
                >
                  −
                </button>
                <span className="product-detail__quantity-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="product-detail__quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
              className="product-detail__add-to-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            {/* Product Details */}
            <div className="product-detail__accordion">
              <details className="product-detail__accordion-item" open>
                <summary>Product Details</summary>
                <div className="product-detail__accordion-content">
                  <p><strong>Composition:</strong> {product.composition}</p>
                  <p><strong>Fit:</strong> {product.fit}</p>
                  <p><strong>Care:</strong> {product.care}</p>
                </div>
              </details>

              <details className="product-detail__accordion-item">
                <summary>Shipping & Returns</summary>
                <div className="product-detail__accordion-content">
                  <p>Free standard shipping on orders over €100</p>
                  <p>Returns accepted within 30 days</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
