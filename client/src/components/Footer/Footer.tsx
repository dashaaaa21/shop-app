import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Shop */}
          <div className="footer__column">
            <h3 className="footer__heading">Shop</h3>
            <nav className="footer__nav">
              <Link to="/shop/new-arrivals" className="footer__link">New Arrivals</Link>
              <Link to="/shop/jackets" className="footer__link">Jackets</Link>
              <Link to="/shop/hoodies" className="footer__link">Hoodies</Link>
              <Link to="/shop/shirts" className="footer__link">Shirts</Link>
              <Link to="/shop/pants" className="footer__link">Pants</Link>
            </nav>
          </div>

          {/* About */}
          <div className="footer__column">
            <h3 className="footer__heading">About</h3>
            <nav className="footer__nav">
              <Link to="/about" className="footer__link">Our Story</Link>
              <Link to="/journal" className="footer__link">Journal</Link>
              <Link to="/contact" className="footer__link">Contact</Link>
              <Link to="/careers" className="footer__link">Careers</Link>
            </nav>
          </div>

          {/* Help */}
          <div className="footer__column">
            <h3 className="footer__heading">Help</h3>
            <nav className="footer__nav">
              <Link to="/shipping" className="footer__link">Shipping</Link>
              <Link to="/returns" className="footer__link">Returns</Link>
              <Link to="/faq" className="footer__link">FAQ</Link>
              <Link to="/size-guide" className="footer__link">Size Guide</Link>
            </nav>
          </div>

          {/* Social */}
          <div className="footer__column">
            <h3 className="footer__heading">Follow Us</h3>
            <nav className="footer__nav">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__link">
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__link">
                Facebook
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="footer__link">
                TikTok
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="footer__link">
                Pinterest
              </a>
            </nav>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} VALORÉ. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link to="/privacy" className="footer__legal-link">Privacy Policy</Link>
            <Link to="/terms" className="footer__legal-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
