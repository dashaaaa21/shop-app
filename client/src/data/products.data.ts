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
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop&q=85',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&h=1000&fit=crop&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1000&fit=crop&q=85',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop&q=85',
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
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop&q=85',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop&q=85',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&h=1000&fit=crop&q=85',
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
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=600&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=600&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=600&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=600&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=600&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=600&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=600&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=600&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=600&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600&h=600&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop&q=80',
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
  {
    id: 'm15',
    name: 'Double-Breasted Overcoat',
    price: 529,
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Outerwear',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'A commanding outerwear statement for the colder months. This double-breasted overcoat is crafted from a heavy-weight camel wool blend, featuring peak lapels, polished horn buttons, and a structured silhouette that elevates any outfit beneath it.',
    stock: 5,
    rating: 4.9,
    specifications: {
      Material: '85% Wool, 15% Camel Hair',
      Lining: '100% Viscose',
      Length: 'Below knee',
      Care: 'Dry clean only',
      Closure: 'Double-breasted, 6 buttons',
    },
  },
  {
    id: 'm16',
    name: 'Cotton Poplin Shirt',
    price: 109,
    images: [
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Shirts',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'A wardrobe staple reimagined in the finest cotton poplin. This slim-fit shirt features a spread collar, single-button cuffs, and a barely-there weight that keeps you comfortable all day. Immaculate on its own, effortless under a blazer.',
    stock: 24,
    rating: 4.5,
    specifications: {
      Material: '100% Poplin Cotton',
      Fit: 'Slim fit',
      Care: 'Machine wash 40°C',
      Collar: 'Spread',
      Cuffs: 'Single button',
    },
  },
  {
    id: 'm17',
    name: 'Waxed Cotton Jacket',
    price: 259,
    discountPrice: 219,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Jackets',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'Heritage craftsmanship for the modern outdoorsman. This waxed cotton jacket features a tartan wool lining, corduroy collar, and deep bellows pockets — purpose-built for unpredictable weather and decades of wear.',
    stock: 10,
    rating: 4.8,
    specifications: {
      Material: '100% Waxed Cotton',
      Lining: 'Tartan Wool',
      Collar: 'Corduroy',
      Care: 'Re-wax as needed, do not machine wash',
      Closure: 'Zip with storm flap',
    },
  },
  {
    id: 'm18',
    name: 'Pleated Wool Trousers',
    price: 199,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop&q=80',
    ],
    category: 'TROUSERS',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'A refined nod to classic tailoring. These pleated trousers are cut from a soft wool tweed and feature single forward pleats, side adjusters, and a generous leg that moves with natural ease. Pair with a fine knit or dress shirt for a polished ensemble.',
    stock: 8,
    rating: 4.7,
    specifications: {
      Material: '100% Wool Tweed',
      Rise: 'High',
      Leg: 'Relaxed tapered',
      Pleat: 'Single forward pleat',
      Care: 'Dry clean only',
    },
  },
  {
    id: 'm19',
    name: 'Half-Zip Merino Sweater',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=80',
    ],
    category: 'SWEATERS',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'A modern utility meets fine knitwear. This half-zip sweater is knitted from an extra-fine merino in a mid-gauge rib, offering versatile layering with a clean, sportif aesthetic. The contrast zip adds a subtle design detail.',
    stock: 13,
    rating: 4.6,
    specifications: {
      Material: '100% Extra-fine Merino Wool',
      Gauge: 'Mid (8 GG)',
      Fit: 'Regular',
      Care: 'Hand wash cold',
      Neckline: 'Half-zip',
    },
  },
  {
    id: 'm20',
    name: 'Italian Linen Suit',
    price: 649,
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Suits',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'The summer suit, elevated. Tailored in a premium Italian linen with a natural unstructured canvas, this two-piece suit drapes beautifully and breathes freely. Ideal for warm-weather events, destination weddings, or elevated resort wear.',
    stock: 6,
    rating: 4.8,
    specifications: {
      Material: '100% Italian Linen',
      Construction: 'Unstructured canvas',
      Fit: 'Slim fit',
      Care: 'Dry clean only',
      Origin: 'Made in Italy',
    },
  },
  {
    id: 'm21',
    name: 'Cable Knit Cardigan',
    price: 229,
    discountPrice: 189,
    images: [
      'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Knitwear',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'A heritage cable knit updated for the modern wardrobe. Knitted in a premium lambswool blend with a classic Aran-inspired stitch pattern, this open-front cardigan features genuine horn buttons and ribbed cuffs and hem. A piece that only improves with wear.',
    stock: 9,
    rating: 4.9,
    specifications: {
      Material: '80% Lambswool, 20% Nylon',
      Pattern: 'Cable knit',
      Fit: 'Relaxed',
      Care: 'Dry clean only',
      Closure: 'Horn buttons',
    },
  },
  {
    id: 'm22',
    name: 'Stretch Wool Suit Trousers',
    price: 179,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=600&fit=crop&q=80',
    ],
    category: 'TROUSERS',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'The comfort of stretch engineered into the elegance of a suit trouser. Cut from a performance wool blend with four-way stretch, they hold a sharp crease throughout the day while adapting to your every movement. Smart tailoring for a demanding schedule.',
    stock: 15,
    rating: 4.6,
    specifications: {
      Material: '95% Wool, 5% Elastane',
      Rise: 'Mid',
      Leg: 'Slim tapered',
      Care: 'Machine wash 30°C',
      Closure: 'Zip fly with hook bar',
    },
  },
  {
    id: 'm23',
    name: 'Shawl Collar Knit Jacket',
    price: 319,
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Jackets',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'Where knitwear meets outerwear. This shawl collar jacket is constructed from a thick bouclé wool in a relaxed, boxy silhouette. The clean patch pockets and tonal buttons keep the design restrained — an effortlessly sophisticated layer.',
    stock: 7,
    rating: 4.7,
    specifications: {
      Material: '75% Wool, 25% Polyamide',
      Collar: 'Shawl',
      Fit: 'Boxy',
      Care: 'Dry clean only',
      Pockets: 'Two patch pockets',
    },
  },
  {
    id: 'm24',
    name: 'Textured Linen Shirt',
    price: 119,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Shirts',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'A refined take on warm-weather dressing. This textured linen shirt is woven from a slubbed Italian linen that gives each piece a unique, artisanal character. The band collar and front tuck design make it as easy to wear open as buttoned.',
    stock: 21,
    rating: 4.5,
    specifications: {
      Material: '100% Italian Slubbed Linen',
      Fit: 'Regular',
      Care: 'Machine wash 30°C',
      Collar: 'Band collar',
      Origin: 'Made in Italy',
    },
  },
  {
    id: 'm25',
    name: 'Mohair Blend V-Neck Sweater',
    price: 209,
    images: [
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600&h=600&fit=crop&q=80',
    ],
    category: 'SWEATERS',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'A luxurious texture that catches the light. Knitted from a fine mohair-wool blend, this V-neck sweater has a subtle halo effect that adds depth and softness. The slim fit and clean finish make it ideal over a dress shirt or worn alone.',
    stock: 10,
    rating: 4.7,
    specifications: {
      Material: '70% Wool, 30% Kid Mohair',
      Fit: 'Slim',
      Care: 'Dry clean only',
      Neckline: 'V-neck',
      Gauge: 'Fine (12 GG)',
    },
  },
  {
    id: 'm26',
    name: 'Raw Denim Jeans',
    price: 229,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=600&fit=crop&q=80',
    ],
    category: 'TROUSERS',
    gender: 'men',
    isNewArrival: false,
    isFeatured: false,
    description:
      'Crafted to fade uniquely to you. These raw selvedge denim jeans are cut in a straight fit from a 14 oz Japanese denim — unwashed, unsanforised, ready to develop a personal fade pattern over years of wear. A true investment piece.',
    stock: 8,
    rating: 4.9,
    specifications: {
      Material: '100% Japanese Selvedge Denim (14 oz)',
      Fit: 'Straight',
      Wash: 'Raw / Unwashed',
      Care: 'Hand wash cold or spot clean',
      Closure: 'Zip fly',
    },
  },
  {
    id: 'm27',
    name: 'Suede Bomber Jacket',
    price: 389,
    images: [
      'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&h=600&fit=crop&q=80',
    ],
    category: 'Jackets',
    gender: 'men',
    isNewArrival: true,
    isFeatured: false,
    description:
      'A refined take on the iconic bomber silhouette. Crafted from a supple lambsuede with ribbed cuffs, collar, and hem, this jacket carries a luxurious weight and texture that only improves with wear. The clean unlined interior keeps it lightweight for layering.',
    stock: 6,
    rating: 4.8,
    specifications: {
      Material: '100% Lambsuede',
      Lining: 'Unlined',
      Fit: 'Regular',
      Care: 'Professional leather clean only',
      Closure: 'Front zip',
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

// ══════════════════════════════════════════════════════════════
// COLLECTIONS (Wedding / Party / Halloween)
// ══════════════════════════════════════════════════════════════

export type CollectionSlug = 'wedding-collection' | 'party-collection' | 'halloween-collection';

export interface CollectionProduct {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  collection: CollectionSlug;
  description: string;
  stock: number;
  rating: number;
  specifications: Record<string, string>;
}

export const collectionProducts: CollectionProduct[] = [
  // ── WEDDING COLLECTION ────────────────────────────────────────
  {
    id: 'wc1',
    name: 'Ivory Satin Bridal Gown',
    price: 1290,
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&q=90',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Dresses',
    collection: 'wedding-collection',
    description: 'A timeless bridal gown in lustrous ivory satin. The structured bodice and fluid skirt create an effortlessly elegant silhouette for your most important day.',
    stock: 4,
    rating: 5.0,
    specifications: { Material: '100% Silk Satin', Length: 'Floor-length', Fit: 'Structured bodice, A-line skirt', Care: 'Dry clean only', Origin: 'Made in France' },
  },
  {
    id: 'wc2',
    name: 'Lace Overlay Wedding Dress',
    price: 890,
    discountPrice: 749,
    images: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Dresses',
    collection: 'wedding-collection',
    description: 'Delicate French lace overlaid on a silk-chiffon base. Subtle floral embroidery at the bodice catches the light with every movement.',
    stock: 6,
    rating: 4.9,
    specifications: { Material: 'French Lace over Silk Chiffon', Length: 'Floor-length', Neckline: 'Sweetheart', Care: 'Dry clean only', Closure: 'Corset back' },
  },
  {
    id: 'wc3',
    name: 'Pearl Bridal Veil',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Accessories',
    collection: 'wedding-collection',
    description: 'A cathedral-length veil trimmed with hand-sewn freshwater pearls. The perfect finishing touch for a classic bridal look.',
    stock: 12,
    rating: 4.8,
    specifications: { Material: 'Silk Tulle', Length: 'Cathedral (300 cm)', Trim: 'Freshwater Pearl Edge', Care: 'Store in acid-free tissue' },
  },
  {
    id: 'wc4',
    name: 'Silk Bridal Slip Dress',
    price: 590,
    images: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Dresses',
    collection: 'wedding-collection',
    description: 'Minimalist bridal elegance — a bias-cut silk slip dress with a subtle cowl neckline and thin spaghetti straps. Perfect for intimate ceremonies.',
    stock: 8,
    rating: 4.7,
    specifications: { Material: '100% Charmeuse Silk', Length: 'Floor-length', Fit: 'Bias cut', Care: 'Dry clean only', Neckline: 'Cowl neck' },
  },
  {
    id: 'wc5',
    name: 'Embroidered Wedding Bolero',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1520012218364-3dbe622b7926?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Outerwear',
    collection: 'wedding-collection',
    description: 'A delicate bolero jacket with hand-embroidered floral motifs in ivory silk thread. Adds warmth and romance to any bridal look.',
    stock: 10,
    rating: 4.6,
    specifications: { Material: 'Silk Organza', Embroidery: 'Hand-done floral', Length: 'Cropped bolero', Care: 'Dry clean only' },
  },
  {
    id: 'wc6',
    name: 'Satin Bridal Heels',
    price: 245,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Shoes',
    collection: 'wedding-collection',
    description: 'Ivory satin block-heel pumps with a delicate ankle strap and subtle pointed toe — elegance you can dance in.',
    stock: 15,
    rating: 4.8,
    specifications: { Material: 'Satin Upper, Leather Sole', Heel: '6 cm block heel', Closure: 'Adjustable ankle strap', Care: 'Spot clean only' },
  },

  // ── PARTY COLLECTION ──────────────────────────────────────────
  {
    id: 'pc1',
    name: 'Velvet Midnight Gown',
    price: 599,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=1000&fit=crop&q=90',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Dresses',
    collection: 'party-collection',
    description: 'Make your entrance in this floor-length velvet gown in deep midnight blue. A plunging back and slim column silhouette ensure you are the most memorable person in the room.',
    stock: 5,
    rating: 4.9,
    specifications: { Material: '100% Stretch Velvet', Length: 'Floor-length', Neckline: 'V-neck', Back: 'Plunge back', Care: 'Dry clean only' },
  },
  {
    id: 'pc2',
    name: 'Sequin Mini Dress',
    price: 349,
    discountPrice: 299,
    images: [
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Dresses',
    collection: 'party-collection',
    description: 'All-over champagne sequins catch every light in the room. A stretch fit, off-shoulder neckline, and above-the-knee length keep it playful and effortlessly glamorous.',
    stock: 9,
    rating: 4.8,
    specifications: { Material: 'Sequin on Stretch Mesh', Length: 'Mini', Neckline: 'Off-shoulder', Care: 'Hand wash cold, do not wring' },
  },
  {
    id: 'pc3',
    name: 'Satin Slip Party Dress',
    price: 279,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Dresses',
    collection: 'party-collection',
    description: 'A sleek satin slip dress in cherry red — bias-cut for movement and featuring an adjustable lace-trimmed neckline. Understated and undeniably seductive.',
    stock: 11,
    rating: 4.7,
    specifications: { Material: 'Satin-weave Silk', Length: 'Midi', Neckline: 'Lace-trim V', Fit: 'Bias cut', Care: 'Dry clean only' },
  },
  {
    id: 'pc4',
    name: 'Feather Trim Blazer',
    price: 449,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Outerwear',
    collection: 'party-collection',
    description: 'A statement blazer with feather-trimmed cuffs and lapels. Wear over a slip dress or tailored trousers to turn any occasion into an event.',
    stock: 7,
    rating: 4.8,
    specifications: { Material: 'Wool-blend Shell, Feather Trim', Fit: 'Oversized', Care: 'Dry clean only', Pockets: 'Two welt pockets' },
  },
  {
    id: 'pc5',
    name: 'Crystal Embellished Clutch',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Accessories',
    collection: 'party-collection',
    description: 'A fully crystal-embellished minaudière with a detachable chain strap. The perfect finishing touch for a glamorous evening.',
    stock: 14,
    rating: 4.9,
    specifications: { Material: 'Brass Frame, Crystal Embellishment', Strap: 'Detachable gold chain', Closure: 'Magnetic clasp', Size: '20 × 12 × 5 cm' },
  },
  {
    id: 'pc6',
    name: 'Strappy High-Heel Sandals',
    price: 299,
    discountPrice: 249,
    images: [
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Shoes',
    collection: 'party-collection',
    description: 'Gold metallic strappy sandals with a sculptural stiletto heel. Designed to be seen — and danced in all night.',
    stock: 13,
    rating: 4.7,
    specifications: { Material: 'Metallic Leather', Heel: '10 cm stiletto', Closure: 'Ankle buckle', Care: 'Leather conditioner recommended' },
  },

  // ── HALLOWEEN COLLECTION ──────────────────────────────────────
  {
    id: 'hc1',
    name: 'Gothic Velvet Cape',
    price: 199,
    images: [
      'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Outerwear',
    collection: 'halloween-collection',
    description: 'A dramatic floor-length velvet cape in deep crimson, with a structured hood and satin lining. Theatrical, dark, unforgettable.',
    stock: 8,
    rating: 4.9,
    specifications: { Material: 'Crushed Velvet, Satin Lining', Length: 'Floor-length', Hood: 'Structured', Care: 'Dry clean only', Fastening: 'Satin ribbon tie' },
  },
  {
    id: 'hc2',
    name: 'Dark Corset Dress',
    price: 279,
    discountPrice: 229,
    images: [
      'https://images.unsplash.com/photo-1635274605638-d44babc08a4f?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Dresses',
    collection: 'halloween-collection',
    description: 'A structured corset dress in matte black with lace-up back detailing and a full tulle skirt. Perfectly walks the line between costume and couture.',
    stock: 10,
    rating: 4.8,
    specifications: { Material: 'Cotton Brocade, Tulle Skirt', Length: 'Midi', Bodice: 'Boned corset', Care: 'Dry clean only', Closure: 'Lace-up back' },
  },
  {
    id: 'hc3',
    name: 'Witches Wide-Brim Hat',
    price: 89,
    images: [
      'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Accessories',
    collection: 'halloween-collection',
    description: 'An oversized wide-brim hat in stiffened black felt, trimmed with a velvet ribbon and antique gold buckle. The defining piece of any Halloween look.',
    stock: 20,
    rating: 4.7,
    specifications: { Material: 'Stiffened Wool Felt', Trim: 'Velvet Ribbon, Antique Gold Buckle', Brim: '18 cm wide', Care: 'Spot clean only' },
  },
  {
    id: 'hc4',
    name: 'Lace Gloves',
    price: 59,
    images: [
      'https://images.unsplash.com/photo-1571908598228-8d9c22f9f6c0?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Accessories',
    collection: 'halloween-collection',
    description: 'Elbow-length black lace gloves with a scalloped edge. Add an air of mystery to any gothic or Halloween ensemble.',
    stock: 25,
    rating: 4.6,
    specifications: { Material: '100% Cotton Lace', Length: 'Elbow', Edge: 'Scalloped', Care: 'Hand wash cold' },
  },
  {
    id: 'hc5',
    name: 'Platform Gothic Boots',
    price: 349,
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Shoes',
    collection: 'halloween-collection',
    description: 'Chunky platform boots in matte black leather with silver hardware and a side zip. Bold enough for Halloween, wearable all autumn long.',
    stock: 9,
    rating: 4.9,
    specifications: { Material: 'Matte Leather', Platform: '4 cm', Heel: '8 cm block', Closure: 'Side zip', Care: 'Leather conditioner recommended' },
  },
  {
    id: 'hc6',
    name: 'Spider Web Mesh Top',
    price: 99,
    discountPrice: 79,
    images: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&h=1000&fit=crop&q=90',
    ],
    category: 'Tops',
    collection: 'halloween-collection',
    description: 'An open spider-web mesh top in matte black. Layer over a bodysuit or slip for an effortlessly dark look that works from October and beyond.',
    stock: 18,
    rating: 4.5,
    specifications: { Material: '100% Nylon Mesh', Fit: 'Oversized', Neckline: 'Crew neck', Care: 'Hand wash cold', Pattern: 'Spider web' },
  },
];

// ── Collection Helpers ─────────────────────────────────────────

export const getCollectionProducts = (slug: CollectionSlug) =>
  collectionProducts.filter((p) => p.collection === slug);

export const getCollectionProductById = (id: string) =>
  collectionProducts.find((p) => p.id === id) ?? null;
