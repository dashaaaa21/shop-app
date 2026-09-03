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

// ══════════════════════════════════════════════════════════════
// MEN
// ══════════════════════════════════════════════════════════════

export interface MenProduct {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: 'Suits' | 'TROUSERS' | 'SWEATERS' | 'Outerwear' | 'Shirts' | 'Jackets' | 'Knitwear' | 'Accessories';
  gender: 'men';
  isNewArrival: boolean;
  isFeatured: boolean;
  description: string;
  stock: number;
  rating: number;
  specifications: Record<string, string>;
}

export const menProducts: MenProduct[] = [
  // ── FEATURED ──────────────────────────────────────────────────
  {
    id: 'm1',
    name: 'Tailored Wool Suit',
    price: 599,
    discountPrice: 499,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Suits',
    gender: 'men',
    isNewArrival: false,
    isFeatured: true,
    description:
      'A masterpiece of modern tailoring. This two-piece suit is crafted from a Super 120s wool, offering an exceptionally smooth hand feel and natural drape. The slim-fit silhouette is cut to flatter without restricting movement — ideal for both boardroom and formal occasions.',
    stock: 8,
    rating: 4.9,
    specifications: {
      Material: '100% Super 120s Wool',
      Lining: '100% Viscose',
      Fit: 'Slim fit',
      Care: 'Dry clean only',
      Origin: 'Made in Italy',
    },
  },
  {
    id: 'm2',
    name: 'Premium Oxford Shirt',
    price: 129,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Shirts',
    gender: 'men',
    isNewArrival: false,
    isFeatured: true,
    description:
      'The cornerstone of any well-dressed gentleman\'s wardrobe. Woven from a two-ply Oxford cotton, this shirt offers a subtle texture and exceptional durability. The classic fit allows for comfortable layering under a blazer or wearing alone.',
    stock: 22,
    rating: 4.7,
    specifications: {
      Material: '100% Two-ply Oxford Cotton',
      Fit: 'Classic fit',
      Care: 'Machine wash 40°C',
      Collar: 'Button-down',
      Origin: 'Made in Portugal',
    },
  },
  {
    id: 'm3',
    name: 'Merino Wool Overcoat',
    price: 449,
    discountPrice: 369,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Outerwear',
    gender: 'men',
    isNewArrival: false,
    isFeatured: true,
    description:
      'A defining outerwear piece for the modern gentleman. Cut from a luxurious merino wool blend, this overcoat features a clean single-breasted front, structured shoulders, and a slightly longer length that commands attention. Timeless in every season.',
    stock: 6,
    rating: 4.9,
    specifications: {
      Material: '90% Merino Wool, 10% Cashmere',
      Lining: '100% Silk',
      Length: 'Below knee',
      Care: 'Dry clean only',
      Closure: 'Single-breasted, 3 buttons',
    },
  },
  {
    id: 'm4',
    name: 'Cashmere Crewneck Sweater',
    price: 279,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=80',
    ],
    category: 'SWEATERS',
    gender: 'men',
    isNewArrival: false,
    isFeatured: true,
    description:
      'Pure indulgence in knitwear form. This crewneck sweater is knitted from Grade-A Mongolian cashmere in a fine gauge that drapes beautifully. Understated and versatile, it elevates any outfit from casual to refined effortlessly.',
    stock: 10,
    rating: 4.8,
    specifications: {
      Material: '100% Grade-A Cashmere',
      Gauge: 'Fine (12 GG)',
      Fit: 'Regular',
      Care: 'Hand wash cold',
      Neckline: 'Crew neck',
    },
  },

  // ── NEW ARRIVALS ───────────────────────────────────────────────
  {
    id: 'm5',
    name: 'Slim Fit Chinos',
    price: 119,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop&q=80',
    ],
    category: 'TROUSERS',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'The perfect balance of smart and casual. These slim-fit chinos are cut from a premium stretch-cotton twill, offering a clean silhouette and all-day comfort. An essential piece that pairs seamlessly with shirts, sweaters, or casual jackets.',
    stock: 20,
    rating: 4.6,
    specifications: {
      Material: '97% Cotton, 3% Elastane',
      Rise: 'Mid',
      Leg: 'Slim',
      Care: 'Machine wash 30°C',
      Closure: 'Zip fly with button',
    },
  },
  {
    id: 'm6',
    name: 'Linen Summer Shirt',
    price: 99,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Shirts',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'Effortlessly cool for warmer days. This relaxed linen shirt is crafted from a premium Belgian linen that softens beautifully with each wash. The slightly oversized cut and subtle texture make it ideal for warm-weather dressing, on or off duty.',
    stock: 18,
    rating: 4.5,
    specifications: {
      Material: '100% Belgian Linen',
      Fit: 'Relaxed',
      Care: 'Machine wash 40°C',
      Collar: 'Camp collar',
      Origin: 'Made in Portugal',
    },
  },
  {
    id: 'm7',
    name: 'Technical Field Jacket',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Jackets',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'Where function meets refined style. This field jacket is constructed from a water-resistant technical fabric and features multiple utility pockets, adjustable cuffs, and a concealed hood. Designed for the man who moves between city streets and open landscapes.',
    stock: 12,
    rating: 4.7,
    specifications: {
      Material: 'Water-resistant Nylon Shell',
      Lining: 'Polyester',
      Pockets: '6 pockets',
      Care: 'Machine wash 30°C',
      Hood: 'Concealed',
    },
  },
  {
    id: 'm8',
    name: 'Ribbed Merino Sweater',
    price: 159,
    discountPrice: 129,
    images: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop&q=80',
    ],
    category: 'SWEATERS',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'A modern essential with a fine ribbed texture that adds subtle dimension. Knitted in extra-fine merino wool, this sweater offers exceptional softness and natural temperature regulation. The slightly tapered fit makes it ideal for layering.',
    stock: 16,
    rating: 4.8,
    specifications: {
      Material: '100% Extra-fine Merino Wool',
      Texture: 'Fine rib',
      Fit: 'Tapered',
      Care: 'Hand wash cold',
      Neckline: 'Round neck',
    },
  },
  {
    id: 'm9',
    name: 'Wool Flannel Trousers',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop&q=80',
    ],
    category: 'TROUSERS',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'Refined trousers cut from a brushed wool flannel with a soft, matte finish. The slightly tapered leg and high-rise waist create a timeless silhouette that works equally well with a blazer or a fine knit sweater.',
    stock: 9,
    rating: 4.6,
    specifications: {
      Material: '100% Wool Flannel',
      Rise: 'High',
      Leg: 'Tapered',
      Care: 'Dry clean recommended',
      Closure: 'Zip fly with hook',
    },
  },
  {
    id: 'm10',
    name: 'Classic Denim Jacket',
    price: 199,
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Jackets',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'The denim jacket, perfected. Cut from a premium selvedge denim with a mid-weight feel, it features a classic trucker silhouette, contrast stitching, and a slightly faded wash that only improves with age. A true wardrobe classic.',
    stock: 14,
    rating: 4.5,
    specifications: {
      Material: '100% Selvedge Denim',
      Weight: '12 oz',
      Fit: 'Classic',
      Care: 'Machine wash cold, inside out',
      Closure: 'Button front',
    },
  },
  {
    id: 'm11',
    name: 'Turtleneck Wool Sweater',
    price: 169,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop&q=80',
    ],
    category: 'SWEATERS',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'A sculptural, sophisticated silhouette for colder months. This turtleneck sweater is knitted in a chunky gauge pure wool, offering maximum warmth with minimal bulk. The clean lines and relaxed fit make it a versatile hero piece.',
    stock: 11,
    rating: 4.7,
    specifications: {
      Material: '100% Pure Wool',
      Gauge: 'Chunky',
      Fit: 'Relaxed',
      Care: 'Dry clean only',
      Neckline: 'Roll neck',
    },
  },
  {
    id: 'm12',
    name: 'Tailored Dress Shirt',
    price: 149,
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Shirts',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'Precision tailoring in every stitch. Cut from a fine two-ply poplin cotton, this dress shirt features a slim fit, cutaway collar, and French placket for a clean, modern finish. Equally suited to formal events or an elevated everyday look.',
    stock: 19,
    rating: 4.6,
    specifications: {
      Material: '100% Two-ply Poplin Cotton',
      Fit: 'Slim fit',
      Care: 'Machine wash 40°C',
      Collar: 'Cutaway',
      Cuffs: 'Single button',
    },
  },

  // ── CATEGORY EXTRAS ───────────────────────────────────────────
  {
    id: 'm13',
    name: 'Straight Leg Chinos',
    price: 109,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop&q=80',
    ],
    category: 'TROUSERS',
    gender: 'men',
    isNewArrival: false,
    isFeatured: false,
    description:
      'A relaxed take on the classic chino. Cut in a straight leg from a garment-dyed cotton twill, these trousers offer a lived-in feel from the very first wear. Versatile enough for weekends or casual Fridays.',
    stock: 17,
    rating: 4.4,
    specifications: {
      Material: '100% Cotton Twill',
      Rise: 'Mid',
      Leg: 'Straight',
      Care: 'Machine wash 30°C',
      Closure: 'Zip fly with button',
    },
  },
  {
    id: 'm14',
    name: 'Wool Blazer',
    price: 349,
    discountPrice: 299,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Suits',
    gender: 'men',
    isNewArrival: false,
    isFeatured: false,
    description:
      'A standalone blazer that carries the precision of a suit jacket with the versatility of a casual piece. Cut from a mid-weight wool in a classic herringbone weave, it pairs as naturally with tailored trousers as it does with dark denim.',
    stock: 7,
    rating: 4.8,
    specifications: {
      Material: '100% Wool (Herringbone)',
      Lining: '100% Viscose',
      Fit: 'Slim fit',
      Care: 'Dry clean only',
      Pockets: 'Chest welt, two flap',
    },
  },
];

// ── Men Helpers ────────────────────────────────────────────────

export const getMenFeaturedProducts = () =>
  menProducts.filter((p) => p.isFeatured);

export const getMenNewArrivals = () =>
  menProducts.filter((p) => p.isNewArrival);

export const getMenProductsByCategory = (categoryFilter: string) =>
  menProducts.filter(
    (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
  );

export const getMenProductById = (id: string) =>
  menProducts.find((p) => p.id === id) ?? null;
