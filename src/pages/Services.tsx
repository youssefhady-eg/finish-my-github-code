
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

// 1. Define core static services that always show on the Services page
const CORE_SERVICES = [
  {
    id: "core_vpn",
    slug: "vpn-installation",
    title: "VPN Installation",
    title_ar: "تركيب VPN",
    description: "Secure VPN solution for your business: remote access, site-to-site, and mobile device support.",
    description_ar: "حل VPN آمن لعملك: وصول عن بُعد وربط بين المواقع ودعم للأجهزة المحمولة.",
    imageSrc: "/vpn.svg", 
    reliabilityPercent: 98,
  },
  {
    id: "core_callcenter",
    slug: "call-center-systems",
    title: "Call Center Systems",
    title_ar: "أنظمة مراكز الاتصال",
    description: "Efficient call center setup and VoIP integration to improve communication with customers.",
    description_ar: "إعداد فعال لمراكز الاتصال وتكامل VoIP لتحسين التواصل مع العملاء.",
    imageSrc: "/callcenter.svg",
    reliabilityPercent: 95,
  },
  {
    id: "core_crm",
    slug: "crm",
    title: "CRM",
    title_ar: "إدارة علاقات العملاء",
    description: "Streamlined CRM solutions tailored to your business for better customer insights.",
    description_ar: "حلول CRM مخصصة لعملك لرؤية أوضح حول عملائك.",
    imageSrc: "/crm.svg",
    reliabilityPercent: 95,
  },
  {
    id: "core_pos",
    slug: "pos",
    title: "POS",
    title_ar: "نقاط البيع",
    description: "Modern point-of-sale systems for retail and hospitality, easy inventory & sales tracking.",
    description_ar: "أنظمة نقاط بيع حديثة للبيع بالتجزئة والضيافة مع تتبع سهل للمخزون والمبيعات.",
    imageSrc: "/pos.svg",
    reliabilityPercent: 94,
  },
  {
    id: "core_network",
    slug: "network-designing",
    title: "Network Designing",
    title_ar: "تصميم الشبكات",
    description: "Professional network design for offices, data centers, and enterprises.",
    description_ar: "تصميم شبكات احترافي للمكاتب ومراكز البيانات والمؤسسات.",
    imageSrc: "/network.svg",
    reliabilityPercent: 97,
  }
];

const Services = () => {
  const { isArabic } = useOutletContext<OutletContextType>();
  const { data: wooServices, isLoading, error } = useWooProducts();

  // Show WooCommerce products ONLY if WooCommerce is configured and has products (don't fall back to demo/local products)
  // We'll assume real WooCommerce products have a numeric string ID.
  const validWooServices = Array.isArray(wooServices) && wooServices.length > 0
    ? wooServices.filter(
        (item: any) => !CORE_SERVICES.some(core => core.slug === ("woo-product-" + item.id) || core.id === item.id)
      )
    : [];

  // Always show core services, plus Woo services only if available from WooCommerce
  const allServices = [...CORE_SERVICES, ...validWooServices.map((item: any) => ({
    id: "woo-" + item.id,
    slug: "woo-product-" + item.id,
    title: item.title,
    title_ar: item.title_ar,
    description: item.description || "",
    description_ar: item.description_ar || "",
    imageSrc: item.imageSrc || "/placeholder.svg",
    reliabilityPercent: 90,
  }))];

  return (
    <div>
      <PageHeader
        title={isArabic ? "خدماتنا" : "Our Services"}
        subtitle={isArabic ? "حلول تكنولوجية متكاملة لعملك" : "Integrated Technology Solutions for Your Business"}
        isArabic={isArabic}
      />

      <Section isArabic={isArabic}>
        {isLoading && validWooServices.length === 0 ? (
          <div className="text-center py-8">{isArabic ? "جاري التحميل..." : "Loading..."}</div>
        ) : error && validWooServices.length === 0 ? (
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

