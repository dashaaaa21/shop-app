export interface WomenProduct {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: 'Dresses' | 'TROUSERS' | 'SWEATERS' | 'Evening Wear' | 'Outerwear' | 'Blouses' | 'Knitwear' | 'Jackets';
  gender: 'women';
  isNewArrival: boolean;
  isFeatured: boolean;
  description: string;
  stock: number;
  rating: number;
  specifications: Record<string, string>;
}

export const womenProducts: WomenProduct[] = [
  // ── FEATURED ──────────────────────────────────────────────────
  {
    id: 'w1',
    name: 'Elegant Silk Blouse',
    price: 189,
    discountPrice: 149,
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Blouses',
    gender: 'women',
    isNewArrival: false,
    isFeatured: true,
    description:
      'A timeless silk blouse crafted from the finest 100% pure silk. The fluid drape and lustrous finish make it perfect for both day-to-night dressing. Features mother-of-pearl buttons and a relaxed, elegant cut that flatters every silhouette.',
    stock: 12,
    rating: 4.8,
    specifications: {
      Material: '100% Pure Silk',
      Fit: 'Relaxed',
      Care: 'Dry clean only',
      Origin: 'Made in Italy',
      Closure: 'Mother-of-pearl buttons',
    },
  },
  {
    id: 'w2',
    name: 'Luxe Cashmere Cardigan',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Knitwear',
    gender: 'women',
    isNewArrival: false,
    isFeatured: true,
    description:
      'Indulge in pure luxury with this fine-gauge cashmere cardigan. Sourced from the finest Mongolian cashmere, it offers unmatched softness and warmth. The classic open-front design pairs effortlessly with everything in your wardrobe.',
    stock: 8,
    rating: 4.9,
    specifications: {
      Material: '100% Grade-A Cashmere',
      Gauge: 'Fine (12 GG)',
      Care: 'Hand wash cold',
      Origin: 'Made in Scotland',
      Closure: 'Open front',
    },
  },
  {
    id: 'w3',
    name: 'Designer Midi Dress',
    price: 259,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Dresses',
    gender: 'women',
    isNewArrival: false,
    isFeatured: true,
    description:
      'A sophisticated midi dress that transitions effortlessly from boardroom to dinner. Cut from a premium crepe fabric with a subtle sheen, it features a flattering A-line silhouette and a delicate side slit for ease of movement.',
    stock: 10,
    rating: 4.7,
    specifications: {
      Material: '72% Viscose, 28% Polyester',
      Length: 'Midi (below knee)',
      Fit: 'A-line',
      Care: 'Machine wash 30°C',
      Closure: 'Concealed back zip',
    },
  },
  {
    id: 'w4',
    name: 'Tailored Wool Coat',
    price: 399,
    discountPrice: 319,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Outerwear',
    gender: 'women',
    isNewArrival: false,
    isFeatured: true,
    description:
      'A structured wool coat that redefines outerwear elegance. Tailored in a premium Italian wool-cashmere blend, it features clean lapels, a single-button closure, and a perfectly balanced silhouette that works with any outfit.',
    stock: 6,
    rating: 4.9,
    specifications: {
      Material: '80% Wool, 20% Cashmere',
      Lining: '100% Viscose',
      Length: 'Below hip',
      Care: 'Dry clean only',
      Origin: 'Made in Italy',
    },
  },

  // ── NEW ARRIVALS ───────────────────────────────────────────────
  {
    id: 'w5',
    name: 'Vintage Inspired Jacket',
    price: 179,
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Jackets',
    gender: 'women',
    isNewArrival: true,
    isFeatured: false,
    description:
      'This vintage-inspired jacket channels the effortless cool of decades past. Crafted from a premium cotton-linen blend, it features a relaxed fit, tortoiseshell buttons, and subtle flap pockets. A wardrobe staple that only gets better with time.',
    stock: 14,
    rating: 4.6,
    specifications: {
      Material: '60% Cotton, 40% Linen',
      Fit: 'Relaxed',
      Care: 'Machine wash 30°C',
      Closure: 'Button front',
      Pockets: 'Two flap pockets',
    },
  },
  {
    id: 'w6',
    name: 'Sophisticated Trousers',
    price: 129,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop&q=80',
    ],
    category: 'TROUSERS',
    gender: 'women',
    isNewArrival: true,
    isFeatured: false,
    description:
      'Elevated tailoring meets everyday comfort in these sophisticated trousers. Cut from a premium stretch-wool blend, they feature a high-rise waist, wide-leg silhouette, and pressed creases for a polished finish that lasts all day.',
    stock: 18,
    rating: 4.7,
    specifications: {
      Material: '95% Wool, 5% Elastane',
      Rise: 'High',
      Leg: 'Wide leg',
      Care: 'Dry clean recommended',
      Closure: 'Hook and zip fly',
    },
  },
  {
    id: 'w7',
    name: 'Ethereal Evening Gown',
    price: 459,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Evening Wear',
    gender: 'women',
    isNewArrival: true,
    isFeatured: false,
    description:
      'Make an unforgettable entrance in this ethereal evening gown. Crafted from layers of the finest chiffon silk, it flows with every step. The draped neckline and open back add a touch of sensuality, while the floor-length silhouette ensures timeless elegance.',
    stock: 4,
    rating: 5.0,
    specifications: {
      Material: '100% Silk Chiffon',
      Length: 'Floor-length',
      Neckline: 'Draped V-neck',
      Care: 'Dry clean only',
      Closure: 'Concealed back zip',
    },
  },
  {
    id: 'w8',
    name: 'Minimalist Sweater',
    price: 149,
    discountPrice: 129,
    images: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop&q=80',
    ],
    category: 'SWEATERS',
    gender: 'women',
    isNewArrival: true,
    isFeatured: false,
    description:
      'Less is more with this beautifully minimalist sweater. Knitted in a fine merino wool blend, it features a clean crewneck silhouette, dropped shoulders, and a slightly oversized fit that feels as good as it looks. Available in a curated palette of timeless neutrals.',
    stock: 20,
    rating: 4.8,
    specifications: {
      Material: '85% Merino Wool, 15% Nylon',
      Gauge: 'Fine (10 GG)',
      Fit: 'Slightly oversized',
      Care: 'Hand wash cold',
      Neckline: 'Crew neck',
    },
  },
  {
    id: 'w9',
    name: 'Satin Wrap Dress',
    price: 219,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Dresses',
    gender: 'women',
    isNewArrival: true,
    isFeatured: false,
    description:
      'The wrap dress, reinvented in luxurious satin. This piece features a deep V-neckline, adjustable wrap tie, and a fluid midi-length skirt that moves beautifully. Equally at home at a garden party or an evening event.',
    stock: 9,
    rating: 4.6,
    specifications: {
      Material: '100% Satin-weave Polyester',
      Length: 'Midi',
      Neckline: 'Deep V-neck',
      Care: 'Hand wash or dry clean',
      Closure: 'Wrap tie',
    },
  },
  {
    id: 'w10',
    name: 'Ribbed Knit Sweater',
    price: 139,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=80',
    ],
    category: 'SWEATERS',
    gender: 'women',
    isNewArrival: true,
    isFeatured: false,
    description:
      'A wardrobe essential elevated by exceptional craftsmanship. This ribbed knit sweater is made from a premium lambswool blend, offering a fitted silhouette that flatters naturally. The fine rib texture adds depth and visual interest.',
    stock: 15,
    rating: 4.5,
    specifications: {
      Material: '90% Lambswool, 10% Nylon',
      Texture: 'Fine rib',
      Fit: 'Fitted',
      Care: 'Hand wash cold',
      Neckline: 'Round neck',
    },
  },
  {
    id: 'w11',
    name: 'Wide Leg Trousers',
    price: 159,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop&q=80',
    ],
    category: 'TROUSERS',
    gender: 'women',
    isNewArrival: true,
    isFeatured: false,
    description:
      'Wide-leg trousers that combine comfort with sophistication. Crafted from a flowing viscose blend, they feature a mid-rise waist, side pockets, and a clean front with no pleats. Pair with a tucked-in blouse or fitted knit for a balanced silhouette.',
    stock: 11,
    rating: 4.6,
    specifications: {
      Material: '100% Viscose',
      Rise: 'Mid',
      Leg: 'Wide leg',
      Care: 'Machine wash 30°C',
      Closure: 'Side zip',
    },
  },
  {
    id: 'w12',
    name: 'Classic White Blouse',
    price: 89,
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Blouses',
    gender: 'women',
    isNewArrival: true,
    isFeatured: false,
    description:
      'The perfect white blouse — a cornerstone of any wardrobe. Cut from a premium poplin cotton, it features a classic collar, straight hem, and a relaxed fit that works tucked or untucked. Crisp, clean, and eternally elegant.',
    stock: 25,
    rating: 4.4,
    specifications: {
      Material: '100% Cotton Poplin',
      Fit: 'Relaxed',
      Care: 'Machine wash 40°C',
      Closure: 'Button front',
      Collar: 'Classic point collar',
    },
  },
  {
    id: 'w13',
    name: 'Floral Midi Dress',
    price: 199,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Dresses',
    gender: 'women',
    isNewArrival: false,
    isFeatured: false,
    description:
      'A romantic floral midi dress that captures the essence of effortless femininity. Made from a lightweight georgette fabric, it features delicate floral print, puff sleeves, and a tiered skirt that creates beautiful movement.',
    stock: 7,
    rating: 4.5,
    specifications: {
      Material: '100% Georgette',
      Print: 'Floral',
      Length: 'Midi',
      Care: 'Hand wash cold',
      Sleeves: 'Puff sleeves',
    },
  },
  {
    id: 'w14',
    name: 'Cozy Wool Sweater',
    price: 179,
    discountPrice: 149,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop&q=80',
    ],
    category: 'SWEATERS',
    gender: 'women',
    isNewArrival: false,
    isFeatured: false,
    description:
      'Wrap yourself in warmth with this chunky wool sweater. Knitted in a generous oversized fit from a premium pure wool, it features a cosy turtleneck, drop shoulders, and a relaxed body — everything you need for cold-weather dressing.',
    stock: 13,
    rating: 4.7,
    specifications: {
      Material: '100% Pure Wool',
      Gauge: 'Chunky',
      Fit: 'Oversized',
      Care: 'Dry clean only',
      Neckline: 'Turtleneck',
    },
  },
];

// ── Helpers ────────────────────────────────────────────────────

export const getFeaturedProducts = () =>
  womenProducts.filter((p) => p.isFeatured);

export const getNewArrivals = () =>
  womenProducts.filter((p) => p.isNewArrival);

export const getProductsByCategory = (categoryFilter: string) =>
  womenProducts.filter(
    (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
  );

export const getProductById = (id: string) =>
  womenProducts.find((p) => p.id === id) ?? null;
