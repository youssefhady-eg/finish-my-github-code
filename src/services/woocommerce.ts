
import { CartItem } from './cart';

// WooCommerce product types that match our existing product structure
export interface WooProduct {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: { src: string; alt: string }[];
  categories: { id: number; name: string }[];
  attributes: {
    name: string;
    options: string[];
    variation: boolean;
  }[];
  variations: number[];
  related_ids: number[];
}

export interface WooVariation {
  id: number;
  attributes: { name: string; option: string }[];
  price: string;
  regular_price: string;
}

// Configuration for WooCommerce connection
interface WooConfig {
  siteUrl: string;
  consumerKey: string;
  consumerSecret: string;
}

// Default config - in a real app, these would be environment variables
const defaultConfig: WooConfig = {
  siteUrl: 'https://your-wordpress-site.com',
  consumerKey: 'ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  consumerSecret: 'cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
};

// Helper to convert WooCommerce format to our app format
export function mapWooProductToProduct(wooProduct: WooProduct, variations: WooVariation[] = []): any {
  return {
    id: wooProduct.id.toString(),
    title: wooProduct.name,
    title_ar: wooProduct.name, // You would need custom fields in WooCommerce for Arabic
    description: wooProduct.short_description,
    description_ar: wooProduct.short_description, // You would need custom fields for Arabic
    price: parseFloat(wooProduct.price),
    imageSrc: wooProduct.images[0]?.src || 'https://via.placeholder.com/300',
    variants: variations.length > 0 
      ? variations.map(v => ({
          id: v.id.toString(),
          name: v.attributes.map(a => a.option).join(' - '),
          name_ar: v.attributes.map(a => a.option).join(' - '), // Custom fields needed
          price: parseFloat(v.price)
        }))
      : [{ 
          id: 'default', 
          name: 'Default', 
          name_ar: 'افتراضي', 
          price: parseFloat(wooProduct.price) 
        }],
    features: wooProduct.description.split('.').filter(Boolean).slice(0, 3),
    features_ar: [], // Would need custom fields
    categoryId: wooProduct.categories[0]?.name.toLowerCase() || 'general',
    relatedProductIds: wooProduct.related_ids.map(id => id.toString()),
  };
}

// Get products from WooCommerce
export async function fetchWooProducts(config: WooConfig = defaultConfig) {
  try {
    const url = `${config.siteUrl}/wp-json/wc/v3/products?consumer_key=${config.consumerKey}&consumer_secret=${config.consumerSecret}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    
    const products: WooProduct[] = await response.json();
    
    // For each product with variations, fetch the variations
    const productsWithVariations = await Promise.all(
      products.map(async (product) => {
        if (product.variations && product.variations.length > 0) {
          const variationsUrl = `${config.siteUrl}/wp-json/wc/v3/products/${product.id}/variations?consumer_key=${config.consumerKey}&consumer_secret=${config.consumerSecret}`;
          const variationsResponse = await fetch(variationsUrl);
          
          if (variationsResponse.ok) {
            const variations: WooVariation[] = await variationsResponse.json();
            return mapWooProductToProduct(product, variations);
          }
        }
        return mapWooProductToProduct(product);
      })
    );
    
    return productsWithVariations;
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error);
    return [];
  }
}

// Get a single product
export async function fetchWooProduct(productId: string, config: WooConfig = defaultConfig) {
  try {
    const url = `${config.siteUrl}/wp-json/wc/v3/products/${productId}?consumer_key=${config.consumerKey}&consumer_secret=${config.consumerSecret}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    
    const product: WooProduct = await response.json();
    
    // Fetch variations if any
    if (product.variations && product.variations.length > 0) {
      const variationsUrl = `${config.siteUrl}/wp-json/wc/v3/products/${product.id}/variations?consumer_key=${config.consumerKey}&consumer_secret=${config.consumerSecret}`;
      const variationsResponse = await fetch(variationsUrl);
      
      if (variationsResponse.ok) {
        const variations: WooVariation[] = await variationsResponse.json();
        return mapWooProductToProduct(product, variations);
      }
    }
    
    return mapWooProductToProduct(product);
  } catch (error) {
    console.error('Error fetching WooCommerce product:', error);
    return null;
  }
}

// Add to cart via WooCommerce API (would need a more complex implementation for a real cart)
export async function addToWooCart(
  productId: string, 
  variationId: string, 
  quantity: number = 1, 
  config: WooConfig = defaultConfig
) {
  try {
    // In a real implementation, you would use the WooCommerce Store API to add to cart
    // For now, we'll simulate this by returning a cart item
    const product = await fetchWooProduct(productId);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    const variant = product.variants.find((v: any) => v.id === variationId) || product.variants[0];
    
    const cartItem: CartItem = {
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
    
    return cartItem;
  } catch (error) {
    console.error('Error adding to WooCommerce cart:', error);
    throw error;
  }
}
