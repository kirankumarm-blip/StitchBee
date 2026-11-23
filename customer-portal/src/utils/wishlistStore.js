// ============================================================================
// STITCHBEEZ CENTRALIZED UNIVERSAL WISHLIST STORE
// Manages saved items and custom designs across ALL StitchBeez service categories:
// - Clothing & Uniforms
// - Bags & Leather
// - Shoes & Slippers
// - Vehicle Seat Covers
// - Pet Outfits
// - Handmade Gifts
// - Sofas & Living
// - Kids Wear & Custom Stitching
// ============================================================================

import { ALL_BAG_PRODUCTS } from './bagsStore';
import { ALL_SHOE_PRODUCTS } from './shoesStore';
import { ALL_HANDMADE_GIFTS } from './handmadeGiftsStore';
import { ALL_SEAT_PRODUCTS, FEATURED_PRODUCTS } from './vehicleSeatShopStore';
import { ALL_PET_PRODUCTS } from './petOutfitsStore';
import { ALL_SOFA_PRODUCTS } from './sofasStore';
import { KIDS_SHOP_PRODUCTS } from './kidsShopStore';
import { UNIFORM_PRODUCTS } from './uniformsStore';

export const WISHLIST_SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Items', icon: '✨' },
  { id: 'clothing', label: 'Clothing & Uniforms', icon: '👔' },
  { id: 'bags', label: 'Bags & Leather', icon: '👜' },
  { id: 'shoes', label: 'Shoes & Slippers', icon: '👞' },
  { id: 'seats', label: 'Vehicle Seat Covers', icon: '🚗' },
  { id: 'pets', label: 'Pet Outfits', icon: '🐾' },
  { id: 'gifts', label: 'Handmade Gifts', icon: '🎁' },
  { id: 'sofas', label: 'Sofas & Living', icon: '🛋️' },
  { id: 'kids', label: 'Kids Wear', icon: '👶' }
];

// Helper to normalize any product into a unified wishlist product shape
export const normalizeProduct = (p, serviceCategory, customLabel = null, customRoute = null) => {
  if (!p) return null;

  const id = String(p.id || p.slug || `item-${Math.random().toString(36).substr(2, 9)}`);
  const name = p.name || p.title || 'Artisan Design';
  const price = typeof p.price === 'number' ? p.price : (parseFloat(String(p.price || 0).replace(/[^0-9.]/g, '')) || 0);
  const originalPrice = p.originalPrice || p.mrp ? (typeof (p.originalPrice || p.mrp) === 'number' ? (p.originalPrice || p.mrp) : parseFloat(String(p.originalPrice || p.mrp).replace(/[^0-9.]/g, ''))) : null;
  const rating = Number(p.rating || 4.8);
  const reviews = Number(p.reviews || p.reviewCount || p.reviewsCount || 42);
  const img = p.img || p.image || (Array.isArray(p.images) && p.images[0]) || (Array.isArray(p.gallery) && p.gallery[0]) || '/logo.png';
  const material = p.material || p.fabric || (p.subtypes ? p.subtypes.join(', ') : 'Artisan Handcrafted');
  const category = p.categoryName || p.categoryLabel || p.category || (p.catId ? p.catId.toUpperCase() : 'Artisan');

  let route = customRoute;
  if (!route) {
    switch (serviceCategory) {
      case 'clothing':
      case 'uniforms':
        route = '/uniforms';
        break;
      case 'bags':
        route = `/bags/product/${id}`;
        break;
      case 'shoes':
        route = `/footwear/product/${p.slug || id}`;
        break;
      case 'seats':
        route = '/seats';
        break;
      case 'pets':
        route = `/pets/product/${p.slug || id}`;
        break;
      case 'gifts':
        route = `/handmade-gifts/product/${p.slug || id}`;
        break;
      case 'sofas':
        route = `/sofas/product/${p.slug || id}`;
        break;
      case 'kids':
        route = '/kids/shop';
        break;
      default:
        route = '/';
        break;
    }
  }

  let label = customLabel;
  if (!label) {
    const match = WISHLIST_SERVICE_CATEGORIES.find(c => c.id === serviceCategory);
    label = match ? match.label : 'Artisan Craft';
  }

  return {
    ...p,
    id,
    name,
    price,
    originalPrice,
    rating,
    reviews,
    img,
    material,
    category,
    serviceCategory,
    serviceCategoryLabel: label,
    route,
    colors: p.colors || p.swatches || [],
    sizes: p.sizes || []
  };
};

