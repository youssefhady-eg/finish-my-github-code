
// Cart functionality to simulate Bubble database for cart items

import { Product, ProductVariant } from "./database";

export interface CartItem {
  id: string;
  productId: string;
  productTitle: string;
  productTitle_ar: string;
  variantId: string;
  variantName: string;
  variantName_ar: string;
  price: number;
  quantity: number;
  imageSrc: string;
}

// Use localStorage to simulate a cart database
const CART_STORAGE_KEY = "griffin_cart_items";

// Get cart items from storage
export const getCartItems = (): CartItem[] => {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  return cartData ? JSON.parse(cartData) : [];
};

// Add item to cart
export const addToCart = (
  product: Product, 
  variant: ProductVariant, 
  quantity: number = 1
): CartItem[] => {
  const cart = getCartItems();
  
  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex(
    item => item.productId === product.id && item.variantId === variant.id
  );
  
  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    const newItem: CartItem = {
      id: `${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      productTitle_ar: product.title_ar,
      variantId: variant.id,
      variantName: variant.name,
      variantName_ar: variant.name_ar,
      price: variant.price,
      quantity,
      imageSrc: product.imageSrc
    };
    
    cart.push(newItem);
  }
  
  // Save to storage
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  
  return cart;
};

// Remove item from cart
export const removeFromCart = (itemId: string): CartItem[] => {
  const cart = getCartItems().filter(item => item.id !== itemId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  return cart;
};

// Update item quantity
export const updateCartItemQuantity = (itemId: string, quantity: number): CartItem[] => {
  const cart = getCartItems();
  const itemIndex = cart.findIndex(item => item.id === itemId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      return removeFromCart(itemId);
    } else {
      // Update quantity
      cart[itemIndex].quantity = quantity;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }
  
  return cart;
};

// Clear cart
export const clearCart = (): CartItem[] => {
  localStorage.removeItem(CART_STORAGE_KEY);
  return [];
};

// Calculate cart total
export const getCartTotal = (): number => {
  return getCartItems().reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );
};

// Get cart count
export const getCartCount = (): number => {
  return getCartItems().reduce((count, item) => count + item.quantity, 0);
};
