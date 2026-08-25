import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryEditorial.css';

const categories = [
  { name: 'Jackets', slug: 'jackets' },
  { name: 'Hoodies', slug: 'hoodies' },
  { name: 'Shirts', slug: 'shirts' },
  { name: 'Pants', slug: 'pants' },
  { name: 'Sweaters', slug: 'sweaters' },
  { name: 'Blazers', slug: 'blazers' },
  { name: 'Trousers', slug: 'trousers' },
  { name: 'Outerwear', slug: 'outerwear' },
];

const CategoryEditorial = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="category-editorial">
      <div className="category-editorial__container">
        {/* Left Editorial Image */}
        <div className="category-editorial__image category-editorial__image--left">
          <img
            src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&q=90"
            alt="Male fashion model"
            className="category-editorial__img"
          />
        </div>

        {/* Center Category List */}
        <div className="category-editorial__content">
          <h2 className="category-editorial__heading">Exclusive Editions</h2>

          <nav className="category-editorial__list">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                to={`/shop/${category.slug}`}
                className={`category-editorial__item ${
                  hoveredIndex === index ? 'category-editorial__item--active' : ''
                } ${
                  hoveredIndex !== null && hoveredIndex !== index
                    ? 'category-editorial__item--dimmed'
                    : ''
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Editorial Image */}
        <div className="category-editorial__image category-editorial__image--right">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=90"
            alt="Female fashion model"
            className="category-editorial__img"
          />
        </div>
      </div>
    </section>
  );
};

export default CategoryEditorial;
