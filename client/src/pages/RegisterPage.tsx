import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import './AuthPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading, error, clearError } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string; email?: string; password?: string; confirmPassword?: string;
  }>({});

  useEffect(() => {
    document.title = 'Create Account | VALORÉ';
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const validate = () => {
    const errors: typeof fieldErrors = {};
    if (!name.trim()) errors.name = 'Full name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Minimum 6 characters';
    if (!confirmPassword) errors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register(name, email, password);
      // If Supabase email confirmation is off → isAuthenticated becomes true → redirect
      // If confirmation is on → show success message
      setSuccess(true);
    } catch {
      // error handled by store
    }
  };

  if (success && !isAuthenticated) {
    return (
      <div className="auth-page">
        <Header />
        <main className="auth-main">
          <div className="auth-card">
            <div className="auth-success">
              <div className="auth-success__icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h2 className="auth-success__title">Check your email</h2>
              <p className="auth-success__text">
                We sent a confirmation link to <strong>{email}</strong>.
                Please verify your email to activate your account.
              </p>
              <Link to="/login" className="auth-submit" style={{ display: 'block', textAlign: 'center' }}>
                Go to Sign In
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="auth-page">
      <Header />
      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-card__header">
            <h1 className="auth-card__title">Create Account</h1>
            <p className="auth-card__subtitle">Join VALORÉ and discover exclusive collections</p>
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
            <div className={`auth-field ${fieldErrors.name ? 'auth-field--error' : ''}`}>
              <label className="auth-field__label" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                className="auth-field__input"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => { setName(e.target.value); setFieldErrors((p) => ({ ...p, name: undefined })); }}
                autoComplete="name"
                disabled={isLoading}
              />
              {fieldErrors.name && <p className="auth-field__error">{fieldErrors.name}</p>}
            </div>

            <div className={`auth-field ${fieldErrors.email ? 'auth-field--error' : ''}`}>
              <label className="auth-field__label" htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
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
              <label className="auth-field__label" htmlFor="reg-password">Password</label>
              <div className="auth-field__input-wrap">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-field__input"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })); }}
                  autoComplete="new-password"
                  disabled={isLoading}
                />
                <button type="button" className="auth-field__eye" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password">
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

            <div className={`auth-field ${fieldErrors.confirmPassword ? 'auth-field--error' : ''}`}>
              <label className="auth-field__label" htmlFor="confirm-password">Confirm Password</label>
              <div className="auth-field__input-wrap">
                <input
                  id="confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  className="auth-field__input"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setFieldErrors((p) => ({ ...p, confirmPassword: undefined })); }}
                  autoComplete="new-password"
                  disabled={isLoading}
                />
                <button type="button" className="auth-field__eye" onClick={() => setShowConfirm((v) => !v)} aria-label="Toggle confirm password">
                  {showConfirm ? (
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
              {fieldErrors.confirmPassword && <p className="auth-field__error">{fieldErrors.confirmPassword}</p>}
            </div>

            <p className="auth-terms">
              By creating an account you agree to our{' '}
              <a href="#" className="auth-terms__link">Terms of Service</a> and{' '}
              <a href="#" className="auth-terms__link">Privacy Policy</a>.
            </p>

            <button type="submit" className="auth-submit" disabled={isLoading}>
              {isLoading ? (
                <span className="auth-submit__spinner" aria-label="Loading" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login" className="auth-switch__link">Sign in</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
