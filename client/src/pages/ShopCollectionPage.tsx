import { useEffect } from 'react';
import { Header } from '../components/Header';
import { EditorialSection } from '../components/EditorialSection';
import { CategoryEditorial } from '../components/CategoryEditorial';
import { ProductGrid } from '../components/ProductGrid';
import { Newsletter } from '../components/Newsletter';
import { Footer } from '../components/Footer';
import './ShopCollectionPage.css';

const newArrivals = [
  {
    id: '1',
    name: 'Premium Wool Overcoat',
    price: 299,
    discountPrice: 249,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=90',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=90',
    ],
    category: 'Outerwear',
  },
  {
    id: '2',
    name: 'Cashmere Sweater',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=90',
    ],
    category: 'Sweaters',
  },
  {
    id: '3',
    name: 'Tailored Wool Blazer',
    price: 349,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=90',
    ],
    category: 'Blazers',
  },
  {
    id: '4',
    name: 'Cotton Oxford Shirt',
    price: 89,
    discountPrice: 69,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=90',
    ],
    category: 'Shirts',
  },
];

const ShopCollectionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Collection — AW 2026 | Shop';
  }, []);

  return (
    <div className="shop-collection-page">
      <Header />

      {/* Hero Banner */}
      <section className="sc-hero">
        <div className="sc-hero__image">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=700&fit=crop&q=80"
            alt="New Collection"
          />
          <div className="sc-hero__overlay">
            <p className="sc-hero__label">AW 2026</p>
            <h1 className="sc-hero__title">New Collection</h1>
            <p className="sc-hero__subtitle">
              Timeless pieces crafted for the modern wardrobe
            </p>
            <a href="#collection-products" className="sc-hero__cta">
              Explore Now
            </a>
          </div>
        </div>
      </section>

      <EditorialSection />
      <CategoryEditorial />
      <div id="collection-products">
        <ProductGrid title="New Arrivals" products={newArrivals} />
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ShopCollectionPage;
