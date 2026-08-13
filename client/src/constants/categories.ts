export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports & Outdoors',
  'Toys & Games',
  'Health & Beauty',
  'Automotive',
  'Food & Beverage',
  'Office Supplies',
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];
