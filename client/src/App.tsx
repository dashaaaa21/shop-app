import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.store';
import { useCartStore } from './store/cart.store';
import { ROUTES } from './constants/routes';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

// Placeholder pages

const LoginPage = () => (
  <div className="container">
    <h1>Login</h1>
    <p>Login page - Coming soon</p>
  </div>
);

const RegisterPage = () => (
  <div className="container">
    <h1>Register</h1>
    <p>Register page - Coming soon</p>
  </div>
);

const CheckoutPage = () => (
  <div className="container">
    <h1>Checkout</h1>
    <p>Checkout page - Coming soon</p>
  </div>
);

const OrdersPage = () => (
  <div className="container">
    <h1>My Orders</h1>
    <p>Orders page - Coming soon</p>
  </div>
);

function App() {
  const { initialize: initAuth } = useAuthStore();
  const { initialize: initCart } = useCartStore();

  useEffect(() => {
    initAuth();
    initCart();
  }, [initAuth, initCart]);

  return (
    <div className="app">
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
        <Route path={ROUTES.ORDERS} element={<OrdersPage />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </div>
  );
}

export default App;
