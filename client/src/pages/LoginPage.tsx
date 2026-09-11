import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import './AuthPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const from = (location.state as { from?: string })?.from ?? '/';

  useEffect(() => {
    document.title = 'Sign In | VALORÉ';
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Minimum 6 characters';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      // error handled by store
    }
  };

  return (
    <div className="auth-page">
      <Header />
      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-card__header">
            <h1 className="auth-card__title">Welcome Back</h1>
            <p className="auth-card__subtitle">Sign in to your VALORÉ account</p>
          </div>

          {error && (
            <div className="auth-alert auth-alert--error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className={`auth-field ${fieldErrors.email ? 'auth-field--error' : ''}`}>
              <label className="auth-field__label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="auth-field__input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: undefined })); }}
                autoComplete="email"
                disabled={isLoading}
              />
              {fieldErrors.email && <p className="auth-field__error">{fieldErrors.email}</p>}
            </div>

            <div className={`auth-field ${fieldErrors.password ? 'auth-field--error' : ''}`}>
              <div className="auth-field__label-row">
                <label className="auth-field__label" htmlFor="password">Password</label>
                <button type="button" className="auth-field__forgot">Forgot password?</button>
              </div>
              <div className="auth-field__input-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-field__input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })); }}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="auth-field__eye"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {fieldErrors.password && <p className="auth-field__error">{fieldErrors.password}</p>}
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="auth-submit__spinner" aria-label="Loading" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/register" className="auth-switch__link">Create one</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
