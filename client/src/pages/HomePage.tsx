import Header from '../components/Header';
import Hero from '../components/Hero';
import EditorialSection from '../components/EditorialSection';
import CategoryEditorial from '../components/CategoryEditorial';

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <Hero />
      <EditorialSection />
      <CategoryEditorial />
    </div>
  );
};

export default HomePage;
