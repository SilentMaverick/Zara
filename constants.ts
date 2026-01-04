
import { Product } from './types';

export const CATEGORIES = ['Women', 'Men', 'Kids', 'Home', 'Beauty'];

export const CATEGORY_MAP: Record<string, string[]> = {
  'Women': ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Bags', 'Jewelry'],
  'Men': ['Shirts', 'T-Shirts', 'Blazers', 'Trousers', 'Jeans', 'Jackets', 'Shoes', 'Accessories'],
  'Kids': ['Boys', 'Girls', 'Baby', 'Shoes', 'Accessories'],
  'Home': ['Living Room', 'Bedroom', 'Kitchen', 'Fragrances'],
  'Beauty': ['Perfumes', 'Makeup', 'Skincare']
};

export const SUB_CATEGORIES = Array.from(new Set(Object.values(CATEGORY_MAP).flat()));

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', 'One Size'];
export const COLORS = ['Black', 'White', 'Beige', 'Blue', 'Red', 'Green', 'Gold', 'Silver', 'Neutral', 'Brown', 'Navy'];

export const MOCK_PRODUCTS: Product[] = [
  // WOMEN
  {
    id: 'w1',
    name: 'SATIN EFFECT MIDI DRESS',
    category: 'Women',
    subCategory: 'Dresses',
    price: 3990,
    originalPrice: 5990,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1539109132382-381bb3f1cff6?w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Gold'],
    description: 'Midi dress made of satin finish fabric. V-neck and thin straps. Hidden in-seam zip closure.',
    isSale: true
  },
  {
    id: 'w2',
    name: 'OVERSIZED POPLIN SHIRT',
    category: 'Women',
    subCategory: 'Tops',
    price: 2590,
    originalPrice: 2590,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue'],
    description: 'Collared shirt with long sleeves and cuffs. Patch pocket on the chest. Front button fastening.',
    isNew: true
  },
  {
    id: 'w3',
    name: 'SOFT LEATHER CITY BAG',
    category: 'Women',
    subCategory: 'Bags',
    price: 8990,
    originalPrice: 12990,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1584917033904-493bb3c37d0c?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80'
    ],
    sizes: ['One Size'],
    colors: ['Black', 'Beige'],
    description: 'Leather tote bag. Soft construction. Tubular shoulder straps. Lined interior with pocket.',
    isSale: true
  },
  {
    id: 'w4',
    name: 'BELTED WOOL COAT',
    category: 'Women',
    subCategory: 'Outerwear',
    price: 11990,
    originalPrice: 11990,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Black'],
    description: 'Coat made of a wool blend. Lapel collar and long sleeves. Matching belt. Front welt pockets.',
    isNew: true
  },

  // MEN (Updated high-quality images with professional models)
  {
    id: 'm1',
    name: 'TEXTURED SLIM FIT BLAZER',
    category: 'Men',
    subCategory: 'Blazers',
    price: 7990,
    originalPrice: 11990,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'
    ],
    sizes: ['48', '50', '52', '54'],
    colors: ['Blue', 'Grey'],
    description: 'Slim fit blazer with notch lapels and long sleeves. Chest welt pocket and flap pockets at the hip.',
    isSale: true
  },
  {
    id: 'm2',
    name: 'RELAXED FIT JEANS',
    category: 'Men',
    subCategory: 'Jeans',
    price: 3590,
    originalPrice: 3590,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
      'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue'],
    description: 'Five-pocket jeans with a relaxed fit. Faded effect. Front zip fly and button fastening.',
    isNew: true
  },
  {
    id: 'm3',
    name: 'PREMIUM LINEN SHIRT',
    category: 'Men',
    subCategory: 'Shirts',
    price: 2990,
    originalPrice: 3990,
    discount: 25,
    images: [
      'https://images.unsplash.com/photo-1593030103066-01bb30e20345?w=800&q=80',
      'https://images.unsplash.com/photo-1593032130154-4fbb0c23b0ed?w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Beige', 'Green'],
    description: 'Regular fit shirt made of 100% linen. Button-down collar and long sleeves with buttoned cuffs.',
    isSale: true
  },
  {
    id: 'm4',
    name: 'CHUNKY LEATHER LOAFERS',
    category: 'Men',
    subCategory: 'Shoes',
    price: 5990,
    originalPrice: 5990,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
      'https://images.unsplash.com/photo-1625910513397-03487050965e?w=800&q=80'
    ],
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['Black'],
    description: 'Leather loafers with topstitching detail on the upper. Chunky track sole.',
    isNew: true
  },
  {
    id: 'm5',
    name: 'DOUBLE-BREASTED OVERCOAT',
    category: 'Men',
    subCategory: 'Jackets',
    price: 12990,
    originalPrice: 15990,
    discount: 18,
    images: [
      'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800&q=80',
      'https://images.unsplash.com/photo-1516257984877-2c3a80ecf097?w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Camel'],
    description: 'Long coat with peak lapels and long sleeves. Front double-breasted button fastening.',
    isSale: true
  },
  {
    id: 'm6',
    name: 'KNIT POLO SHIRT',
    category: 'Men',
    subCategory: 'T-Shirts',
    price: 2290,
    originalPrice: 2290,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80',
      'https://images.unsplash.com/photo-1611312449412-6ce3a5cd9dbf?w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Beige'],
    description: 'Short sleeve polo shirt with a lapel collar and buttonless V-neck. Ribbed trims.',
    isNew: true
  },

  // KIDS
  {
    id: 'k1',
    name: 'FLORAL PRINT COTTON DRESS',
    category: 'Kids',
    subCategory: 'Girls',
    price: 1590,
    originalPrice: 2290,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80',
      'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&q=80'
    ],
    sizes: ['5-6Y', '7-8Y', '9-10Y'],
    colors: ['Red', 'White'],
    description: 'Sleeveless dress with round neckline and back zip fastening. Floral print detail.',
    isSale: true
  },
  {
    id: 'k2',
    name: 'DENIM TRUCKER JACKET',
    category: 'Kids',
    subCategory: 'Boys',
    price: 2590,
    originalPrice: 2590,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1519457431-758c4a5d7b5b?w=800&q=80',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80'
    ],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['Blue'],
    description: 'Long sleeve jacket with a collar. Front button fastening. Chest flap pockets.',
    isNew: true
  },
  {
    id: 'k3',
    name: 'STRIPED BABY JUMPSUIT',
    category: 'Kids',
    subCategory: 'Baby',
    price: 1290,
    originalPrice: 1290,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1522771935877-53787d821ad3?w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80'
    ],
    sizes: ['3-6M', '6-9M', '9-12M', '12-18M'],
    colors: ['Blue', 'White'],
    description: 'Cotton jumpsuit with thin straps. Snap-button fastening at the bottom for easy changing.',
    isNew: true
  },
  {
    id: 'k4',
    name: 'CANVAS HI-TOP SNEAKERS',
    category: 'Kids',
    subCategory: 'Shoes',
    price: 1990,
    originalPrice: 2990,
    discount: 33,
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80'
    ],
    sizes: ['28', '30', '32', '34'],
    colors: ['White', 'Black'],
    description: 'Canvas hi-top sneakers with rubber toecap. Lace-up fastening and side zip.',
    isSale: true
  },
  {
    id: 'k5',
    name: 'EMBROIDERED TULLE SKIRT',
    category: 'Kids',
    subCategory: 'Girls',
    price: 1990,
    originalPrice: 1990,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80'
    ],
    sizes: ['6-7Y', '8-9Y', '10-11Y'],
    colors: ['Pink', 'Beige'],
    description: 'Layered tulle skirt with floral embroidery. Elastic waistband.',
    isNew: true
  },
  {
    id: 'k6',
    name: 'COLORBLOCK WINDBREAKER',
    category: 'Kids',
    subCategory: 'Boys',
    price: 2990,
    originalPrice: 3590,
    discount: 16,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80'
    ],
    sizes: ['7-8Y', '9-10Y', '11-12Y'],
    colors: ['Multi', 'Navy'],
    description: 'Hooded jacket with long sleeves. Front zip fastening. Side pockets.',
    isSale: true
  },

  // HOME
  {
    id: 'h1',
    name: 'WAFFLE KNIT THROW',
    category: 'Home',
    subCategory: 'Living Room',
    price: 2990,
    originalPrice: 4590,
    discount: 35,
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?w=800&q=80'
    ],
    sizes: ['One Size'],
    colors: ['Beige', 'Grey'],
    description: 'Large waffle-knit throw made of soft cotton. Perfect for the sofa or bed.',
    isSale: true
  },
  {
    id: 'h2',
    name: 'TEXTURED CERAMIC VASE',
    category: 'Home',
    subCategory: 'Living Room',
    price: 1990,
    originalPrice: 1990,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80',
      'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=800&q=80'
    ],
    sizes: ['Medium', 'Large'],
    colors: ['White', 'Neutral'],
    description: 'Ceramic vase with a textured matte finish. Handmade appearance.',
    isNew: true
  },
  {
    id: 'h3',
    name: 'LINEN BEDDING SET',
    category: 'Home',
    subCategory: 'Bedroom',
    price: 7990,
    originalPrice: 7990,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    sizes: ['Queen', 'King'],
    colors: ['White', 'Beige', 'Blue'],
    description: 'Bedding set including a duvet cover and two pillowcases. 100% washed linen.',
    isNew: true
  },
  {
    id: 'h4',
    name: 'BLACK VANILLA DIFFUSER',
    category: 'Home',
    subCategory: 'Fragrances',
    price: 1590,
    originalPrice: 2290,
    discount: 30,
    images: [
      'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80'
    ],
    sizes: ['200ml'],
    colors: ['Amber'],
    description: 'Reed diffuser with the scent of Black Vanilla. High intensity fragrance.',
    isSale: true
  },

  // BEAUTY
  {
    id: 'b1',
    name: 'RED TEMPTATION EDP',
    category: 'Beauty',
    subCategory: 'Perfumes',
    price: 1990,
    originalPrice: 1990,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80'
    ],
    sizes: ['80ml'],
    colors: ['Clear'],
    description: 'An amber fragrance featuring notes of saffron, jasmine and praline. Sophisticated and daring.',
    isNew: true
  },
  {
    id: 'b2',
    name: 'MATTE VELVET LIPSTICK',
    category: 'Beauty',
    subCategory: 'Makeup',
    price: 990,
    originalPrice: 990,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=800&q=80',
      'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=800&q=80'
    ],
    sizes: ['Standard'],
    colors: ['Red', 'Nude', 'Pink'],
    description: 'Long-lasting matte lipstick with a velvet finish. High pigmentation and creamy texture.',
    isNew: true
  },
  {
    id: 'b3',
    name: 'HYALURONIC FACE SERUM',
    category: 'Beauty',
    subCategory: 'Skincare',
    price: 1290,
    originalPrice: 1890,
    discount: 32,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80'
    ],
    sizes: ['30ml'],
    colors: ['Clear'],
    description: 'Intense hydration serum with hyaluronic acid. Lightweight and non-greasy formula.',
    isSale: true
  },
  {
    id: 'b4',
    name: 'NOCTURNAL ROSE CANDLE',
    category: 'Beauty',
    subCategory: 'Fragrances',
    price: 1490,
    originalPrice: 1490,
    discount: 0,
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80',
      'https://images.unsplash.com/photo-1572726710708-20bb9fa557dd?w=800&q=80'
    ],
    sizes: ['200g'],
    colors: ['Black'],
    description: 'Scented candle with notes of rose, patchouli and oud. Long-lasting burn time.',
    isNew: true
  }
];
