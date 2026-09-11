import { supabaseAdmin } from '../config/supabase.js';

/**
 * Middleware that verifies a Supabase JWT from the Authorization header.
 * On success, attaches req.user = { id, email, role, ...metadata }
 */
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized — no token provided' });
    }

    const token = authHeader.split(' ')[1];

    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ message: 'Not authorized — invalid or expired token' });
    }

    req.user = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.full_name ?? data.user.email,
      role: data.user.user_metadata?.role ?? 'user',
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

/**
 * Restrict to specific roles.
 * Usage: router.get('/admin', protect, restrictTo('admin'), handler)
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden — insufficient permissions' });
    }
    next();
  };
};
