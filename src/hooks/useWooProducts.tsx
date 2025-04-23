
import { useQuery } from '@tanstack/react-query';
import { fetchWooProducts } from '@/services/woocommerce';
import { getWooConfig } from '@/components/WooCommerceSettings';

export const useWooProducts = () => {
  const config = getWooConfig();
  
  return useQuery({
    queryKey: ['wooProducts'],
    queryFn: async () => {
      return await fetchWooProducts(config || undefined);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });
};
