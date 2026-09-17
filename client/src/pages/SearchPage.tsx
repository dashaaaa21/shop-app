import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductGrid } from '../components/ProductGrid';
import { productsApi, type Product } from '../api/products/products.api';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setTotalResults(0);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productsApi.getAll({
          search: query,
          limit: 50,
        });
        setProducts(response.products);
        setTotalResults(response.total);
      } catch (err: any) {
        setError(err?.message || 'Failed to search products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-page">
      <Header />

      <main className="search-main">
        <div className="container">
          <div className="search-header">
            <h1 className="search-title">Search Results</h1>
            {query && (
              <p className="search-query">
                {loading ? 'Searching for' : 'Results for'} "<strong>{query}</strong>"
              </p>
            )}
            {totalResults > 0 && !loading && (
              <p className="search-count">Found {totalResults} product{totalResults !== 1 ? 's' : ''}</p>
            )}
          </div>

          {!query.trim() ? (
            <div className="search-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="search-empty-icon">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <h2>Start searching</h2>
              <p>Enter a product name or keyword to find items</p>
            </div>
          ) : loading ? (
            <div className="search-loading">
              <div className="loader"></div>
              <p>Searching products...</p>
            </div>
          ) : error ? (
            <div className="search-error">
              <h2>Error</h2>
              <p>{error}</p>
            </div>
          ) : products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="search-no-results">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="search-empty-icon">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <h2>No products found</h2>
              <p>Try different keywords or browse our collections</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
