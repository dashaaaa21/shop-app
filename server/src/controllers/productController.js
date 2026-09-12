import { supabaseAdmin } from '../config/supabase.js';

/**
 * GET /api/products
 * Query params: gender, category, collection, is_featured, is_new_arrival,
 *               minPrice, maxPrice, search, sortBy, page, limit
 */
export const getAllProducts = async (req, res, next) => {
  try {
    const {
      gender, category, collection,
      is_featured, is_new_arrival,
      minPrice, maxPrice, search,
      sortBy = 'created_at', page = 1, limit = 100,
    } = req.query;

    let query = supabaseAdmin
      .from('products')
      .select('*', { count: 'exact' });

    if (gender)        query = query.eq('gender', gender);
    if (category)      query = query.ilike('category', category);
    if (collection)    query = query.eq('collection', collection);
    if (is_featured === 'true')    query = query.eq('is_featured', true);
    if (is_new_arrival === 'true') query = query.eq('is_new_arrival', true);
    if (minPrice)      query = query.gte('price', Number(minPrice));
    if (maxPrice)      query = query.lte('price', Number(maxPrice));
    if (search)        query = query.ilike('name', `%${search}%`);

    // Sorting
    const sortMap = {
      'price-asc':  { col: 'price',      asc: true },
      'price-desc': { col: 'price',      asc: false },
      'rating':     { col: 'rating',     asc: false },
      'name':       { col: 'name',       asc: true },
      'newest':     { col: 'created_at', asc: false },
    };
    const sort = sortMap[sortBy] ?? { col: 'created_at', asc: false };
    query = query.order(sort.col, { ascending: sort.asc });

    // Pagination
    const from = (Number(page) - 1) * Number(limit);
    query = query.range(from, from + Number(limit) - 1);

    const { data, error, count } = await query;
    if (error) return res.status(400).json({ message: error.message });

    res.json({
      products: data,
      total: count,
      page: Number(page),
      totalPages: Math.ceil((count ?? 0) / Number(limit)),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/products/:id
 * id can be uuid (Supabase id) or external_id (e.g. "w1", "m3")
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Try by uuid first, fall back to external_id
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const field = uuidRegex.test(id) ? 'id' : 'external_id';

    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq(field, id)
      .single();

    if (error || !data) return res.status(404).json({ message: 'Product not found' });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/products  (admin)
 */
export const createProduct = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(req.body)
      .select()
      .single();
    if (error) return res.status(400).json({ message: error.message });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/products/:id  (admin)
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .update({ ...req.body, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select()
      .single();
    if (error || !data) return res.status(404).json({ message: 'Product not found' });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/products/:id  (admin)
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', req.params.id);
    if (error) return res.status(400).json({ message: error.message });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};
