
import { useQuery } from '@tanstack/react-query';
import { fetchWooProducts } from '@/services/woocommerce';
import { getWooConfig } from '@/components/WooCommerceSettings';
import { getProducts } from '@/services/productManagement';

// List of products to filter out (prevent unwanted products from showing)
const EXCLUDED_PRODUCT_KEYWORDS = [
  'website package', 
  'e-commerce solution', 
  'mobile app development',
  'website',
  'ecommerce',
  'mobile app'
];

export const useWooProducts = () => {
  const config = getWooConfig();
  
  return useQuery({
    queryKey: ['wooProducts'],
    queryFn: async () => {
      // Try to fetch from WooCommerce if configured
      if (config) {
        try {
          const wooProducts = await fetchWooProducts(config);
          // If we got products from WooCommerce, filter out unwanted ones and return
          if (wooProducts && wooProducts.length > 0) {
            const filteredProducts = wooProducts.filter(product => {
              // Check if product title includes any excluded keywords (case insensitive)
              const productTitle = (product.title || '').toLowerCase();
              return !EXCLUDED_PRODUCT_KEYWORDS.some(keyword => 
                productTitle.includes(keyword.toLowerCase())
              );
            });
            return filteredProducts;
          }
        } catch (error) {
          console.error("Error fetching from WooCommerce:", error);
        }
      }
      
      // Fallback to local products if WooCommerce fails or isn't configured
      const localProducts = await getProducts();
      
      // Filter local products too, just to be safe
      return localProducts.filter(product => {
        const productTitle = (product.title || '').toLowerCase();
        return !EXCLUDED_PRODUCT_KEYWORDS.some(keyword => 
          productTitle.includes(keyword.toLowerCase())
        );
      });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });
};
