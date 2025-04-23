
import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  isArabic?: boolean;
}

const PageHeader = ({
  title,
  subtitle,
  children,
  className = "",
  isArabic = false
}: PageHeaderProps) => {
  return (
    <div className={`bg-griffin-darkBlue text-white py-24 mt-16 ${className}`}>
      <div 
        className="container mx-auto px-4 text-center"
        style={{ direction: isArabic ? 'rtl' : 'ltr' }}
      >
        <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-lg md:text-xl font-fira text-griffin-teal mb-8">
            {subtitle}
          </p>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
