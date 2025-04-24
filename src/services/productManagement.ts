
import { demoProducts } from './demoProducts';
import { ProductType } from '../types/product';

// Local storage key for products
const PRODUCTS_STORAGE_KEY = "griffin_products";

// Get all products
export const getProducts = async (): Promise<ProductType[]> => {
  try {
    // First check if products exist in localStorage
    const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
    
    // If no stored products, use demo products
    // In a real app, this would fetch from an API
    return demoProducts;
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};

// Get a single product
export const getProduct = async (id: string): Promise<ProductType | null> => {
  try {
    const products = await getProducts();
    return products.find(product => product.id === id) || null;
  } catch (error) {
    console.error(`Error getting product ${id}:`, error);
    return null;
  }
};

// Add or update a product
export const saveProduct = async (product: ProductType): Promise<ProductType> => {
  try {
    // Get current products
    const products = await getProducts();
    
    // Check if product already exists
    const index = products.findIndex(p => p.id === product.id);
    
    if (index >= 0) {
      // Update existing product
      products[index] = product;
    } else {
      // Add new product
      products.push(product);
    }
    
    // Save to localStorage
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    
    return product;
  } catch (error) {
    console.error("Error saving product:", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    // Get current products
    const products = await getProducts();
    
    // Filter out the product to delete
    const updatedProducts = products.filter(product => product.id !== id);
    
    // Save updated list to localStorage
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};
