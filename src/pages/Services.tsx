
import { useOutletContext } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/services/database";

type OutletContextType = {
  isArabic: boolean;
  setCartCount: (count: number) => void;
}

const Services = () => {
  const { isArabic } = useOutletContext<OutletContextType>();

  return (
    <div>
      <PageHeader
        title={isArabic ? "خدماتنا" : "Our Services"}
        subtitle={isArabic ? "حلول تكنولوجية متكاملة لعملك" : "Integrated Technology Solutions for Your Business"}
        isArabic={isArabic}
      />
      
      <Section isArabic={isArabic}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
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
      </Section>
    </div>
  );
};

export default Services;
