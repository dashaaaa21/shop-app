import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=90"
          alt="Fashion Collection"
          className="hero__image"
        />
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content">
        <div className="hero__text">
          <h1 className="hero__title">NEW & NOW</h1>
          <p className="hero__description">
            Our newest styles are here.<br />
            Fresh designs, modern fits, and<br />
            must-have looks made to upgrade<br />
            your everyday wardrobe.
          </p>
          <Link to="/shop/new-arrivals" className="hero__button">
            Shop All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
