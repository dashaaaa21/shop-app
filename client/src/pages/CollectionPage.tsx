import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { ProductGrid } from '../components/ProductGrid';
import { getCollectionProducts, CollectionSlug } from '../data/products.data';
import './CollectionPage.css';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Image';
};

const collectionMeta: Record<
  CollectionSlug,
  { title: string; subtitle: string; description: string; heroImage: string; accent: string }
> = {
  'wedding-collection': {
    title: 'Wedding Collection',
    subtitle: 'AW 2026',
    description: 'Crafted for the most important day — bridal gowns, accessories and finishing touches designed with precision and romance.',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&h=600&fit=crop&crop=top&q=90',
    accent: '#c9a96e',
  },
  'party-collection': {
    title: 'Party Collection',
    subtitle: 'AW 2026',
    description: 'Dress to be remembered. Sequins, velvet, feathers — everything you need to own every room you walk into.',
    heroImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1400&h=600&fit=crop&crop=top&q=90',
    accent: '#8b6b8b',
  },
  'halloween-collection': {
    title: 'Halloween Collection',
    subtitle: 'AW 2026',
    description: 'Dark, dramatic, unforgettable. Gothic capes, corset dresses and statement accessories for the most theatrical night of the year.',
    heroImage: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=1400&h=600&fit=crop&crop=top&q=90',
    accent: '#c25d2a',
  },
};

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const meta = slug ? collectionMeta[slug as CollectionSlug] : null;

  useEffect(() => {
    if (!meta) return;
    window.scrollTo(0, 0);
    document.title = `${meta.title} | Shop`;
  }, [slug, meta]);

  if (!slug || !meta) {
    return <Navigate to="/" replace />;
  }

  const allProducts = getCollectionProducts(slug as CollectionSlug);

  const categories = ['all', ...Array.from(new Set(allProducts.map((p) => p.category)))];

  let filtered = categoryFilter === 'all'
    ? allProducts
    : allProducts.filter((p) => p.category === categoryFilter);

  filtered = [...filtered].sort((a, b) => {
    const priceA = a.discountPrice ?? a.price;
    const priceB = b.discountPrice ?? b.price;
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="collection-page">
      <Header />

      <main className="collection-main">
        <div className="container">

          {/* Breadcrumbs */}
          <nav className="col-breadcrumbs">
            <Link to="/" className="col-breadcrumb-link">Home</Link>
            <span className="col-breadcrumb-sep">/</span>
            <span className="col-breadcrumb-current">{meta.title}</span>
          </nav>

          {/* Hero */}
          <section className="col-hero">
            <div className="col-hero__image">
              <img src={meta.heroImage} alt={meta.title} onError={handleImageError} />
              <div className="col-hero__overlay">
                <p className="col-hero__eyebrow" style={{ color: meta.accent }}>
                  {meta.subtitle}
                </p>
                <h1 className="col-hero__title">{meta.title}</h1>
                <p className="col-hero__description">{meta.description}</p>
              </div>
            </div>
          </section>

          {/* Controls */}
          <section className="col-controls">
            <div className="col-controls__left">
              <p className="col-controls__count">
                {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            <div className="col-controls__right">
              <div className="col-category-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`col-category-tab ${categoryFilter === cat ? 'col-category-tab--active' : ''}`}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="col-sort-select"
                aria-label="Sort products"
              >
                <option value="default">Featured</option>
                <option value="name">Name (A–Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </section>

          {/* Products */}
          <section className="col-products">
            {filtered.length > 0 ? (
              <ProductGrid products={filtered} columns={3} />
            ) : (
              <div className="col-empty">
                <p>No items match the selected filter.</p>
                <button className="col-reset-btn" onClick={() => setCategoryFilter('all')}>
                  Show All
                </button>
              </div>
            )}
          </section>

          <div className="col-back">
            <Link to="/" className="col-back-link">← Back to Home</Link>
          </div>

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default CollectionPage;
