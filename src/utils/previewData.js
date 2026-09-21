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
  { id: 'preview-c1', name: 'White Knit Top', category: 'Tops', style: 'Casual', favorite: true, accent: 'sand' },
  { id: 'preview-c2', name: 'Black Blazer', category: 'Outerwear', style: 'Formal', favorite: false, accent: 'lavender' },
  { id: 'preview-c3', name: 'Straight Jeans', category: 'Bottoms', style: 'Casual', favorite: false, accent: 'powder' },
  { id: 'preview-c4', name: 'White Sneakers', category: 'Footwear', style: 'Casual', favorite: true, accent: 'sand' },
  { id: 'preview-c5', name: 'Striped Shirt', category: 'Tops', style: 'Casual', favorite: false, accent: 'powder' },
  { id: 'preview-c6', name: 'Beige Cardigan', category: 'Tops', style: 'Casual', favorite: false, accent: 'peach' },
  { id: 'preview-c7', name: 'Black Tote Bag', category: 'Accessories', style: 'Casual', favorite: false, accent: 'sage' },
  { id: 'preview-c8', name: 'Denim Jacket', category: 'Outerwear', style: 'Casual', favorite: true, accent: 'powder' },
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
