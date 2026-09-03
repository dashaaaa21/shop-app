import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { ProductGrid } from '../components/ProductGrid';
import { getMenNewArrivals } from '../data/products.data';
import './MenNewArrivalsPage.css';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  img.src = 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Image';
};

const allNewArrivals = getMenNewArrivals();

const MenNewArrivalsPage = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "New Arrivals — Men's Collection | Shop";
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
    <div className="men-na-page">
      <Header />

      <main className="men-na-main">
        <div className="container">

          {/* Breadcrumbs */}
          <nav className="men-na-breadcrumbs">
            <Link to="/" className="men-na-breadcrumb-link">Home</Link>
            <span className="men-na-breadcrumb-sep">/</span>
            <Link to="/shop/men" className="men-na-breadcrumb-link">Men</Link>
            <span className="men-na-breadcrumb-sep">/</span>
            <span className="men-na-breadcrumb-current">New Arrivals</span>
          </nav>

          {/* Hero */}
          <section className="men-na-hero">
            <div className="men-na-hero__image">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=500&fit=crop&q=80"
                alt="Men's New Arrivals"
                onError={handleImageError}
              />
              <div className="men-na-hero__overlay">
                <h1 className="men-na-hero__title">New Arrivals</h1>
                <p className="men-na-hero__subtitle">
                  The latest additions to our curated men's collection
                </p>
              </div>
            </div>
          </section>

          {/* Gender switcher */}
          <div className="na-gender-switcher">
            <button
              className="na-gender-btn"
              onClick={() => navigate('/shop/women/new-arrivals')}
            >
              Women
            </button>
            <button
              className="na-gender-btn na-gender-btn--active"
              aria-current="page"
            >
              Men
            </button>
          </div>

          {/* Controls */}
          <section className="men-na-controls">
            <div className="men-na-controls__left">
              <p className="men-na-controls__count">
                {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div className="men-na-controls__right">
              <div className="men-na-category-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`men-na-tab ${categoryFilter === cat ? 'men-na-tab--active' : ''}`}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="men-na-sort-select"
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
          <section className="men-na-products">
            {filtered.length > 0 ? (
              <ProductGrid products={filtered} columns={4} />
            ) : (
              <div className="men-na-empty">
                <p>No items match the selected filter.</p>
                <button className="men-na-reset-btn" onClick={() => setCategoryFilter('all')}>
                  Show All
                </button>
              </div>
            )}
          </section>

          <div className="men-na-back">
            <Link to="/shop/men" className="men-na-back-link">
              ← Back to Men's Collection
            </Link>
          </div>

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default MenNewArrivalsPage;
