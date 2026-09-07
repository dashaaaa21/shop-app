import { Link } from 'react-router-dom';
import './CategoryEditorial.css';

const editorialItems = [
  {
    label: 'Wedding Collection',
    slug: 'wedding-collection',
    // Elegant bride in white wedding gown — Unsplash (José Antonio Gallego Vázquez)
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1100&fit=crop&crop=top&q=90',
    size: 'tall',
  },
  {
    label: 'Party Collection',
    slug: 'party-collection',
    // Glamorous evening dress editorial — Unsplash (Chalo Garcia)
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=1100&fit=crop&crop=top&q=90',
    size: 'tall',
  },
  {
    label: 'Halloween Collection',
    slug: 'halloween-collection',
    // Halloween kids costumes — Unsplash (7FC-84Ap_IU)
    image: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&h=1100&fit=crop&crop=top&q=90',
    size: 'tall',
  },
];

const CategoryEditorial = () => {
  return (
    <section className="category-editorial" id="new-collection">
      <div className="category-editorial__grid">
        {editorialItems.map((item) => (
          <Link
            key={item.slug}
            to="/new-arrivals"
            className={`category-editorial__card category-editorial__card--${item.size}`}
          >
            <div className="category-editorial__card-image">
              <img
                src={item.image}
                alt={item.label}
                className="category-editorial__img"
              />
              <div className="category-editorial__card-overlay" />
            </div>
            <div className="category-editorial__card-label">
              <span className="category-editorial__card-name">{item.label}</span>
              <span className="category-editorial__card-cta">Shop Now →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryEditorial;
