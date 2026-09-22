import clothingPlaceholder from '../assets/placeholders/clothing-item.svg'

/**
 * TEMPORARY UI PREVIEW DATA — REMOVE DURING API INTEGRATION.
 *
 * These values exist only so the Dashboard layout is visible before the
 * backend is wired up. Nothing here is a real record and nothing here
 * mimics an API response shape.
 *
 * Replace with:
 *   greeting / counts -> GET /auth/me, GET /users/analytics
 *   weather           -> provided through the backend (never called direct)
 *   recent looks      -> GET /outfits
 */

export const previewUser = {
  firstName: 'Stella',
}

export const previewWeather = {
  city: 'Jakarta',
  temperature: 30,
  unit: 'C',
  condition: 'sunny',
  note: "It's a little warm today.",
}

export const previewCounts = {
  wardrobeItems: 48,
  savedLooks: 12,
}

export const previewRecentLooks = [
  { id: 'preview-1', name: 'Casual Friday', occasion: 'Casual', accent: 'blush' },
  { id: 'preview-2', name: 'Campus Day', occasion: 'Casual', accent: 'butter' },
  { id: 'preview-3', name: 'Coffee Date', occasion: 'Smart Casual', accent: 'powder' },
  { id: 'preview-4', name: 'Weekend Out', occasion: 'Relaxed', accent: 'sage' },
]

/**
 * Wardrobe preview items — REMOVE DURING API INTEGRATION.
 *
 * Replaced by GET /clothes (and GET /clothes/meta/filters for the
 * category list). No image URLs here: the card renders a pastel field
 * until real photos exist, so nothing pretends to be a backend record.
 */

export const wardrobeCategories = [
  'All',
  'Tops',
  'Bottoms',
  'Outerwear',
  'Footwear',
  'Accessories',
]

export const previewClothes = [
  { id: 'preview-c1', name: 'White Knit Top', category: 'Tops', style: 'Casual', color: 'White', occasion: 'Campus', weather: 'Warm', favorite: true, accent: 'sand' },
  { id: 'preview-c2', name: 'Black Blazer', category: 'Outerwear', style: 'Formal', color: 'Black', occasion: 'Work', weather: 'Cool', favorite: false, accent: 'lavender' },
  { id: 'preview-c3', name: 'Straight Jeans', category: 'Bottoms', style: 'Casual', color: 'Blue', occasion: 'Casual', weather: 'All Weather', favorite: false, accent: 'powder' },
  { id: 'preview-c4', name: 'White Sneakers', category: 'Footwear', style: 'Casual', color: 'White', occasion: 'Casual', weather: 'All Weather', favorite: true, accent: 'sand' },
  { id: 'preview-c5', name: 'Striped Shirt', category: 'Tops', style: 'Smart Casual', color: 'Blue', occasion: 'Campus', weather: 'Warm', favorite: false, accent: 'powder' },
  { id: 'preview-c6', name: 'Beige Cardigan', category: 'Tops', style: 'Casual', color: 'Beige', occasion: 'Casual', weather: 'Cool', favorite: false, accent: 'peach' },
  { id: 'preview-c7', name: 'Black Tote Bag', category: 'Accessories', style: 'Minimalist', color: 'Black', occasion: 'Work', weather: 'All Weather', favorite: false, accent: 'sage' },
  { id: 'preview-c8', name: 'Denim Jacket', category: 'Outerwear', style: 'Streetwear', color: 'Blue', occasion: 'Weekend', weather: 'Cool', favorite: true, accent: 'powder' },
]

/**
 * Edit-page preview item — REMOVE DURING API INTEGRATION.
 *
 * Stands in for GET /clothes/:id. `photoUrl` points at a local
 * placeholder illustration, never a remote or stock image.
 */

export const previewEditItem = {
  photoUrl: clothingPlaceholder,
  values: {
    name: 'White Knit Top',
    category: 'Tops',
    color: 'White',
    style: 'Casual',
    occasion: 'Campus',
    weather: 'All Weather',
  },
}

/**
 * Recommendation preview — REMOVE DURING API INTEGRATION.
 *
 * Shaped to mirror what POST /recommendations will return, so wiring the
 * real call is a swap rather than a rewrite. The score, the stylist note
 * and the reasons all come from the backend; the frontend never computes
 * them and never talks to Gemini or a weather service directly.
 */

