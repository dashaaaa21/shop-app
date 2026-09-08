import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Newsletter } from '../components/Newsletter';
import { getFeaturedProducts } from '../data/products.data';
import './HomePage.css';

const categories = [
  {
    label: 'Women',
    sub: 'New Season',
    to: '/shop/women',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1100&fit=crop&crop=top&q=90',
  },
  {
    label: 'Men',
    sub: 'New Season',
    to: '/shop/men',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&h=1100&fit=crop&crop=top&q=90',
  },
  {
    label: 'Collections',
    sub: 'AW 2026',
    to: '/collection',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=1100&fit=crop&crop=top&q=90',
  },
];

const HomePage = () => {
  const featured = getFeaturedProducts().slice(0, 4);

  useEffect(() => {
    document.title = 'Shop — AW 2026 Collection';
  }, []);

  return (
    <div className="homepage">
      <Header />

      {/* ── 1. Full-screen Hero ── */}
      <section className="home-hero">
        <div className="home-hero__media">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=95"
            alt="AW 2026 Collection"
            className="home-hero__img"
          />
          <div className="home-hero__overlay" />
        </div>
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">AW 2026</p>
          <h1 className="home-hero__title">The New<br />Collection</h1>
          <p className="home-hero__sub">
            Refined silhouettes, tactile fabrics<br />
            and considered details.
          </p>
          <Link to="/collection" className="home-hero__btn">
            Explore the Collection
          </Link>
        </div>
      </section>

      {/* ── 2. Featured Categories ── */}
      <section className="home-cats">
        <div className="home-cats__grid">
          {categories.map((cat) => (
            <Link key={cat.label} to={cat.to} className="home-cats__card">
              <div className="home-cats__img-wrap">
                <img src={cat.image} alt={cat.label} className="home-cats__img" />
                <div className="home-cats__veil" />
              </div>
              <div className="home-cats__info">
                <span className="home-cats__sub">{cat.sub}</span>
                <span className="home-cats__label">{cat.label}</span>
                <span className="home-cats__arrow">Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. Brand Statement ── */}
      <section className="home-statement">
        <div className="home-statement__inner">
          <span className="home-statement__rule" />
          <blockquote className="home-statement__quote">
            Elegance is not about being noticed —<br />
            it is about being remembered.
          </blockquote>
          <p className="home-statement__body">
            Every piece in our collection is designed to outlast trends,<br />
            outlive seasons, and outlove anything ordinary.
          </p>
          <Link to="/collection" className="home-statement__link">
            Discover the Collection →
          </Link>
        </div>
      </section>

      {/* ── 4. Featured Products ── */}
      <section className="home-featured">
        <div className="home-featured__header">
          <h2 className="home-featured__heading">Featured Pieces</h2>
          <Link to="/new-arrivals" className="home-featured__see-all">See All →</Link>
        </div>
        <div className="home-featured__grid">
          {featured.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="home-featured__card"
            >
              <div className="home-featured__img-wrap">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="home-featured__img"
                />
                {product.discountPrice && (
                  <span className="home-featured__badge">Sale</span>
                )}
              </div>
              <div className="home-featured__info">
                <span className="home-featured__cat">{product.category}</span>
                <h3 className="home-featured__name">{product.name}</h3>
                <div className="home-featured__price">
                  {product.discountPrice ? (
                    <>
                      <span className="home-featured__price--sale">€{product.discountPrice}</span>
                      <span className="home-featured__price--orig">€{product.price}</span>
                    </>
                  ) : (
                    <span>€{product.price}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
