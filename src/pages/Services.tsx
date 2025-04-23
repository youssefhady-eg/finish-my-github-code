
import { useOutletContext } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import { useWooProducts } from "@/hooks/useWooProducts";

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

  // Show ONLY WooCommerce services, ALL sourced from WordPress/WooCommerce
  const allServices = wooServiceCards;

  return (
    <div>
      <PageHeader
        title={isArabic ? "خدماتنا" : "Our Services"}
        subtitle={isArabic ? "حلول تكنولوجية متكاملة لعملك" : "Integrated Technology Solutions for Your Business"}
        isArabic={isArabic}
      />

      <Section isArabic={isArabic}>
        {isLoading ? (
          <div className="text-center py-8">{isArabic ? "جاري التحميل..." : "Loading..."}</div>
        ) : error ? (
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
