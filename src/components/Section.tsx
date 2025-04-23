
import { ReactNode } from "react";

type SectionProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  isArabic?: boolean;
}

const Section = ({
  title,
  subtitle,
  children,
  className = "",
  id,
  isArabic = false
}: SectionProps) => {
  return (
    <section 
      id={id} 
      className={`py-16 ${className}`}
      style={{ direction: isArabic ? 'rtl' : 'ltr' }}
    >
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-griffin-darkBlue mb-4">
                {title}
              </h2>
            )}
            
            {subtitle && (
              <p className="text-lg font-fira text-griffin-teal">
                {subtitle}
              </p>
            )}
            
            <div className="w-24 h-1 bg-griffin-teal mx-auto mt-8"></div>
          </div>
        )}
        
        {children}
      </div>
    </section>
  );
};

export default Section;
