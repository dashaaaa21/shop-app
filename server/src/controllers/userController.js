import { supabaseAdmin } from '../config/supabase.js';

/**
 * GET /api/users/profile
 * Returns the authenticated user's profile from Supabase metadata.
 */
export const getProfile = async (req, res, next) => {
  try {
    const { id, email, name, role } = req.user;

    res.json({
      id,
      email,
      name,
      role,
      createdAt: req.user.createdAt ?? null,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/users/profile
 * Body: { name, phone, address }
 * Updates user_metadata in Supabase Auth.
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, address } = req.body;

    const updates = {};
    if (name !== undefined) updates.full_name = name;
    if (phone !== undefined) updates.phone = phone;
    if (address !== undefined) updates.address = address;

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      req.user.id,
      { user_metadata: updates }
    );

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.json({
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.full_name ?? name,
      phone: data.user.user_metadata?.phone ?? phone,
      address: data.user.user_metadata?.address ?? address,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/users/password
 * Body: { password }
 * Updates the user's password via Supabase Admin.
 */
export const updatePassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const { error } = await supabaseAdmin.auth.admin.updateUserById(
      req.user.id,
      { password }
    );

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};