// Lazy catalog getters to safely avoid TDZ (temporal dead zone) during circular module loading
let _centralProducts = null;
let _centralCatalogMap = null;

export function getAllCentralProducts() {
  if (!_centralProducts) {
    _centralProducts = [
      ...((UNIFORM_PRODUCTS || []).map(p => normalizeProduct(p, 'clothing', 'Clothing & Uniforms', '/uniforms'))),
      ...((ALL_BAG_PRODUCTS || []).map(p => normalizeProduct(p, 'bags', 'Bags & Leather', `/bags/product/${p.id}`))),
      ...((ALL_SHOE_PRODUCTS || []).map(p => normalizeProduct(p, 'shoes', 'Shoes & Slippers', `/footwear/product/${p.slug || p.id}`))),
      ...((ALL_SEAT_PRODUCTS || []).map(p => normalizeProduct(p, 'seats', 'Vehicle Seat Covers', '/seats'))),
      ...((FEATURED_PRODUCTS || []).map(p => normalizeProduct(p, 'seats', 'Vehicle Seat Covers', '/seats'))),
      ...((ALL_PET_PRODUCTS || []).map(p => normalizeProduct(p, 'pets', 'Pet Outfits', `/pets/product/${p.slug || p.id}`))),
      ...((ALL_HANDMADE_GIFTS || []).map(p => normalizeProduct(p, 'gifts', 'Handmade Gifts', `/handmade-gifts/product/${p.slug || p.id}`))),
      ...((ALL_SOFA_PRODUCTS || []).map(p => normalizeProduct(p, 'sofas', 'Sofas & Living', `/sofas/product/${p.slug || p.id}`))),
      ...((KIDS_SHOP_PRODUCTS || []).map(p => normalizeProduct(p, 'kids', 'Kids Wear', '/kids/shop')))
    ];
  }
  return _centralProducts;
}

export function getCentralCatalogMap() {
  if (!_centralCatalogMap) {
    _centralCatalogMap = new Map();
    const all = getAllCentralProducts();
    all.forEach(item => {
      if (item && item.id && !_centralCatalogMap.has(item.id)) {
        _centralCatalogMap.set(item.id, item);
      }
      if (item && item.slug && !_centralCatalogMap.has(item.slug)) {
        _centralCatalogMap.set(item.slug, item);
      }
    });
  }
  return _centralCatalogMap;
}

// Notify components across the app to re-read localStorage
export const notifyStoreUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('stitchbee-store-update'));
  }
};

// -------------------------------------------------------------
// WISHLIST STORAGE HELPERS (stitchbeez_wishlist & custom items)
// -------------------------------------------------------------
const STORAGE_KEY = 'stitchbeez_wishlist';
const CUSTOM_ITEMS_KEY = 'stitchbeez_wishlist_custom_items';

// Default initial wishlist showing variety across all service categories
export const DEFAULT_WISHLIST_IDS = [
  'prod-1',                  // Bags & Leather: Classic Leather Handbag
  'u-1',                     // Clothing & Uniforms: School Boy Shirt
  'shoe-1',                  // Shoes & Slippers: Classic Leather Formal Shoes
  'prod-car-seat-cover',     // Vehicle Seat Covers: Premium Car Seat Cover
  'prod-casual-dog-shirt',   // Pet Outfits: Casual Dog Shirt
  'prod-classic-teddy',      // Handmade Gifts: Classic Teddy Bear
  'prod-modern-3-seater',    // Sofas & Living: Modern 3 Seater Sofa
  'prod-floral-party-frock'  // Kids Wear: Floral Party Frock
];

