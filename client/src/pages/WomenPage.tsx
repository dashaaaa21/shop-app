import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { ProductGrid } from '../components/ProductGrid';
import { fetchFeaturedProducts, fetchNewArrivals, type Product } from '../api/products/products.api';
import './WomenPage.css';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Image';
};

const categories = [
  { id: 'cat1', name: 'Dresses', slug: 'dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=600&fit=crop&q=80', description: 'Elegant dresses for every occasion', itemCount: '24+ styles' },
  { id: 'cat2', name: 'TROUSERS', slug: 'trousers', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=600&fit=crop&q=80', description: 'Sophisticated trousers for modern women', itemCount: '15+ styles' },
  { id: 'cat3', name: 'SWEATERS', slug: 'sweaters', image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&h=600&fit=crop&q=80', description: 'Minimalist sweaters and cozy knitwear', itemCount: '28+ styles' },
  { id: 'cat4', name: 'Evening Wear', slug: 'evening-wear', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop&q=80', description: 'Exceptional pieces for special moments', itemCount: '15+ styles' },
];

const WomenPage = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Women's Collection | Shop";
    Promise.all([
      fetchFeaturedProducts('women'),
      fetchNewArrivals('women'),
    ]).then(([f, n]) => {
      setFeatured(f.products);
      setNewArrivals(n.products);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="women-page">
      <Header />
      <main className="main-content">
        <div className="container">
          {/* Hero */}
          <section className="women-hero">
            <div className="hero-content">
              <h1 className="hero-title">Women's Collection</h1>
              <p className="hero-description">Discover our carefully curated selection of sophisticated pieces designed for the modern woman who values timeless elegance and exceptional quality.</p>
              <div className="hero-stats">
                <div className="stat"><span className="stat-number">200+</span><span className="stat-label">Exclusive Pieces</span></div>
                <div className="stat"><span className="stat-number">15+</span><span className="stat-label">Premium Brands</span></div>
                <div className="stat"><span className="stat-number">4.9</span><span className="stat-label">Customer Rating</span></div>
              </div>
            </div>
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop&q=80" alt="Women's Fashion" onError={handleImageError} />
            </div>
          </section>

          {/* Categories */}
          <section className="categories-section">
            <div className="section-header">
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-description">Explore our thoughtfully organized collections</p>
            </div>
            <div className="categories-grid">
              {categories.map((cat) => (
                <div key={cat.id} className="category-card">
                  <div className="category-image">
                    <img src={cat.image} alt={cat.name} onError={handleImageError} />
                    <div className="category-overlay">
                      <Link to={`/shop/women/category/${cat.slug}`} className="category-btn">Shop {cat.name}</Link>
                    </div>
                  </div>
                  <div className="category-info">
                    <h3 className="category-name">{cat.name}</h3>
                    <p className="category-description">{cat.description}</p>
                    <span className="category-count">{cat.itemCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured */}
          <section className="featured-section">
            <div className="section-header">
              <h2 className="section-title">Featured Selection</h2>
              <p className="section-description">Handpicked pieces that define contemporary elegance</p>
            </div>
            {loading ? <div className="women-page__loading" /> : <ProductGrid products={featured} />}
          </section>

          {/* New Arrivals */}
          <section className="new-arrivals-section">
            <div className="section-header">
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-description">The latest additions to our curated collection</p>
            </div>
            {loading ? <div className="women-page__loading" /> : <ProductGrid products={newArrivals.slice(0, 4)} />}
            <div className="section-actions">
              <Link to="/shop/women/new-arrivals" className="view-all-btn">View All New Arrivals</Link>
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
