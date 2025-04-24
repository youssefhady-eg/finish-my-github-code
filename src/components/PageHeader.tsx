
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
        <h1 className={`mb-4 ${
          isArabic 
            ? 'font-arabic text-5xl md:text-6xl' 
            : 'font-montserrat text-4xl md:text-5xl'
        } font-bold`}>
          {title}
        </h1>
        
        {subtitle && (
          <p className={`mb-8 ${
            isArabic 
              ? 'font-arabic text-xl md:text-2xl' 
              : 'font-fira text-lg md:text-xl'
          } text-griffin-teal`}>
            {subtitle}
          </p>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
