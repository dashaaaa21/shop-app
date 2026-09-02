import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { ProductGrid } from '../components/ProductGrid';
import { getNewArrivals } from '../data/products.data';
import './NewArrivalsPage.css';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  img.src = 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Image';
};

const allNewArrivals = getNewArrivals();

const NewArrivalsPage = () => {
  const [sortBy, setSortBy] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "New Arrivals — Women's Collection | Shop";
  }, []);

  const categories = ['all', ...Array.from(new Set(allNewArrivals.map((p) => p.category)))];

  let filtered = categoryFilter === 'all'
    ? allNewArrivals
    : allNewArrivals.filter((p) => p.category === categoryFilter);

  filtered = [...filtered].sort((a, b) => {
    const priceA = a.discountPrice ?? a.price;
    const priceB = b.discountPrice ?? b.price;
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="new-arrivals-page">
      <Header />

      <main className="new-arrivals-main">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="na-breadcrumbs">
            <Link to="/" className="na-breadcrumb-link">Home</Link>
            <span className="na-breadcrumb-sep">/</span>
            <Link to="/shop/women" className="na-breadcrumb-link">Women</Link>
            <span className="na-breadcrumb-sep">/</span>
            <span className="na-breadcrumb-current">New Arrivals</span>
          </nav>

          {/* Hero */}
          <section className="na-hero">
            <div className="na-hero__image">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=500&fit=crop&q=80"
                alt="New Arrivals"
                onError={handleImageError}
              />
              <div className="na-hero__overlay">
                <h1 className="na-hero__title">New Arrivals</h1>
                <p className="na-hero__subtitle">
                  The latest additions to our curated women's collection
                </p>
              </div>
            </div>
          </section>

          {/* Controls */}
          <section className="na-controls">
            <div className="na-controls__left">
              <p className="na-controls__count">
                {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            <div className="na-controls__right">
              {/* Category tabs */}
              <div className="na-category-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`na-category-tab ${categoryFilter === cat ? 'na-category-tab--active' : ''}`}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="na-sort-select"
                aria-label="Sort new arrivals"
              >
                <option value="default">Latest First</option>
                <option value="name">Name (A–Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </section>

          {/* Grid */}
          <section className="na-products">
            {filtered.length > 0 ? (
              <ProductGrid products={filtered} columns={4} />
            ) : (
              <div className="na-empty">
                <p>No items match the selected filter.</p>
                <button className="na-reset-btn" onClick={() => setCategoryFilter('all')}>
                  Show All
                </button>
              </div>
            )}
          </section>

          <div className="na-back">
            <Link to="/shop/women" className="na-back-link">
              ← Back to Women's Collection
            </Link>
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default NewArrivalsPage;
