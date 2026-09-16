import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.store';
import { useCartStore } from './store/cart.store';
import { ROUTES } from './constants/routes';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WomenPage from './pages/WomenPage';
import CategoryPage from './pages/CategoryPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import MenPage from './pages/MenPage';
import MenCategoryPage from './pages/MenCategoryPage';
import MenNewArrivalsPage from './pages/MenNewArrivalsPage';
import CollectionPage from './pages/CollectionPage';
import ShopCollectionPage from './pages/ShopCollectionPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';

function App() {
  const { initialize: initAuth, isAuthenticated } = useAuthStore();
  const { fetchCart } = useCartStore();

  useEffect(() => {
    initAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch cart when user authenticates
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart().catch(console.error);
    }
  }, [isAuthenticated, fetchCart]);

  return (
    <div className="app">
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path="/collection" element={<ShopCollectionPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path="/shop/women" element={<WomenPage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/shop/women/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/shop/women/category/:category" element={<CategoryPage />} />
        <Route path="/shop/men" element={<MenPage />} />
        <Route path="/shop/men/new-arrivals" element={<MenNewArrivalsPage />} />
        <Route path="/shop/men/category/:category" element={<MenCategoryPage />} />
        <Route path="/shop/:slug" element={<CollectionPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
        <Route path={ROUTES.ORDERS} element={<OrdersPage />} />
        <Route path={ROUTES.ORDER_DETAIL} element={<OrderDetailPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </div>
  );
}

export default App;
