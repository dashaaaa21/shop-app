import { supabase, supabaseAdmin } from '../config/supabase.js';

/**
 * POST /api/auth/register
 * Body: { email, password, firstName, lastName }
 * Delegates registration to Supabase Auth.
 */
export const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const fullName = [firstName, lastName].filter(Boolean).join(' ') || email.split('@')[0];

    // Use admin API to create user and auto-confirm without sending email
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm without sending email
      user_metadata: { full_name: fullName },
    });

    if (error) {
      const status = error.status || 400;
      return res.status(status).json({ message: error.message });
    }

    if (!data.user) {
      return res.status(400).json({ message: 'Registration failed' });
    }

    // Auto-login the user after registration
    const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return res.status(400).json({ message: 'Registration successful but auto-login failed' });
    }

    res.status(201).json({
      message: 'Registration successful! You are now logged in.',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name,
        emailConfirmed: true,
      },
      token: sessionData?.session?.access_token || null,
      refreshToken: sessionData?.session?.refresh_token || null,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    res.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name ?? email.split('@')[0],
        role: data.user.user_metadata?.role ?? 'user',
      },
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/logout
 * Requires Authorization: Bearer <access_token>
 */
export const logout = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      // Set the session before signing out
      await supabaseAdmin.auth.admin.signOut(token).catch(() => null);
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Requires protect middleware
 */
export const getMe = async (req, res, next) => {
  try {
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/refresh
 * Refresh JWT token for currently authenticated user
 * Requires Authorization header with valid (but possibly expired) token
 */
export const refreshToken = async (req, res, next) => {
  try {
    // If we reached here, the token passed protect middleware validation
    // This means token is still valid or can be refreshed
    
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Generate a new JWT token using Supabase
    // For now, return the user info - client should handle re-login if needed
    const { data: { session }, error } = await supabase.auth.refreshSession(
      { refresh_token: req.body.refreshToken }
    );

    if (error || !session) {
      return res.status(401).json({ message: 'Failed to refresh token - please login again' });
    }

    res.json({
      token: session.access_token,
      refreshToken: session.refresh_token,
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
