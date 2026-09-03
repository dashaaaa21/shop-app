import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { ProductGrid } from '../components/ProductGrid';
import { getProductsByCategory } from '../data/products.data';
import './CategoryPage.css';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  img.src = 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Image';
};

const categoryInfo = {
  dresses: {
    title: 'Dresses',
    description: 'Elegant dresses for every occasion — from casual day wear to sophisticated evening pieces',
    heroImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1200&h=600&fit=crop&q=80',
    filter: 'Dresses',
  },
  trousers: {
    title: 'Trousers',
    description: 'Sophisticated trousers crafted for the modern woman who values comfort and style',
    heroImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&h=600&fit=crop&q=80',
    filter: 'TROUSERS',
  },
  sweaters: {
    title: 'Sweaters',
    description: 'Minimalist sweaters and cozy knitwear for timeless elegance',
    heroImage: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=1200&h=600&fit=crop&q=80',
    filter: 'SWEATERS',
  },
  'evening-wear': {
    title: 'Evening Wear',
    description: 'Exceptional pieces designed for your most special moments',
    heroImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&h=600&fit=crop&q=80',
    filter: 'Evening Wear',
  },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');

  const currentCategory = category
    ? categoryInfo[category as keyof typeof categoryInfo]
    : null;

  useEffect(() => {
    if (!currentCategory) return;
    window.scrollTo(0, 0);
    document.title = `${currentCategory.title} - Women's Collection | Shop`;
  }, [category, currentCategory]);

  if (!category || !currentCategory) {
    return <Navigate to="/shop/women" replace />;
  }

  // Get all products for this category from centralized data
  const allCategoryProducts = getProductsByCategory(currentCategory.filter);

  // Apply price filter
  let filteredProducts = allCategoryProducts.filter((product) => {
    const price = product.discountPrice ?? product.price;
    if (priceRange === 'under-100') return price < 100;
    if (priceRange === '100-200') return price >= 100 && price <= 200;
    if (priceRange === 'over-200') return price > 200;
    return true;
  });

  // Apply sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price);
    if (sortBy === 'price-high') return (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price);
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="category-page">
      <Header />

      <main className="main-content">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/shop/women" className="breadcrumb-link">Women</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{currentCategory.title}</span>
          </nav>

          {/* Hero Section */}
          <section className="category-hero">
            <div className="category-hero__image">
              <img
                src={currentCategory.heroImage}
                alt={`${currentCategory.title} collection`}
                onError={handleImageError}
              />
              <div className="category-hero__overlay">
                <div className="category-hero__content">
                  <h1 className="category-hero__title">{currentCategory.title}</h1>
                  <p className="category-hero__description">{currentCategory.description}</p>
                  <div className="category-hero__stats">
                    <span className="category-hero__count">
                      {allCategoryProducts.length} {allCategoryProducts.length === 1 ? 'item' : 'items'} available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Filters and Sorting */}
          <section className="category-controls">
            <div className="category-controls__left">
              <h2 className="category-controls__title">{currentCategory.title} Collection</h2>
              <p className="category-controls__count">
                Showing {filteredProducts.length} of {allCategoryProducts.length} items
              </p>
            </div>

            <div className="category-controls__right">
              <div className="category-filter">
                <label htmlFor="price-filter">Price Range:</label>
                <select
                  id="price-filter"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="category-filter__select"
                  aria-label="Filter products by price range"
                >
                  <option value="all">All Prices</option>
                  <option value="under-100">Under €100</option>
                  <option value="100-200">€100 – €200</option>
                  <option value="over-200">Over €200</option>
                </select>
              </div>

              <div className="category-filter">
                <label htmlFor="sort-filter">Sort by:</label>
                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="category-filter__select"
                >
                  <option value="name">Name (A–Z)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </section>

          {/* Products */}
          <section className="category-products">
            {filteredProducts.length > 0 ? (
              <>
                <ProductGrid products={filteredProducts} columns={3} />
                <div className="category-actions">
                  <Link to="/shop/women" className="back-to-collection-btn">
                    ← Back to Women's Collection
                  </Link>
                </div>
              </>
            ) : (
              <div className="category-empty">
                <h3>No items found</h3>
                <p>Try adjusting your filters to see more products.</p>
                <Link to="/shop/women" className="back-to-collection-btn">
                  ← Back to Women's Collection
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

export default CategoryPage;
