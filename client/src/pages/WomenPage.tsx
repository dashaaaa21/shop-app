import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { ProductGrid } from '../components/ProductGrid';
import './WomenPage.css';

// Image error handling
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  img.src = 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Image';
};

// Sample women's products data
const featuredProducts = [
  {
    id: 'w1',
    name: 'Elegant Silk Blouse',
    price: 189,
    discountPrice: 149,
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Blouses',
  },
  {
    id: 'w2',
    name: 'Luxe Cashmere Cardigan',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Knitwear',
  },
  {
    id: 'w3',
    name: 'Designer Midi Dress',
    price: 259,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Dresses',
  },
  {
    id: 'w4',
    name: 'Tailored Wool Coat',
    price: 399,
    discountPrice: 319,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Outerwear',
  },
];

const newArrivals = [
  {
    id: 'w5',
    name: 'Vintage Inspired Jacket',
    price: 179,
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Jackets',
  },
  {
    id: 'w6',
    name: 'Sophisticated Trousers',
    price: 129,
    images: [
      'https://images.unsplash.com/photo-1506629905607-47d67ee3bb67?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Trousers',
  },
  {
    id: 'w7',
    name: 'Ethereal Evening Gown',
    price: 459,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Evening Wear',
  },
  {
    id: 'w8',
    name: 'Minimalist Sweater',
    price: 149,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Sweaters',
  },
];

const categories = [
  {
    id: 'cat1',
    name: 'Dresses',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=600&fit=crop&q=80',
    description: 'Elegant dresses for every occasion',
    itemCount: '24+ styles',
  },
  {
    id: 'cat2',
    name: 'Outerwear', 
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=600&fit=crop&q=80',
    description: 'Sophisticated coats and jackets',
    itemCount: '18+ styles',
  },
  {
    id: 'cat3',
    name: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=600&fit=crop&q=80',
    description: 'Luxurious sweaters and cardigans',
    itemCount: '32+ styles',
  },
  {
    id: 'cat4',
    name: 'Evening Wear',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop&q=80',
    description: 'Exceptional pieces for special moments',
    itemCount: '15+ styles',
  },
];

const WomenPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="women-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <section className="women-hero">
            <div className="hero-content">
              <h1 className="hero-title">Women's Collection</h1>
              <p className="hero-description">
                Discover our carefully curated selection of sophisticated pieces designed 
                for the modern woman who values timeless elegance and exceptional quality.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">200+</span>
                  <span className="stat-label">Exclusive Pieces</span>
                </div>
                <div className="stat">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Premium Brands</span>
                </div>
                <div className="stat">
                  <span className="stat-number">4.9</span>
                  <span className="stat-label">Customer Rating</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop&q=80" 
                alt="Women's Fashion"
                onError={handleImageError}
              />
            </div>
          </section>

          {/* Categories Section */}
          <section className="categories-section">
            <div className="section-header">
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-description">
                Explore our thoughtfully organized collections
              </p>
            </div>
            <div className="categories-grid">
              {categories.map((category) => (
                <div key={category.id} className="category-card">
                  <div className="category-image">
                    <img src={category.image} alt={category.name} onError={handleImageError} />
                    <div className="category-overlay">
                      <button className="category-btn">
                        Shop {category.name}
                      </button>
                    </div>
                  </div>
                  <div className="category-info">
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-description">{category.description}</p>
                    <span className="category-count">{category.itemCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Products Section */}
          <section className="featured-section">
            <div className="section-header">
              <h2 className="section-title">Featured Selection</h2>
              <p className="section-description">
                Handpicked pieces that define contemporary elegance
              </p>
            </div>
            <ProductGrid products={featuredProducts} />
          </section>

          {/* New Arrivals Section */}
          <section className="new-arrivals-section">
            <div className="section-header">
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-description">
                The latest additions to our curated collection
              </p>
            </div>
            <ProductGrid products={newArrivals} />
            <div className="section-actions">
              <button className="view-all-btn">
                View All New Arrivals
              </button>
            </div>
          </section>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default WomenPage;