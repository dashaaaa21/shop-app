import ProductCard from '../ProductCard';
import './ProductGrid.css';

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images?: string[];
  category: string;
}

interface ProductGridProps {
  title?: string;
  products: Product[];
  columns?: 2 | 3 | 4;
}

const ProductGrid = ({ title, products, columns = 4 }: ProductGridProps) => {
  return (
    <section className="product-grid">
      <div className="product-grid__container">
        {title && (
          <div className="product-grid__header">
            <h2 className="product-grid__title">{title}</h2>
          </div>
        )}

        <div className={`product-grid__items product-grid__items--col-${columns}`}>
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-grid__item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
