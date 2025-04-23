
import { useQuery } from '@tanstack/react-query';
import { fetchWooProducts } from '@/services/woocommerce';

export const useWooProducts = () => {
  return useQuery({
    queryKey: ['wooProducts'],
    queryFn: fetchWooProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });
};
