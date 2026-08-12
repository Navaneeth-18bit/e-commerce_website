import type { Product } from '@/types';

const COLORS = {
  black: { name: 'Black', hex: '#1a1a1a' },
  white: { name: 'White', hex: '#f5f5f5' },
  navy: { name: 'Navy', hex: '#1e293b' },
  beige: { name: 'Beige', hex: '#d9c5a0' },
  olive: { name: 'Olive', hex: '#5a5f38' },
  charcoal: { name: 'Charcoal', hex: '#3a3a3a' },
  sky: { name: 'Sky Blue', hex: '#a0c4d9' },
  sage: { name: 'Sage', hex: '#9caf88' },
  rust: { name: 'Rust', hex: '#a0522d' },
  cream: { name: 'Cream', hex: '#e8dcc8' },
  grey: { name: 'Grey', hex: '#8a8a8a' },
  burgundy: { name: 'Burgundy', hex: '#5c1a1a' },
};

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

// Pexels image pools (portrait fashion/product shots)
const IMG = {
  manBlue: 'https://images.pexels.com/photos/9219031/pexels-photo-9219031.jpeg?auto=compress&cs=tinysrgb&w=800',
  manStudio: 'https://images.pexels.com/photos/23879365/pexels-photo-23879365.jpeg?auto=compress&cs=tinysrgb&w=800',
  manCuff: 'https://images.pexels.com/photos/36104299/pexels-photo-36104299.jpeg?auto=compress&cs=tinysrgb&w=800',
  manSmile: 'https://images.pexels.com/photos/20139602/pexels-photo-20139602.jpeg?auto=compress&cs=tinysrgb&w=800',
  manTie: 'https://images.pexels.com/photos/4335780/pexels-photo-4335780.jpeg?auto=compress&cs=tinysrgb&w=800',
  manPattern: 'https://images.pexels.com/photos/9395202/pexels-photo-9395202.jpeg?auto=compress&cs=tinysrgb&w=800',
  manStripe: 'https://images.pexels.com/photos/14325513/pexels-photo-14325513.jpeg?auto=compress&cs=tinysrgb&w=800',
  manCasual: 'https://images.pexels.com/photos/37741914/pexels-photo-37741914.jpeg?auto=compress&cs=tinysrgb&w=800',
  manTieClose: 'https://images.pexels.com/photos/38784170/pexels-photo-38784170.jpeg?auto=compress&cs=tinysrgb&w=800',
  manTux: 'https://images.pexels.com/photos/255311/pexels-photo-255311.jpeg?auto=compress&cs=tinysrgb&w=800',
  manSunglasses: 'https://images.pexels.com/photos/25408097/pexels-photo-25408097.jpeg?auto=compress&cs=tinysrgb&w=800',
  manWhiteCuff: 'https://images.pexels.com/photos/36104301/pexels-photo-36104301.jpeg?auto=compress&cs=tinysrgb&w=800',
  manCollar: 'https://images.pexels.com/photos/37070444/pexels-photo-37070444.jpeg?auto=compress&cs=tinysrgb&w=800',
  manFormal: 'https://images.pexels.com/photos/28574319/pexels-photo-28574319.jpeg?auto=compress&cs=tinysrgb&w=800',
  manWhiteClose: 'https://images.pexels.com/photos/38907642/pexels-photo-38907642.jpeg?auto=compress&cs=tinysrgb&w=800',
  // folded / product
  foldMint: 'https://images.pexels.com/photos/34156905/pexels-photo-34156905.jpeg?auto=compress&cs=tinysrgb&w=800',
  foldRed: 'https://images.pexels.com/photos/12246169/pexels-photo-12246169.jpeg?auto=compress&cs=tinysrgb&w=800',
  foldNeutral: 'https://images.pexels.com/photos/20763273/pexels-photo-20763273.jpeg?auto=compress&cs=tinysrgb&w=800',
  foldAssort: 'https://images.pexels.com/photos/10952730/pexels-photo-10952730.jpeg?auto=compress&cs=tinysrgb&w=800',
  foldWhite: 'https://images.pexels.com/photos/11100290/pexels-photo-11100290.jpeg?auto=compress&cs=tinysrgb&w=800',
  foldBrown: 'https://images.pexels.com/photos/31155535/pexels-photo-31155535.jpeg?auto=compress&cs=tinysrgb&w=800',
  foldStripe: 'https://images.pexels.com/photos/13181673/pexels-photo-13181673.jpeg?auto=compress&cs=tinysrgb&w=800',
  foldCotton: 'https://images.pexels.com/photos/37704838/pexels-photo-37704838.jpeg?auto=compress&cs=tinysrgb&w=800',
  // women
  womOversize: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
  womBW: 'https://images.pexels.com/photos/30590661/pexels-photo-30590661.jpeg?auto=compress&cs=tinysrgb&w=800',
  womTattoo: 'https://images.pexels.com/photos/10483320/pexels-photo-10483320.jpeg?auto=compress&cs=tinysrgb&w=800',
  womWhiteBlack: 'https://images.pexels.com/photos/10911780/pexels-photo-10911780.jpeg?auto=compress&cs=tinysrgb&w=800',
  womCoat: 'https://images.pexels.com/photos/27383837/pexels-photo-27383837.jpeg?auto=compress&cs=tinysrgb&w=800',
  womPants: 'https://images.pexels.com/photos/33411617/pexels-photo-33411617.jpeg?auto=compress&cs=tinysrgb&w=800',
  womCheck: 'https://images.pexels.com/photos/34772586/pexels-photo-34772586.jpeg?auto=compress&cs=tinysrgb&w=800',
  womStudio: 'https://images.pexels.com/photos/30809044/pexels-photo-30809044.jpeg?auto=compress&cs=tinysrgb&w=800',
  womGray: 'https://images.pexels.com/photos/8651009/pexels-photo-8651009.jpeg?auto=compress&cs=tinysrgb&w=800',
  womYellow: 'https://images.pexels.com/photos/37925052/pexels-photo-37925052.jpeg?auto=compress&cs=tinysrgb&w=800',
  // linen / summer
  linenHanger: 'https://images.pexels.com/photos/22441297/pexels-photo-22441297.jpeg?auto=compress&cs=tinysrgb&w=800',
  linenBeigeHang: 'https://images.pexels.com/photos/22441291/pexels-photo-22441291.jpeg?auto=compress&cs=tinysrgb&w=800',
  linenBeige: 'https://images.pexels.com/photos/17251247/pexels-photo-17251247.jpeg?auto=compress&cs=tinysrgb&w=800',
  linenFloral: 'https://images.pexels.com/photos/18031036/pexels-photo-18031036.jpeg?auto=compress&cs=tinysrgb&w=800',
  linenCross: 'https://images.pexels.com/photos/18153495/pexels-photo-18153495.jpeg?auto=compress&cs=tinysrgb&w=800',
  linenTruck: 'https://images.pexels.com/photos/18075381/pexels-photo-18075381.jpeg?auto=compress&cs=tinysrgb&w=800',
  linenGlasses: 'https://images.pexels.com/photos/17503479/pexels-photo-17503479.jpeg?auto=compress&cs=tinysrgb&w=800',
  // oversized / streetwear
  swGraffiti: 'https://images.pexels.com/photos/30685578/pexels-photo-30685578.jpeg?auto=compress&cs=tinysrgb&w=800',
  swBalcony: 'https://images.pexels.com/photos/12427506/pexels-photo-12427506.jpeg?auto=compress&cs=tinysrgb&w=800',
  swPlaid: 'https://images.pexels.com/photos/34769415/pexels-photo-34769415.jpeg?auto=compress&cs=tinysrgb&w=800',
  swLayered: 'https://images.pexels.com/photos/6616673/pexels-photo-6616673.jpeg?auto=compress&cs=tinysrgb&w=800',
  swBrick: 'https://images.pexels.com/photos/12150964/pexels-photo-12150964.jpeg?auto=compress&cs=tinysrgb&w=800',
  // landscape hero
  heroBeach: 'https://images.pexels.com/photos/19915577/pexels-photo-19915577.jpeg?auto=compress&cs=tinysrgb&w=1600',
  heroBlueModel: 'https://images.pexels.com/photos/10141002/pexels-photo-10141002.jpeg?auto=compress&cs=tinysrgb&w=1600',
  heroYellow: 'https://images.pexels.com/photos/33217726/pexels-photo-33217726.jpeg?auto=compress&cs=tinysrgb&w=1600',
  heroClothesline: 'https://images.pexels.com/photos/8346030/pexels-photo-8346030.jpeg?auto=compress&cs=tinysrgb&w=1600',
  heroShadow: 'https://images.pexels.com/photos/7697958/pexels-photo-7697958.jpeg?auto=compress&cs=tinysrgb&w=1600',
};

