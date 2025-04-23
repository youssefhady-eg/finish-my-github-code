
import { useQuery } from '@tanstack/react-query';
import { fetchWooProducts } from '@/services/woocommerce';
import { getWooConfig } from '@/components/WooCommerceSettings';
import { getProducts } from '@/services/productManagement';

export const useWooProducts = () => {
  const config = getWooConfig();
  
  return useQuery({
    queryKey: ['wooProducts'],
    queryFn: async () => {
      // Try to fetch from WooCommerce if configured
      if (config) {
        try {
          const wooProducts = await fetchWooProducts(config);
          // If we got products from WooCommerce, return them
          if (wooProducts && wooProducts.length > 0) {
            return wooProducts;
          }
        } catch (error) {
          console.error("Error fetching from WooCommerce:", error);
        }
      }
      
      // Fallback to local products if WooCommerce fails or isn't configured
      return await getProducts();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });
};
