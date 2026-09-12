import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { ProductGrid } from '../components/ProductGrid';
import { fetchNewArrivals, type Product } from '../api/products/products.api';
import './MenNewArrivalsPage.css';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Image';
};

const MenNewArrivalsPage = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "New Arrivals — Men's Collection | Shop";
    fetchNewArrivals('men').then((res) => setAllProducts(res.products)).finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...Array.from(new Set(allProducts.map((p) => p.category)))];

  let filtered = categoryFilter === 'all' ? allProducts : allProducts.filter((p) => p.category === categoryFilter);

  filtered = [...filtered].sort((a, b) => {
    const pA = a.discount_price ?? a.price;
    const pB = b.discount_price ?? b.price;
    if (sortBy === 'price-low') return pA - pB;
    if (sortBy === 'price-high') return pB - pA;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="men-na-page">
      <Header />
      <main className="men-na-main">
        <div className="container">
          <nav className="men-na-breadcrumbs">
            <Link to="/" className="men-na-breadcrumb-link">Home</Link>
            <span className="men-na-breadcrumb-sep">/</span>
            <Link to="/shop/men" className="men-na-breadcrumb-link">Men</Link>
            <span className="men-na-breadcrumb-sep">/</span>
            <span className="men-na-breadcrumb-current">New Arrivals</span>
          </nav>

          <section className="men-na-hero">
            <div className="men-na-hero__image">
              <img src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1400&h=500&fit=crop&q=80" alt="Men's New Arrivals" onError={handleImageError} />
              <div className="men-na-hero__overlay">
                <h1 className="men-na-hero__title">New Arrivals</h1>
                <p className="men-na-hero__subtitle">The latest additions to our curated men's collection</p>
              </div>
            </div>
          </section>

          <div className="na-gender-switcher">
            <button className="na-gender-btn" onClick={() => navigate('/shop/women/new-arrivals')}>Women</button>
            <button className="na-gender-btn na-gender-btn--active" aria-current="page">Men</button>
          </div>

          <section className="men-na-controls">
            <div className="men-na-controls__left">
              <p className="men-na-controls__count">{filtered.length} {filtered.length === 1 ? 'item' : 'items'}</p>
            </div>
            <div className="men-na-controls__right">
              <div className="men-na-category-tabs">
                {categories.map((cat) => (
                  <button key={cat} className={`men-na-tab ${categoryFilter === cat ? 'men-na-tab--active' : ''}`} onClick={() => setCategoryFilter(cat)}>
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="men-na-sort-select" aria-label="Sort new arrivals">
                <option value="default">Latest First</option>
                <option value="name">Name (A–Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </section>

          <section className="men-na-products">
            {loading ? <div className="men-na-loading" /> : filtered.length > 0 ? (
              <ProductGrid products={filtered} columns={4} />
            ) : (
              <div className="men-na-empty">
                <p>No items match the selected filter.</p>
                <button className="men-na-reset-btn" onClick={() => setCategoryFilter('all')}>Show All</button>
              </div>
            )}
          </section>

          <div className="men-na-back">
            <Link to="/shop/men" className="men-na-back-link">← Back to Men's Collection</Link>
          </div>
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default MenNewArrivalsPage;
