import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=90"
          alt="New Collection"
          className="hero__image"
        />
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content">
        <div className="hero__text">
          <h1 className="hero__title">THE NEW COLLECTION</h1>
          <p className="hero__description">
            Autumn / Winter 2026 is here.<br />
            Refined silhouettes, tactile fabrics,<br />
            and considered details for those<br />
            who dress with intention.
          </p>
          <Link to="/#new-collection" className="hero__button" onClick={(e) => {
            const el = document.getElementById('new-collection');
            if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
          }}>
            Explore the Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
