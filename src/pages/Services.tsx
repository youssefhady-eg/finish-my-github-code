
import { useOutletContext } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import { useWooProducts } from "@/hooks/useWooProducts";
import { getProducts } from "@/services/productManagement";
import { useEffect, useState } from "react";

/**
 * Outlet context for language and cart controls
 */
type OutletContextType = {
  isArabic: boolean;
  setCartCount: (count: number) => void;
};

const Services = () => {
  const { isArabic } = useOutletContext<OutletContextType>();
  const { data: wooServices, isLoading, error } = useWooProducts();
  const [localProducts, setLocalProducts] = useState<any[]>([]);

  useEffect(() => {
    // Load local products from productManagement
    const loadLocalProducts = async () => {
      const products = await getProducts();
      setLocalProducts(products);
    };
    
    loadLocalProducts();
  }, []);

  // Convert Woo products to ServiceCard props, treating them as services
  const wooServiceCards =
    wooServices && Array.isArray(wooServices)
      ? wooServices.map((item: any) => ({
          id: item.id,
          slug: "woo-product-" + item.id,
          title: item.title,
          title_ar: item.title_ar,
          description: item.description || "",
          description_ar: item.description_ar || "",
          imageSrc: item.imageSrc || "/placeholder.svg",
          reliabilityPercent: 90, // Default/fake value for WooCommerce services
        }))
      : [];

  // Convert local products to ServiceCard props
  const localServiceCards = localProducts.map(product => ({
    id: product.id,
    slug: "local-product-" + product.id,
    title: product.title,
    title_ar: product.title_ar,
    description: product.description || "",
    description_ar: product.description_ar || "",
    imageSrc: product.imageSrc || "/placeholder.svg",
    reliabilityPercent: 95, // Default/fake value for local services
  }));

  // Combine both sources of services
  const allServices = [...localServiceCards, ...wooServiceCards];

  return (
    <div>
      <PageHeader
        title={isArabic ? "خدماتنا" : "Our Services"}
        subtitle={isArabic ? "حلول تكنولوجية متكاملة لعملك" : "Integrated Technology Solutions for Your Business"}
        isArabic={isArabic}
      />

      <Section isArabic={isArabic}>
        {isLoading && localProducts.length === 0 ? (
          <div className="text-center py-8">{isArabic ? "جاري التحميل..." : "Loading..."}</div>
        ) : error && localProducts.length === 0 ? (
          <div className="text-center py-8 text-red-500">{isArabic ? "خطأ في تحميل الخدمات" : "Failed to load services"}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service) => (
              <div key={service.id} id={service.slug}>
                <ServiceCard
                  title={isArabic ? service.title_ar : service.title}
                  description={isArabic ? service.description_ar : service.description}
                  imageSrc={service.imageSrc}
                  reliabilityPercent={service.reliabilityPercent}
                  link={`/shop#${service.slug}`}
                  isArabic={isArabic}
                />
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};

export default Services;
