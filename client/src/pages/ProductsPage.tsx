import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductGrid } from '../components/ProductGrid';
import { Loader } from '../components/loader';
import { useProductStore } from '../store/product.store';
import { Product } from '../types/product.types';
import './ProductsPage.css';

interface FilterState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({});
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  const { 
    products, 
    loading, 
    error, 
    fetchProducts,
    searchProducts 
  } = useProductStore();

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (search) {
      searchProducts(search);
    } else {
      fetchProducts({ category: category || undefined });
    }
  }, [searchParams, fetchProducts, searchProducts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    
    if (newFilters.category) {
      params.set('category', newFilters.category);
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    setSearchParams(params);
  };

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'];

  if (loading) {
    return (
      <div className="products-page">
        <Header />
        <div className="container">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <Header />
        <div className="container">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="products-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="products-header">
            <h1>Products</h1>
            <div className="search-section">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          </div>

          <div className="products-content">
            <aside className="filters-sidebar">
              <div className="filter-section">
                <h3>Categories</h3>
                <div className="category-filters">
                  <button
                    className={`filter-button ${!filters.category ? 'active' : ''}`}
                    onClick={() => handleFilterChange({ ...filters, category: undefined })}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`filter-button ${filters.category === category ? 'active' : ''}`}
                      onClick={() => handleFilterChange({ ...filters, category })}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3>Price Range</h3>
                <div className="price-filters">
                  <input
                    type="number"
                    placeholder="Min price"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange({ 
                      ...filters, 
                      minPrice: e.target.value ? Number(e.target.value) : undefined 
                    })}
                    className="price-input"
                  />
                  <input
                    type="number"
                    placeholder="Max price"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange({ 
                      ...filters, 
                      maxPrice: e.target.value ? Number(e.target.value) : undefined 
                    })}
                    className="price-input"
                  />
                </div>
              </div>

              <div className="filter-section">
                <h3>Sort By</h3>
                <select
                  value={`${filters.sortBy || 'name'}-${filters.sortOrder || 'asc'}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-') as [string, 'asc' | 'desc'];
                    handleFilterChange({ 
                      ...filters, 
                      sortBy: sortBy as FilterState['sortBy'], 
                      sortOrder 
                    });
                  }}
                  className="sort-select"
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="rating-desc">Rating (High to Low)</option>
                </select>
              </div>
            </aside>

            <div className="products-grid-container">
              {products.length > 0 ? (
                <>
                  <div className="results-info">
                    <p>{products.length} products found</p>
                  </div>
                  <ProductGrid products={products} />
                </>
              ) : (
                <div className="no-products">
                  <h3>No products found</h3>
                  <p>Try adjusting your search criteria or filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;