export const HERO_IMAGES = {
  primary: IMG.heroBeach,
  secondary: IMG.heroBlueModel,
  tertiary: IMG.heroYellow,
  clothesline: IMG.heroClothesline,
  shadow: IMG.heroShadow,
};

export const PROMO_IMAGES = {
  essentials: IMG.linenHanger,
  linen: IMG.linenBeige,
  oversized: IMG.swGraffiti,
  formal: IMG.manStudio,
  sale: IMG.foldAssort,
};

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function makeProduct(
  name: string,
  brand: string,
  category: Product['category'],
  price: number,
  discountPrice: number,
  images: string[],
  opts: Partial<Product> = {}
): Product {
  const slug = slugify(name);
  const discountPercentage = Math.round((1 - discountPrice / price) * 100);
  return {
    id: slug,
    slug,
    name,
    brand,
    category,
    description:
      opts.description ||
      'A meticulously crafted shirt designed for the modern wardrobe. Cut from premium fabric with attention to every detail, it balances comfort and structure for effortless everyday wear.',
    images,
    price,
    discountPrice,
    discountPercentage,
    colors: opts.colors || [COLORS.black, COLORS.white, COLORS.navy],
    sizes: opts.sizes || SIZES,
    unavailableSizes: opts.unavailableSizes || [],
    material: opts.material || '100% Premium Cotton',
    fit: opts.fit || 'Regular Fit',
    pattern: opts.pattern || 'Solid',
    rating: opts.rating || 4.5,
    reviewCount: opts.reviewCount || 120,
    stock: opts.stock || 50,
    isFeatured: opts.isFeatured ?? false,
    isNewArrival: opts.isNewArrival ?? false,
    care: opts.care || ['Machine wash cold', 'Do not bleach', 'Tumble dry low', 'Iron on medium heat'],
  };
}

