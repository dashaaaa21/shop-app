import ProductCard from '../ProductCard';
import './ProductGrid.css';

interface Product {
  id: string;
  external_id?: string;
  name: string;
  price: number;
  // Support both camelCase (legacy) and snake_case (Supabase)
  discountPrice?: number;
  discount_price?: number | null;
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
          {products.map((product, index) => {
            // Normalize: prefer external_id for routing (matches /products/:id), fall back to id
            const routeId = product.external_id ?? product.id;
            const discountPrice = product.discountPrice ?? product.discount_price ?? undefined;

            return (
              <div
                key={product.id}
                className="product-grid__item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard
                  id={routeId}
                  name={product.name}
                  price={product.price}
                  discountPrice={discountPrice ?? undefined}
                  images={product.images}
                  category={product.category}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