export function getCustomWishlistItems() {
  try {
    const raw = localStorage.getItem(CUSTOM_ITEMS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading custom wishlist items:', e);
  }
  return {};
}

export function saveCustomWishlistItems(map) {
  try {
    localStorage.setItem(CUSTOM_ITEMS_KEY, JSON.stringify(map));
  } catch (e) {
    console.error('Error saving custom wishlist items:', e);
  }
}

/**
 * Returns array of item IDs stored in the centralized wishlist
 */
export function getWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map(item => (typeof item === 'object' && item?.id ? item.id : String(item)));
      }
    }
  } catch (e) {
    console.error('Error reading stitchbeez_wishlist:', e);
  }
  return [...DEFAULT_WISHLIST_IDS];
}

/**
 * Writes array of IDs to stitchbeez_wishlist and dispatches update
 */
export function saveWishlist(ids) {
  try {
    const cleanIds = Array.isArray(ids) ? ids.map(i => (typeof i === 'object' && i?.id ? i.id : String(i))) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanIds));
    notifyStoreUpdate();
  } catch (e) {
    console.error('Error saving stitchbeez_wishlist:', e);
  }
}

/**
 * Check if a product ID is currently in the wishlist
 */
export function isItemInWishlist(productIdOrSlug) {
  if (!productIdOrSlug) return false;
  const current = getWishlist();
  const idStr = String(productIdOrSlug);
  return current.includes(idStr);
}

/**
 * Toggles a product in or out of the centralized wishlist
 * Accepts an ID string OR a full product object
 */
export function toggleWishlist(productOrId) {
  const current = getWishlist();
  let productId = null;
  let fullProduct = null;

  if (typeof productOrId === 'object' && productOrId !== null) {
    productId = String(productOrId.id || productOrId.slug || '');
    fullProduct = productOrId;
  } else {
    productId = String(productOrId);
  }

  if (!productId) {
    const res = [...current];
    res.updated = res;
    res.list = res;
    res.added = false;
    res.isAdded = false;
    return res;
  }

  const catalogMap = getCentralCatalogMap();
  const exists = current.includes(productId);
  let updatedList;

  if (exists) {
    updatedList = current.filter(id => id !== productId);
    const customMap = getCustomWishlistItems();
    if (customMap[productId]) {
      delete customMap[productId];
      saveCustomWishlistItems(customMap);
    }
  } else {
    updatedList = [...current, productId];
    // If this is a custom object not in the static catalog, save it
    if (fullProduct && !catalogMap.has(productId)) {
      const customMap = getCustomWishlistItems();
      customMap[productId] = normalizeProduct(
        fullProduct, 
        fullProduct.serviceCategory || 'clothing', 
        fullProduct.serviceCategoryLabel || 'Custom Design', 
        fullProduct.route || '/'
      );
      saveCustomWishlistItems(customMap);
    }
  }

  saveWishlist(updatedList);

  const res = [...updatedList];
  res.updated = updatedList;
  res.list = updatedList;
  res.added = !exists;
  res.isAdded = !exists;
  return res;
}

/**
 * Returns full, resolved product objects for all items currently in the wishlist
 */
export function getWishlistProducts() {
  const ids = getWishlist();
  const customMap = getCustomWishlistItems();
  const catalogMap = getCentralCatalogMap();
  const resolved = [];

  ids.forEach(id => {
    // 1. Check central catalog
    if (catalogMap.has(id)) {
      resolved.push(catalogMap.get(id));
      return;
    }

    // 2. Check custom items
    if (customMap[id]) {
      resolved.push(customMap[id]);
      return;
    }

    // 3. Fallback product representation so nothing is lost
    resolved.push({
      id,
      name: `Artisan Creation #${id}`,
      price: 1999,
      originalPrice: 2499,
      rating: 4.8,
      reviews: 24,
      img: '/featured_bags/prod_1.png',
      material: 'Custom Handcrafted',
      category: 'Artisan',
      serviceCategory: 'bags',
      serviceCategoryLabel: 'Bags & Leather',
      route: '/bags'
    });
  });

  return resolved;
}

/**
 * Clears the entire wishlist
 */
export function clearWishlist() {
  saveWishlist([]);
  saveCustomWishlistItems({});
}