export const previewRecommendation = {
  score: 92,
  occasion: 'Campus',
  weather: { city: 'Jakarta', temperature: 30, unit: 'C', note: 'Warm today' },
  items: [
    { id: 'preview-c1', slot: 'Top', name: 'White Knit Top', accent: 'sand' },
    { id: 'preview-c3', slot: 'Bottom', name: 'Straight Jeans', accent: 'powder' },
    { id: 'preview-c4', slot: 'Footwear', name: 'White Sneakers', accent: 'sand' },
  ],
  stylistNote:
    'This look is perfect for a warm campus day! The knit top keeps it light and breathable, while the straight jeans give a clean and effortless look. White sneakers make it comfortable for all-day activities.',
  reasons: [
    {
      id: 'weather',
      title: 'Weather Ready',
      note: 'Light fabrics and breathable materials work well for warm weather.',
      icon: 'sun',
    },
    {
      id: 'silhouette',
      title: 'Balanced Silhouette',
      note: 'The fitted top and straight jeans create a flattering, timeless look.',
      icon: 'hanger',
    },
    {
      id: 'versatile',
      title: 'Effortless & Versatile',
      note: 'Perfect for classes, coffee runs, or a casual day out.',
      icon: 'star',
    },
  ],
}

/**
 * Lookbook preview — REMOVE DURING API INTEGRATION.
 *
 * Shaped to match what GET /outfits will return, so the components can
 * take the real response unchanged. `items` carries no imageUrl yet;
 * the composition falls back to the placeholder illustration.
 */

export const previewLooks = [
  {
    id: 'look-1',
    name: 'Campus Day',
    occasion: 'Campus',
    style: 'Casual',
    items: [
      { id: 'i1', name: 'White Knit Top' },
      { id: 'i2', name: 'Straight Jeans' },
      { id: 'i3', name: 'White Sneakers' },
    ],
    note: 'A clean and comfy look for your campus day.',
    savedAt: '2026-09-21',
    favorite: false,
    accent: 'sand',
  },
  {
    id: 'look-2',
    name: 'Work Essentials',
    occasion: 'Work',
    style: 'Smart Casual',
    items: [
      { id: 'i4', name: 'Black Blazer' },
      { id: 'i5', name: 'Beige Pants' },
      { id: 'i6', name: 'Loafers' },
    ],
    note: 'Polished and easy for a full day at work.',
    savedAt: '2026-09-20',
    favorite: true,
    accent: 'lavender',
  },
  {
    id: 'look-3',
    name: 'Coffee Date',
    occasion: 'Date',
    style: 'Casual',
    items: [
      { id: 'i7', name: 'Pink Top' },
      { id: 'i8', name: 'White Skirt' },
      { id: 'i9', name: 'Ballet Flats' },
    ],
    note: 'Soft and light for a relaxed afternoon out.',
    savedAt: '2026-09-18',
    favorite: false,
    accent: 'blush',
  },
  {
    id: 'look-4',
    name: 'Weekend Vibes',
    occasion: 'Weekend',
    style: 'Casual',
    items: [
      { id: 'i10', name: 'Striped Sweater' },
      { id: 'i11', name: 'Wide Pants' },
      { id: 'i12', name: 'Sneakers' },
    ],
    note: 'Easy layers for a slow weekend.',
    savedAt: '2026-09-17',
    favorite: false,
    accent: 'powder',
  },
  {
    id: 'look-5',
    name: 'Dinner Night',
    occasion: 'Formal',
    style: 'Elegant',
    items: [
      { id: 'i13', name: 'Blazer' },
      { id: 'i14', name: 'Black Dress' },
      { id: 'i15', name: 'Ankle Boots' },
    ],
    note: 'Quietly elegant for an evening out.',
    savedAt: '2026-09-15',
    favorite: true,
    accent: 'sand',
  },
  {
    id: 'look-6',
    name: 'Relaxed Sunday',
    occasion: 'Weekend',
    style: 'Casual',
    items: [
      { id: 'i16', name: 'Blue Shirt' },
      { id: 'i17', name: 'White Skirt' },
      { id: 'i18', name: 'White Sneakers' },
    ],
    note: 'Fresh and simple for an unhurried Sunday.',
    savedAt: '2026-09-14',
    favorite: false,
    accent: 'sage',
  },
]

/**
 * Calendar preview — REMOVE DURING API INTEGRATION.
 *
 * Keyed by local date string so entries can be matched to the grid
 * directly. Replaced by GET /outfits/calendar, whose records carry the
 * same date + outfit shape.
 */

