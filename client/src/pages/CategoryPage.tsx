import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { ProductGrid } from '../components/ProductGrid';
import './CategoryPage.css';

// Image error handling with fallback placeholder
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  img.src = 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Image';
};

// All women's products data
const allProducts = [
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
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop&q=80',
    ],
    category: 'TROUSERS',
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
    discountPrice: 129,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&h=600&fit=crop&q=80',
    ],
    category: 'SWEATERS',
  },
  // Additional products for each category
  {
    id: 'w9',
    name: 'Classic White Dress Shirt',
    price: 89,
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Blouses',
  },
  {
    id: 'w10',
    name: 'Floral Summer Dress',
    price: 199,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Dresses',
  },
  {
    id: 'w11',
    name: 'Wide Leg Trousers',
    price: 159,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop&q=80',
    ],
    category: 'TROUSERS',
  },
  {
    id: 'w12',
    name: 'Cozy Wool Sweater',
    price: 179,
    discountPrice: 149,
    images: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&h=600&fit=crop&q=80',
    ],
    category: 'SWEATERS',
  },
];

const categoryInfo = {
  'dresses': {
    title: 'Dresses',
    description: 'Elegant dresses for every occasion - from casual day wear to sophisticated evening pieces',
    heroImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1200&h=600&fit=crop&q=80',
    filter: 'Dresses'
  },
  'trousers': {
    title: 'Trousers',
    description: 'Sophisticated trousers crafted for the modern woman who values comfort and style',
    heroImage: 'https://images.unsplash.com/photo-1506629905607-47d67ee3bb67?w=1200&h=600&fit=crop&q=80',
    filter: 'TROUSERS'
  },
  'sweaters': {
    title: 'Sweaters',
    description: 'Minimalist sweaters and cozy knitwear for timeless elegance',
    heroImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop&q=80',
    filter: 'SWEATERS'
  },
  'evening-wear': {
    title: 'Evening Wear',
    description: 'Exceptional pieces designed for your most special moments',
    heroImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&h=600&fit=crop&q=80',
    filter: 'Evening Wear'
  }
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  if (!category || !categoryInfo[category as keyof typeof categoryInfo]) {
    return <Navigate to="/shop/women" replace />;
  }

  const currentCategory = categoryInfo[category as keyof typeof categoryInfo];
  
  // Filter products by category
  let filteredProducts = allProducts.filter(product => 
    product.category === currentCategory.filter
  );

  // Apply price filter
  if (priceRange !== 'all') {
    filteredProducts = filteredProducts.filter(product => {
      const price = product.discountPrice || product.price;
      switch (priceRange) {
        case 'under-100':
          return price < 100;
        case '100-200':
          return price >= 100 && price <= 200;
        case 'over-200':
          return price > 200;
        default:
          return true;
      }
    });
  }

  // Apply sorting
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case 'price-high':
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
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
                alt={currentCategory.title}
                onError={handleImageError}
              />
              <div className="category-hero__overlay">
                <div className="category-hero__content">
                  <h1 className="category-hero__title">{currentCategory.title}</h1>
                  <p className="category-hero__description">
                    {currentCategory.description}
                  </p>
                  <div className="category-hero__stats">
                    <span className="category-hero__count">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Filters and Sorting */}
          <section className="category-controls">
            <div className="category-controls__left">
              <h2 className="category-controls__title">
                {currentCategory.title} Collection
              </h2>
              <p className="category-controls__count">
                Showing {filteredProducts.length} of {allProducts.filter(p => p.category === currentCategory.filter).length} items
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
                >
                  <option value="all">All Prices</option>
                  <option value="under-100">Under €100</option>
                  <option value="100-200">€100 - €200</option>
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
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </section>

          {/* Products Section */}
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