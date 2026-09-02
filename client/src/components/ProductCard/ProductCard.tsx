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
  const [imageIndex, setImageIndex] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (images && images.length > 1) {
      setImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setImageIndex(0);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    img.src = 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Item';
  };

  const currentPrice = discountPrice || price;
  const hasDiscount = !!discountPrice;

  return (
    <article 
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/products/${id}`} className="product-card__link">
        <div className="product-card__image-wrapper">
          <img
            src={images && images[imageIndex] ? images[imageIndex] : (images && images[0]) || 'https://via.placeholder.com/600x600/f8f7f4/777777?text=Fashion+Item'}
            alt={name}
            className="product-card__image"
            onError={handleImageError}
          />
          {hasDiscount && (
            <span className="product-card__badge">Sale</span>
          )}
          {isHovered && (
            <div className="product-card__quick-add">
              <button className="product-card__add-btn">Quick Add</button>
            </div>
          )}
        </div>

        <div className="product-card__info">
          <p className="product-card__category">{category}</p>
          <h3 className="product-card__name">{name}</h3>
          <div className="product-card__price">
            <span className="product-card__price-current">€{currentPrice}</span>
            {hasDiscount && (
              <span className="product-card__price-original">€{price}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