export const previewCalendar = {
  '2026-09-02': {
    id: 'cal-1',
    name: 'Weekend Vibes',
    occasion: 'Weekend',
    style: 'Casual',
    accent: 'powder',
    note: 'Easy layers for a slow weekend.',
    items: [
      { id: 'w1', name: 'Striped Sweater' },
      { id: 'w2', name: 'Wide Pants' },
      { id: 'w3', name: 'Sneakers' },
    ],
  },
  '2026-09-05': {
    id: 'cal-2',
    name: 'Coffee Date',
    occasion: 'Date',
    style: 'Casual',
    accent: 'blush',
    note: 'Soft, simple, and perfect for a coffee date.',
    items: [
      { id: 'c1', name: 'Pink Top' },
      { id: 'c2', name: 'White Skirt' },
      { id: 'c3', name: 'Ballet Flats' },
      { id: 'c4', name: 'Pink Handbag' },
    ],
  },
  '2026-09-09': {
    id: 'cal-3',
    name: 'Work Essentials',
    occasion: 'Work',
    style: 'Smart Casual',
    accent: 'sand',
    note: 'Polished and effortless for a productive day.',
    items: [
      { id: 'k1', name: 'Black Blazer' },
      { id: 'k2', name: 'Beige Pants' },
      { id: 'k3', name: 'Black Loafers' },
      { id: 'k4', name: 'Black Handbag' },
    ],
  },
  '2026-09-12': {
    id: 'cal-4',
    name: 'Campus Day',
    occasion: 'Campus',
    style: 'Casual',
    accent: 'sage',
    note: 'A clean and comfy look for your campus day.',
    items: [
      { id: 'p1', name: 'Blue Shirt' },
      { id: 'p2', name: 'White Skirt' },
      { id: 'p3', name: 'White Sneakers' },
    ],
  },
  '2026-09-15': {
    id: 'cal-5',
    name: 'Dinner Night',
    occasion: 'Formal',
    style: 'Elegant',
    accent: 'lavender',
    note: 'Quietly elegant for an evening out.',
    items: [
      { id: 'd1', name: 'Blazer' },
      { id: 'd2', name: 'Black Dress' },
      { id: 'd3', name: 'Ankle Boots' },
    ],
  },
  '2026-09-18': {
    id: 'cal-6',
    name: 'Coffee Date',
    occasion: 'Date',
    style: 'Casual',
    accent: 'blush',
    note: 'Soft, simple, and perfect for a coffee date.',
    items: [
      { id: 'c5', name: 'Pink Top' },
      { id: 'c6', name: 'White Skirt' },
      { id: 'c7', name: 'Ballet Flats' },
    ],
  },
  '2026-09-21': {
    id: 'cal-7',
    name: 'Campus Day',
    occasion: 'Campus',
    style: 'Casual',
    accent: 'sand',
    note: 'A clean and comfy look for your campus day.',
    items: [
      { id: 'g1', name: 'White Knit Top' },
      { id: 'g2', name: 'Straight Jeans' },
      { id: 'g3', name: 'White Sneakers' },
    ],
  },
}

/**
 * Profile preview — REMOVE DURING API INTEGRATION.
 *
 * Replaced by GET /auth/me (name, email) and GET /users/analytics
 * (the three counts). Style preferences will ride on PUT /auth/profile.
 */

export const previewProfile = {
  name: 'Stella',
  email: 'stella@email.com',
  wardrobeCount: 12,
  savedLooks: 8,
  daysStyled: 21,
  styles: ['Casual', 'Smart Casual', 'Modest'],
  colors: ['blush', 'lavender'],
}

export const STYLE_PREFERENCE_OPTIONS = [
  'Casual',
  'Smart Casual',
  'Streetwear',
  'Formal',
  'Modest',
  'Vintage',
  'Minimalist',
  'Trendy',
]

export const COLOR_PREFERENCE_OPTIONS = [
  { id: 'blush', label: 'Blush pink', hex: '#DDB5C4' },
  { id: 'lavender', label: 'Lavender', hex: '#C8BCD5' },
  { id: 'blue', label: 'Soft blue', hex: '#B8CEDD' },
  { id: 'sage', label: 'Sage', hex: '#BFD1C3' },
  { id: 'beige', label: 'Beige', hex: '#E5C6B0' },
  { id: 'brown', label: 'Brown', hex: '#6D473E' },
  { id: 'grey', label: 'Grey', hex: '#CFCAC6' },
]
