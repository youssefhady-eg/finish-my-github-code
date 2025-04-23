
import { useState } from "react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

type ServiceCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  reliabilityPercent: number;
  link: string;
  isArabic?: boolean;
}

const ServiceCard = ({
  title,
  description,
  imageSrc,
  reliabilityPercent,
  link,
  isArabic = false
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`service-card ${isHovered ? 'shadow-xl' : 'shadow-md'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ direction: isArabic ? 'rtl' : 'ltr' }}
    >
      <div className="flex justify-center mb-4">
        <img 
          src={imageSrc} 
          alt={title} 
          className="h-16 w-16 object-contain"
        />
      </div>
      
      <h3 className="text-xl font-bold text-griffin-darkBlue mb-3 text-center font-montserrat">
        {title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-6 text-center">
        {description}
      </p>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2 text-sm">
          <span>{isArabic ? "الموثوقية" : "Reliability"}</span>
          <span>{reliabilityPercent}%</span>
        </div>
        <Progress value={reliabilityPercent} className="h-2 bg-gray-200" />
      </div>
      
      <div className="text-center">
        <Link 
          to={link}
          className="btn-primary inline-block"
        >
          {isArabic ? "اشتري الآن" : "Buy Now"}
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
