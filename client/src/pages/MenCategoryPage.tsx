import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { ProductGrid } from '../components/ProductGrid';
import { getMenProductsByCategory } from '../data/products.data';
import './MenCategoryPage.css';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  img.src = 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Image';
};

const categoryInfo = {
  suits: {
    title: 'Suits',
    description: 'Precision tailoring for the modern man — from boardroom to black tie',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=600&fit=crop&q=80',
    filter: 'Suits',
  },
  trousers: {
    title: 'Trousers',
    description: 'Refined trousers crafted for comfort and sophistication',
    heroImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1200&h=600&fit=crop&q=80',
    filter: 'TROUSERS',
  },
  sweaters: {
    title: 'Sweaters',
    description: 'Premium knitwear and cozy essentials for every season',
    heroImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=600&fit=crop&q=80',
    filter: 'SWEATERS',
  },
  outerwear: {
    title: 'Outerwear',
    description: 'Coats and jackets built to last — refined for the modern gentleman',
    heroImage: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&h=600&fit=crop&q=80',
    filter: 'Outerwear',
  },
  shirts: {
    title: 'Shirts',
    description: 'From crisp dress shirts to relaxed linens — the foundation of great dressing',
    heroImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&h=600&fit=crop&q=80',
    filter: 'Shirts',
  },
  jackets: {
    title: 'Jackets',
    description: 'Versatile outerwear that moves with you from city to country',
    heroImage: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1200&h=600&fit=crop&q=80',
    filter: 'Jackets',
  },
};

const MenCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');

  const currentCategory = category
    ? categoryInfo[category as keyof typeof categoryInfo]
    : null;

  useEffect(() => {
    if (!currentCategory) return;
    window.scrollTo(0, 0);
    document.title = `${currentCategory.title} — Men's Collection | Shop`;
  }, [category, currentCategory]);

  if (!category || !currentCategory) {
    return <Navigate to="/shop/men" replace />;
  }

  const allCategoryProducts = getMenProductsByCategory(currentCategory.filter);

  let filteredProducts = allCategoryProducts.filter((p) => {
    const price = p.discountPrice ?? p.price;
    if (priceRange === 'under-100') return price < 100;
    if (priceRange === '100-200') return price >= 100 && price <= 200;
    if (priceRange === 'over-200') return price > 200;
    return true;
  });

  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price);
    if (sortBy === 'price-high') return (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price);
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="men-cat-page">
      <Header />

      <main className="men-cat-main">
        <div className="container">

          {/* Breadcrumbs */}
          <nav className="men-cat-breadcrumbs">
            <Link to="/" className="men-cat-breadcrumb-link">Home</Link>
            <span className="men-cat-breadcrumb-sep">/</span>
            <Link to="/shop/men" className="men-cat-breadcrumb-link">Men</Link>
            <span className="men-cat-breadcrumb-sep">/</span>
            <span className="men-cat-breadcrumb-current">{currentCategory.title}</span>
          </nav>

          {/* Hero */}
          <section className="men-cat-hero">
            <div className="men-cat-hero__image">
              <img
                src={currentCategory.heroImage}
                alt={`${currentCategory.title} collection`}
                onError={handleImageError}
              />
              <div className="men-cat-hero__overlay">
                <div className="men-cat-hero__content">
                  <h1 className="men-cat-hero__title">{currentCategory.title}</h1>
                  <p className="men-cat-hero__description">{currentCategory.description}</p>
                  <span className="men-cat-hero__count">
                    {allCategoryProducts.length} {allCategoryProducts.length === 1 ? 'item' : 'items'} available
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Controls */}
          <section className="men-cat-controls">
            <div className="men-cat-controls__left">
              <h2 className="men-cat-controls__title">{currentCategory.title} Collection</h2>
              <p className="men-cat-controls__count">
                Showing {filteredProducts.length} of {allCategoryProducts.length} items
              </p>
            </div>
            <div className="men-cat-controls__right">
              <div className="men-cat-filter">
                <label htmlFor="men-price-filter">Price Range:</label>
                <select
                  id="men-price-filter"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="men-cat-filter__select"
                  aria-label="Filter by price range"
                >
                  <option value="all">All Prices</option>
                  <option value="under-100">Under €100</option>
                  <option value="100-200">€100 – €200</option>
                  <option value="over-200">Over €200</option>
                </select>
              </div>
              <div className="men-cat-filter">
                <label htmlFor="men-sort-filter">Sort by:</label>
                <select
                  id="men-sort-filter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="men-cat-filter__select"
                >
                  <option value="name">Name (A–Z)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </section>

          {/* Products */}
          <section className="men-cat-products">
            {filteredProducts.length > 0 ? (
              <>
                <ProductGrid products={filteredProducts} columns={3} />
                <div className="men-cat-actions">
                  <Link to="/shop/men" className="men-cat-back-btn">
                    ← Back to Men's Collection
                  </Link>
                </div>
              </>
            ) : (
              <div className="men-cat-empty">
                <h3>No items found</h3>
                <p>Try adjusting your filters to see more products.</p>
                <Link to="/shop/men" className="men-cat-back-btn">
                  ← Back to Men's Collection
                </Link>
              </div>
            )}
          </section>

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default MenCategoryPage;
