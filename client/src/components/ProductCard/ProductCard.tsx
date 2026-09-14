import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images?: string[];
  category: string;
}

const ProductCard = ({ id, name, price, discountPrice, images = [], category }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    img.src = 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Item';
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const currentPrice = discountPrice || price;
  const hasDiscount = !!discountPrice;
  const discountPercentage = hasDiscount ? Math.round(((price - currentPrice) / price) * 100) : 0;

  return (
    <article 
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`${name} - ${category}`}
    >
      <Link 
        to={`/products/${id}`} 
        className="product-card__link"
        aria-label={`View details for ${name}`}
      >
        <div className="product-card__image-wrapper">
          <img
            src={images && images[0] ? images[0] : 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Item'}
            alt={`${name} - ${category}`}
            className={`product-card__image ${imageLoaded ? 'loaded' : ''}`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
          {hasDiscount && (
            <span className="product-card__badge" aria-label={`${discountPercentage}% off`}>
              Sale {discountPercentage}%
            </span>
          )}
          {isHovered && (
            <div className="product-card__quick-add">
              <button 
                className="product-card__add-btn"
                onClick={(e) => {
                  e.preventDefault();
                  // Quick add functionality to be implemented
                }}
                aria-label={`Quick add ${name} to cart`}
              >
                Quick Add
              </button>
            </div>
          )}
        </div>

        <div className="product-card__info">
          <p className="product-card__category">{category}</p>
          <h3 className="product-card__name">{name}</h3>
          <div className="product-card__price">
            <span className="product-card__price-current" aria-label={`Current price ${currentPrice} euros`}>
              €{currentPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="product-card__price-original" aria-label={`Original price ${price} euros`}>
                €{price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