export const products: Product[] = [
  makeProduct(
    'Oversized Cotton Essential Shirt',
    'NOVA Basics',
    'oversized',
    1499,
    899,
    [IMG.manCasual, IMG.foldCotton, IMG.swGraffiti],
    {
      colors: [COLORS.black, COLORS.white, COLORS.beige, COLORS.olive],
      material: '100% Combed Cotton, 240 GSM',
      fit: 'Oversized Drop-Shoulder',
      pattern: 'Solid',
      rating: 4.6,
      reviewCount: 342,
      isFeatured: true,
      isNewArrival: true,
      stock: 68,
    }
  ),
  makeProduct(
    'Relaxed Linen Resort Shirt',
    'NOVA Resort',
    'linen',
    2299,
    1599,
    [IMG.linenCross, IMG.linenHanger, IMG.linenBeige],
    {
      colors: [COLORS.beige, COLORS.sage, COLORS.cream, COLORS.sky],
      material: '100% French Linen',
      fit: 'Relaxed Fit',
      pattern: 'Solid',
      rating: 4.7,
      reviewCount: 189,
      isFeatured: true,
      isNewArrival: true,
      stock: 42,
    }
  ),
  makeProduct(
    'Classic Oxford Shirt',
    'NOVA Tailored',
    'formal',
    1999,
    1399,
    [IMG.manWhiteCuff, IMG.manFormal, IMG.foldWhite],
    {
      colors: [COLORS.white, COLORS.sky, COLORS.navy],
      material: 'Oxford Cotton, 200 GSM',
      fit: 'Tailored Fit',
      pattern: 'Oxford Weave',
      rating: 4.5,
      reviewCount: 256,
      isFeatured: true,
      unavailableSizes: ['S'],
      stock: 35,
    }
  ),
  makeProduct(
    'Premium Black Overshirt',
    'NOVA Premium',
    'premium',
    2999,
    2099,
    [IMG.manStudio, IMG.manTux, IMG.foldBrown],
    {
      colors: [COLORS.black, COLORS.charcoal],
      material: 'Premium Wool Blend',
      fit: 'Structured Fit',
      pattern: 'Solid',
      rating: 4.8,
      reviewCount: 98,
      isFeatured: true,
      stock: 22,
    }
  ),
  makeProduct(
    'Textured Casual Shirt',
    'NOVA Everyday',
    'casual',
    1299,
    799,
    [IMG.manCollar, IMG.manCasual, IMG.foldNeutral],
    {
      colors: [COLORS.olive, COLORS.rust, COLORS.cream],
      material: 'Cotton Slub, 180 GSM',
      fit: 'Regular Fit',
      pattern: 'Textured Solid',
      rating: 4.4,
      reviewCount: 167,
      isNewArrival: true,
      stock: 55,
    }
  ),
  makeProduct(
    'Minimal Stripe Shirt',
    'NOVA Basics',
    'casual',
    1599,
    999,
    [IMG.manStripe, IMG.foldStripe, IMG.manPattern],
    {
      colors: [COLORS.white, COLORS.navy, COLORS.grey],
      material: 'Cotton Poplin',
      fit: 'Slim Fit',
      pattern: 'Vertical Stripes',
      rating: 4.5,
      reviewCount: 203,
      isFeatured: true,
      stock: 48,
    }
  ),
  makeProduct(
    'Relaxed Linen Resort Shirt — Sage',
    'NOVA Resort',
    'linen',
    2499,
    1749,
    [IMG.linenBeige, IMG.linenHanger, IMG.linenFloral],
    {
      colors: [COLORS.sage, COLORS.cream, COLORS.beige],
      material: 'Linen-Cotton Blend',
      fit: 'Relaxed Fit',
      pattern: 'Solid',
      rating: 4.6,
      reviewCount: 145,
      isNewArrival: true,
      stock: 38,
    }
  ),
  makeProduct(
    'Structured Formal Shirt',
    'NOVA Tailored',
    'formal',
    1899,
    1299,
    [IMG.manTie, IMG.manTieClose, IMG.manFormal],
    {
      colors: [COLORS.white, COLORS.sky, COLORS.navy],
      material: 'Cotton Twill, 220 GSM',
      fit: 'Slim Fit',
      pattern: 'Solid',
      rating: 4.4,
      reviewCount: 178,
      stock: 40,
      unavailableSizes: ['XXL'],
    }
  ),
  makeProduct(
    'Oversized Graphic Shirt',
    'NOVA Street',
    'oversized',
    1799,
    1099,
    [IMG.swGraffiti, IMG.swBrick, IMG.manPattern],
    {
      colors: [COLORS.black, COLORS.white, COLORS.burgundy],
      material: 'Heavy Cotton, 260 GSM',
      fit: 'Oversized Boxy',
      pattern: 'Graphic Print',
      rating: 4.3,
      reviewCount: 134,
      isNewArrival: true,
      stock: 31,
    }
  ),
  makeProduct(
    'Premium Oxford Button-Down',
    'NOVA Premium',
    'premium',
    2599,
    1819,
    [IMG.manWhiteCuff, IMG.manCuff, IMG.foldWhite],
    {
      colors: [COLORS.white, COLORS.navy, COLORS.sky],
      material: 'Premium Oxford Cotton',
      fit: 'Tailored Fit',
      pattern: 'Oxford Weave',
      rating: 4.7,
      reviewCount: 112,
      isFeatured: true,
      stock: 28,
    }
  ),
  makeProduct(
    'Casual Linen Blend Shirt',
    'NOVA Everyday',
    'linen',
    1499,
    899,
    [IMG.linenTruck, IMG.linenGlasses, IMG.linenBeige],
    {
      colors: [COLORS.beige, COLORS.olive, COLORS.cream],
      material: '55% Linen 45% Cotton',
      fit: 'Regular Fit',
      pattern: 'Solid',
      rating: 4.3,
      reviewCount: 156,
      stock: 44,
    }
  ),
  makeProduct(
    'Tailored Formal Oxford',
    'NOVA Tailored',
    'formal',
    2199,
    1539,
    [IMG.manFormal, IMG.manWhiteCuff, IMG.foldWhite],
    {
      colors: [COLORS.white, COLORS.navy, COLORS.charcoal],
      material: 'Egyptian Cotton Oxford',
      fit: 'Tailored Fit',
      pattern: 'Oxford Weave',
      rating: 4.6,
      reviewCount: 89,
      stock: 33,
    }
  ),
  makeProduct(
    'Oversized Boxy Tee Shirt',
    'NOVA Street',
    'oversized',
    1199,
    699,
    [IMG.swBrick, IMG.swLayered, IMG.foldCotton],
    {
      colors: [COLORS.black, COLORS.white, COLORS.grey, COLORS.olive],
      material: 'Cotton Jersey, 220 GSM',
      fit: 'Oversized Boxy',
      pattern: 'Solid',
      rating: 4.2,
      reviewCount: 278,
      isNewArrival: true,
      stock: 72,
    }
  ),
  makeProduct(
    'Premium Twill Work Shirt',
    'NOVA Premium',
    'premium',
    2799,
    1959,
    [IMG.manCollar, IMG.foldBrown, IMG.manCasual],
    {
      colors: [COLORS.charcoal, COLORS.olive, COLORS.rust],
      material: 'Cotton Twill, 280 GSM',
      fit: 'Regular Fit',
      pattern: 'Twill Weave',
      rating: 4.7,
      reviewCount: 76,
      stock: 25,
    }
  ),
  makeProduct(
    'Casual Chambray Shirt',
    'NOVA Everyday',
    'casual',
    1699,
    1189,
    [IMG.manBlue, IMG.manSmile, IMG.foldNeutral],
    {
      colors: [COLORS.sky, COLORS.navy],
      material: 'Chambray Cotton',
      fit: 'Regular Fit',
      pattern: 'Chambray',
      rating: 4.4,
      reviewCount: 198,
      isFeatured: true,
      stock: 51,
    }
  ),
  makeProduct(
    'Linen Floral Resort Shirt',
    'NOVA Resort',
    'linen',
    2399,
    1679,
    [IMG.linenFloral, IMG.linenTruck, IMG.linenBeige],
    {
      colors: [COLORS.cream, COLORS.sage, COLORS.rust],
      material: '100% Linen',
      fit: 'Relaxed Fit',
      pattern: 'Floral Print',
      rating: 4.5,
      reviewCount: 123,
      isNewArrival: true,
      stock: 36,
    }
  ),
  makeProduct(
    'Minimal Black Formal Shirt',
    'NOVA Tailored',
    'formal',
    1799,
    1259,
    [IMG.manStudio, IMG.manTux, IMG.manTie],
    {
      colors: [COLORS.black, COLORS.charcoal],
      material: 'Cotton Sateen',
      fit: 'Slim Fit',
      pattern: 'Solid',
      rating: 4.3,
      reviewCount: 145,
      stock: 39,
    }
  ),
  makeProduct(
    'Oversized Flannel Shirt',
    'NOVA Street',
    'oversized',
    1999,
    1399,
    [IMG.swPlaid, IMG.swGraffiti, IMG.foldStripe],
    {
      colors: [COLORS.burgundy, COLORS.olive, COLORS.charcoal],
      material: 'Brushed Cotton Flannel',
      fit: 'Oversized',
      pattern: 'Check',
      rating: 4.4,
      reviewCount: 167,
      stock: 43,
    }
  ),
  makeProduct(
    'Premium Pique Polo Shirt',
    'NOVA Premium',
    'premium',
    1899,
    1329,
    [IMG.manCollar, IMG.foldNeutral, IMG.manCasual],
    {
      colors: [COLORS.navy, COLORS.white, COLORS.olive, COLORS.burgundy],
      material: 'Cotton Pique, 240 GSM',
      fit: 'Tailored Fit',
      pattern: 'Pique Knit',
      rating: 4.5,
      reviewCount: 234,
      stock: 57,
    }
  ),
  makeProduct(
    'Casual Cuban Collar Shirt',
    'NOVA Everyday',
    'casual',
    1399,
    979,
    [IMG.linenGlasses, IMG.manPattern, IMG.foldCotton],
    {
      colors: [COLORS.rust, COLORS.cream, COLORS.sky],
      material: 'Cotton Poplin',
      fit: 'Relaxed Fit',
      pattern: 'Geometric Print',
      rating: 4.2,
      reviewCount: 112,
      isNewArrival: true,
      stock: 48,
    }
  ),
  makeProduct(
    'Linen Striped Resort Shirt',
    'NOVA Resort',
    'linen',
    2199,
    1539,
    [IMG.linenHanger, IMG.linenBeigeHang, IMG.linenCross],
    {
      colors: [COLORS.cream, COLORS.sky, COLORS.sage],
      material: 'Linen Cotton Blend',
      fit: 'Relaxed Fit',
      pattern: 'Horizontal Stripes',
      rating: 4.4,
      reviewCount: 98,
      stock: 34,
    }
  ),
  makeProduct(
    'Premium Cotton Flannel Shirt',
    'NOVA Premium',
    'premium',
    2499,
    1749,
    [IMG.swPlaid, IMG.foldBrown, IMG.swLayered],
    {
      colors: [COLORS.olive, COLORS.burgundy, COLORS.charcoal],
      material: 'Premium Brushed Cotton',
      fit: 'Regular Fit',
      pattern: 'Check',
      rating: 4.6,
      reviewCount: 87,
      stock: 29,
    }
  ),
  makeProduct(
    'Oversized Cotton Tee Shirt',
    'NOVA Basics',
    'oversized',
    999,
    599,
    [IMG.foldCotton, IMG.swBrick, IMG.manCasual],
    {
      colors: [COLORS.white, COLORS.black, COLORS.grey, COLORS.beige],
      material: 'Combed Cotton, 200 GSM',
      fit: 'Oversized',
      pattern: 'Solid',
      rating: 4.1,
      reviewCount: 312,
      stock: 85,
    }
  ),
  makeProduct(
    'Tailored Pinpoint Oxford',
    'NOVA Tailored',
    'formal',
    2399,
    1679,
    [IMG.manWhiteCuff, IMG.manCuff, IMG.foldWhite],
    {
      colors: [COLORS.white, COLORS.sky],
      material: 'Pinpoint Oxford Cotton',
      fit: 'Tailored Fit',
      pattern: 'Pinpoint Weave',
      rating: 4.6,
      reviewCount: 67,
      stock: 26,
      unavailableSizes: ['S', 'XXL'],
    }
  ),
  makeProduct(
    'Casual Utility Shirt',
    'NOVA Everyday',
    'casual',
    1799,
    1259,
    [IMG.manCollar, IMG.foldBrown, IMG.manCasual],
    {
      colors: [COLORS.olive, COLORS.charcoal, COLORS.rust],
      material: 'Cotton Canvas, 260 GSM',
      fit: 'Regular Fit',
      pattern: 'Solid',
      rating: 4.3,
      reviewCount: 134,
      stock: 37,
    }
  ),
  makeProduct(
    'Linen Blend Band Collar Shirt',
    'NOVA Resort',
    'linen',
    1999,
    1399,
    [IMG.linenGlasses, IMG.linenBeige, IMG.linenHanger],
    {
      colors: [COLORS.beige, COLORS.cream, COLORS.sky],
      material: 'Linen Viscose Blend',
      fit: 'Relaxed Fit',
      pattern: 'Solid',
      rating: 4.4,
      reviewCount: 109,
      isNewArrival: true,
      stock: 41,
    }
  ),
  makeProduct(
    'Premium Poplin Dress Shirt',
    'NOVA Premium',
    'premium',
    2299,
    1609,
    [IMG.manTie, IMG.manWhiteCuff, IMG.foldWhite],
    {
      colors: [COLORS.white, COLORS.sky, COLORS.navy],
      material: 'Cotton Poplin, 140 GSM',
      fit: 'Slim Fit',
      pattern: 'Solid',
      rating: 4.7,
      reviewCount: 156,
      isFeatured: true,
      stock: 32,
    }
  ),
  makeProduct(
    'Oversized Camp Collar Shirt',
    'NOVA Street',
    'oversized',
    1599,
    1119,
    [IMG.swGraffiti, IMG.manPattern, IMG.foldCotton],
    {
      colors: [COLORS.black, COLORS.olive, COLORS.rust],
      material: 'Cotton Poplin',
      fit: 'Oversized',
      pattern: 'Tropical Print',
      rating: 4.2,
      reviewCount: 89,
      isNewArrival: true,
      stock: 44,
    }
  ),
  makeProduct(
    'Casual Garment-Dyed Shirt',
    'NOVA Everyday',
    'casual',
    1499,
    1049,
    [IMG.manCollar, IMG.foldNeutral, IMG.manBlue],
    {
      colors: [COLORS.olive, COLORS.rust, COLORS.charcoal],
      material: 'Garment-Dyed Cotton',
      fit: 'Regular Fit',
      pattern: 'Solid',
      rating: 4.3,
      reviewCount: 178,
      stock: 49,
    }
  ),
  makeProduct(
    'Premium Linen-Cotton Shirt',
    'NOVA Premium',
    'premium',
    2699,
    1889,
    [IMG.linenCross, IMG.linenHanger, IMG.linenBeige],
    {
      colors: [COLORS.cream, COLORS.sage, COLORS.beige],
      material: '60% Linen 40% Cotton',
      fit: 'Tailored Relaxed',
      pattern: 'Solid',
      rating: 4.7,
      reviewCount: 92,
      isFeatured: true,
      stock: 27,
    }
  ),
];

// Sale items: products with discount >= 30%
export const saleProducts = products.filter((p) => p.discountPercentage >= 30);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export const ALL_COLORS = Object.values(COLORS);
export const ALL_SIZES = SIZES;
export const ALL_FITS = ['Regular Fit', 'Slim Fit', 'Tailored Fit', 'Oversized', 'Oversized Boxy', 'Oversized Drop-Shoulder', 'Relaxed Fit', 'Structured Fit', 'Tailored Relaxed'];
export const ALL_PATTERNS = ['Solid', 'Vertical Stripes', 'Horizontal Stripes', 'Oxford Weave', 'Pinpoint Weave', 'Twill Weave', 'Chambray', 'Check', 'Pique Knit', 'Textured Solid', 'Floral Print', 'Geometric Print', 'Tropical Print', 'Graphic Print'];
