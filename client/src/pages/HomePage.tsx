import Header from '../components/Header';
import Hero from '../components/Hero';
import EditorialSection from '../components/EditorialSection';
import CategoryEditorial from '../components/CategoryEditorial';
import ProductGrid from '../components/ProductGrid';

// Sample products data
const newArrivals = [
  {
    id: '1',
    name: 'Premium Wool Overcoat',
    price: 299,
    discountPrice: 249,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=90',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=90',
    ],
    category: 'Outerwear',
  },
  {
    id: '2',
    name: 'Cashmere Sweater',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=90',
    ],
    category: 'Sweaters',
  },
  {
    id: '3',
    name: 'Tailored Wool Blazer',
    price: 349,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=90',
    ],
    category: 'Blazers',
  },
  {
    id: '4',
    name: 'Cotton Oxford Shirt',
    price: 89,
    discountPrice: 69,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=90',
    ],
    category: 'Shirts',
  },
];

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <Hero />
      <EditorialSection />
      <CategoryEditorial />
      <ProductGrid title="New Arrivals" products={newArrivals} />
    </div>
  );
};

export default HomePage;
