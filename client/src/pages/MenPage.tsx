import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { ProductGrid } from '../components/ProductGrid';
import { getMenFeaturedProducts, getMenNewArrivals } from '../data/products.data';
import './MenPage.css';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  img.src = 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Image';
};

const featuredProducts = getMenFeaturedProducts();
const newArrivals = getMenNewArrivals();

const categories = [
  {
    id: 'mcat1',
    name: 'Suits',
    slug: 'suits',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop&q=80',
    description: 'Precision tailoring for the modern man',
    itemCount: '12+ styles',
  },
  {
    id: 'mcat2',
    name: 'TROUSERS',
    slug: 'trousers',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=600&fit=crop&q=80',
    description: 'Refined trousers for every occasion',
    itemCount: '18+ styles',
  },
  {
    id: 'mcat3',
    name: 'SWEATERS',
    slug: 'sweaters',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=600&fit=crop&q=80',
    description: 'Premium knitwear and cozy essentials',
    itemCount: '22+ styles',
  },
  {
    id: 'mcat4',
    name: 'Outerwear',
    slug: 'outerwear',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=600&fit=crop&q=80',
    description: 'Coats and jackets built to last',
    itemCount: '16+ styles',
  },
];

const MenPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Men's Collection | Shop";
  }, []);

  return (
    <div className="men-page">
      <Header />

      <main className="men-main">
        <div className="container">

          {/* Hero */}
          <section className="men-hero">
            <div className="men-hero__content">
              <h1 className="men-hero__title">Men's Collection</h1>
              <p className="men-hero__description">
                Discover our curated selection of refined menswear — where precision
                tailoring meets timeless style. Each piece is crafted for the man
                who values quality above all else.
              </p>
              <div className="men-hero__stats">
                <div className="men-stat">
                  <span className="men-stat__number">180+</span>
                  <span className="men-stat__label">Exclusive Pieces</span>
                </div>
                <div className="men-stat">
                  <span className="men-stat__number">12+</span>
                  <span className="men-stat__label">Premium Brands</span>
                </div>
                <div className="men-stat">
                  <span className="men-stat__number">4.8</span>
                  <span className="men-stat__label">Customer Rating</span>
                </div>
              </div>
            </div>
            <div className="men-hero__image">
              <img
                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&h=1000&fit=crop&q=80"
                alt="Men's Fashion"
                onError={handleImageError}
              />
            </div>
          </section>

          {/* Categories */}
          <section className="men-categories">
            <div className="men-section-header">
              <h2 className="men-section-title">Shop by Category</h2>
              <p className="men-section-description">
                Explore our thoughtfully organized collections
              </p>
            </div>
            <div className="men-categories__grid">
              {categories.map((cat) => (
                <div key={cat.id} className="men-category-card">
                  <div className="men-category-card__image">
                    <img src={cat.image} alt={cat.name} onError={handleImageError} />
                    <div className="men-category-card__overlay">
                      <Link
                        to={`/shop/men/category/${cat.slug}`}
                        className="men-category-card__btn"
                      >
                        Shop {cat.name}
                      </Link>
                    </div>
                  </div>
                  <div className="men-category-card__info">
                    <h3 className="men-category-card__name">{cat.name}</h3>
                    <p className="men-category-card__desc">{cat.description}</p>
                    <span className="men-category-card__count">{cat.itemCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured */}
          <section className="men-featured">
            <div className="men-section-header">
              <h2 className="men-section-title">Featured Selection</h2>
              <p className="men-section-description">
                Handpicked pieces that define contemporary menswear
              </p>
            </div>
            <ProductGrid products={featuredProducts} />
          </section>

          {/* New Arrivals */}
          <section className="men-new-arrivals">
            <div className="men-section-header">
              <h2 className="men-section-title">New Arrivals</h2>
              <p className="men-section-description">
                The latest additions to our curated collection
              </p>
            </div>
            <ProductGrid products={newArrivals.slice(0, 4)} />
            <div className="men-section-actions">
              <Link to="/new-arrivals" className="men-view-all-btn">
                View All New Arrivals
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default MenPage;
