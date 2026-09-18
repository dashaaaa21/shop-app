import './Skeleton.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  count?: number;
  className?: string;
}

export const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  circle = false,
  count = 1,
  className = '' 
}: SkeletonProps) => {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  const items = Array.from({ length: count });

  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          className={`skeleton ${circle ? 'skeleton--circle' : ''} ${className}`}
          style={style}
          role="status"
          aria-label="Loading..."
        />
      ))}
    </>
  );
};

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <Skeleton width="100%" height="200px" className="skeleton-card__image" />
    <div className="skeleton-card__content">
      <Skeleton width="80%" height="16px" />
      <Skeleton width="60%" height="14px" />
      <Skeleton width="40%" height="24px" />
    </div>
  </div>
);

export const SkeletonProductGrid = ({ count = 4 }: { count?: number }) => (
  <div className="skeleton-grid">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const SkeletonCartItem = () => (
  <div className="skeleton-cart-item">
    <Skeleton width="80px" height="80px" className="skeleton-cart-item__image" />
    <div className="skeleton-cart-item__details">
      <Skeleton width="60%" height="16px" />
      <Skeleton width="40%" height="14px" />
      <Skeleton width="30%" height="20px" />
    </div>
    <div className="skeleton-cart-item__actions">
      <Skeleton width="100px" height="32px" />
    </div>
  </div>
);

export const SkeletonOrderItem = () => (
  <div className="skeleton-order-item">
    <Skeleton width="100%" height="100px" />
  </div>
);
