import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { supabase } from '../lib/supabase';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import './AccountPage.css';

type Tab = 'profile' | 'orders' | 'security';

const API_URL = import.meta.env.CONFIG_API_URL ?? 'http://localhost:5001/api';

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  created_at: string;
  order_items: OrderItem[];
}

const STATUS_COLOR: Record<string, string> = {
  delivered: 'account-status--delivered',
  processing: 'account-status--processing',
  cancelled: 'account-status--cancelled',
  pending: 'account-status--processing',
  shipped: 'account-status--delivered',
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

// ── Profile Tab ────────────────────────────────────────────────
const ProfileTab = () => {
  const { user, session } = useAuthStore();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Load extended metadata from Supabase session
  useEffect(() => {
    if (session?.user?.user_metadata) {
      const meta = session.user.user_metadata;
      setPhone(meta.phone ?? '');
      setAddress(meta.address ?? '');
    }
  }, [session]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Name is required'); return; }
    setSaving(true); setError('');
    try {
      const { error: supaErr } = await supabase.auth.updateUser({
        data: { full_name: name, phone, address },
      });
      if (supaErr) throw supaErr;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="account-section">
      <h2 className="account-section__title">Personal Information</h2>
      <p className="account-section__sub">Update your name, phone and delivery address.</p>

      {error && <div className="account-alert account-alert--error">{error}</div>}
      {saved && <div className="account-alert account-alert--success">Changes saved successfully.</div>}

      <form className="account-form" onSubmit={handleSave}>
        <div className="account-form__row">
          <div className="account-field">
            <label className="account-field__label" htmlFor="acc-name">Full Name</label>
            <input
              id="acc-name"
              type="text"
              className="account-field__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="account-field">
            <label className="account-field__label" htmlFor="acc-email">Email</label>
            <input
              id="acc-email"
              type="email"
              className="account-field__input account-field__input--readonly"
              value={user?.email ?? ''}
              readOnly
              tabIndex={-1}
            />
            <p className="account-field__hint">Email cannot be changed here.</p>
          </div>
        </div>

        <div className="account-form__row">
          <div className="account-field">
            <label className="account-field__label" htmlFor="acc-phone">Phone</label>
            <input
              id="acc-phone"
              type="tel"
              className="account-field__input"
              placeholder="+1 234 567 8900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={saving}
            />
          </div>
        </div>

        <div className="account-field">
          <label className="account-field__label" htmlFor="acc-address">Delivery Address</label>
          <textarea
            id="acc-address"
            className="account-field__textarea"
            placeholder="Street, City, Country, ZIP"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            disabled={saving}
          />
        </div>

        <button type="submit" className="account-btn account-btn--primary" disabled={saving}>
          {saving ? <span className="account-spinner" /> : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

// ── Orders Tab ─────────────────────────────────────────────────
const OrdersTab = () => {
  const { session } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = session?.access_token;
        const res = await fetch(`${API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to load orders');
        const json = await res.json();
        setOrders(json.data ?? []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [session]);

  if (loading) {
    return (
      <div className="account-section">
        <h2 className="account-section__title">My Orders</h2>
        <div className="account-loading" style={{ minHeight: 200 }}>
          <span className="account-spinner account-spinner--lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="account-section">
      <h2 className="account-section__title">My Orders</h2>
      <p className="account-section__sub">Track and review your recent purchases.</p>

      {error && <div className="account-alert account-alert--error">{error}</div>}

      {orders.length === 0 && !error ? (
        <div className="account-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <p>No orders yet.</p>
        </div>
      ) : (
        <div className="account-orders">
          {orders.map((order) => (
            <div key={order.id} className="account-order">
              <div className="account-order__head">
                <div className="account-order__meta">
                  <span className="account-order__id">#{order.id.slice(0, 8).toUpperCase()}</span>
                  <span className="account-order__date">{formatDate(order.created_at)}</span>
                </div>
                <span className={`account-status ${STATUS_COLOR[order.status] ?? ''}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="account-order__items">
                {order.order_items.map((item) => (
                  <div key={item.id} className="account-order__item">
                    {item.product_image && (
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="account-order__item-img"
                      />
                    )}
                    <span className="account-order__item-name">{item.product_name}</span>
                    <span className="account-order__item-qty">× {item.quantity}</span>
                    <span className="account-order__item-price">€{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="account-order__foot">
                <span className="account-order__total">Total: €{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Security Tab ───────────────────────────────────────────────
const SecurityTab = () => {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!current) { setError('Enter your current password'); return; }
    if (newPass.length < 6) { setError('New password must be at least 6 characters'); return; }
    if (newPass !== confirm) { setError('Passwords do not match'); return; }

    setSaving(true);
    try {
      // Re-authenticate then update
      const { data: { user }, error: getErr } = await supabase.auth.getUser();
      if (getErr || !user?.email) throw new Error('Unable to fetch user');

      // Verify current password by signing in
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: current,
      });
      if (signInErr) throw new Error('Current password is incorrect');

      const { error: updateErr } = await supabase.auth.updateUser({ password: newPass });
      if (updateErr) throw updateErr;

      setSaved(true);
      setCurrent(''); setNewPass(''); setConfirm('');
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="account-section">
      <h2 className="account-section__title">Security</h2>
      <p className="account-section__sub">Change your password to keep your account secure.</p>

      {error && <div className="account-alert account-alert--error">{error}</div>}
      {saved && <div className="account-alert account-alert--success">Password changed successfully.</div>}

      <form className="account-form" onSubmit={handleChange}>
        <div className="account-field">
          <label className="account-field__label" htmlFor="sec-current">Current Password</label>
          <input
            id="sec-current"
            type="password"
            className="account-field__input"
            placeholder="••••••••"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            disabled={saving}
            autoComplete="current-password"
          />
        </div>
        <div className="account-form__row">
          <div className="account-field">
            <label className="account-field__label" htmlFor="sec-new">New Password</label>
            <input
              id="sec-new"
              type="password"
              className="account-field__input"
              placeholder="Min. 6 characters"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              disabled={saving}
              autoComplete="new-password"
            />
          </div>
          <div className="account-field">
            <label className="account-field__label" htmlFor="sec-confirm">Confirm New Password</label>
            <input
              id="sec-confirm"
              type="password"
              className="account-field__input"
              placeholder="Repeat new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={saving}
              autoComplete="new-password"
            />
          </div>
        </div>
        <button type="submit" className="account-btn account-btn--primary" disabled={saving}>
          {saving ? <span className="account-spinner" /> : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

// ── Main AccountPage ───────────────────────────────────────────
const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tab = (location.state as { tab?: Tab })?.tab;
    if (tab) setActiveTab(tab);
  }, [location.state]);

  useEffect(() => {
    document.title = 'My Account | VALORÉ';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { state: { from: '/account' } });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="account-page">
        <Header />
        <main className="account-main">
          <div className="account-loading">
            <span className="account-spinner account-spinner--lg" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'profile',
      label: 'Profile',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      key: 'orders',
      label: 'Orders',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
    },
    {
      key: 'security',
      label: 'Security',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="account-page">
      <Header />
      <main className="account-main">
        <div className="container">

          {/* Page header */}
          <div className="account-header">
            <div className="account-header__avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="account-avatar__img" />
              ) : (
                <span className="account-avatar__initials">
                  {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                </span>
              )}
            </div>
            <div className="account-header__info">
              <h1 className="account-header__name">{user?.name}</h1>
              <p className="account-header__email">{user?.email}</p>
            </div>
            <button className="account-btn account-btn--ghost" onClick={handleLogout}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign Out
            </button>
          </div>

          <div className="account-layout">
            {/* Sidebar nav */}
            <aside className="account-sidebar">
              <nav className="account-nav">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`account-nav__item ${activeTab === tab.key ? 'account-nav__item--active' : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="account-content">
              {activeTab === 'profile' && <ProfileTab />}
              {activeTab === 'orders' && <OrdersTab />}
              {activeTab === 'security' && <SecurityTab />}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
