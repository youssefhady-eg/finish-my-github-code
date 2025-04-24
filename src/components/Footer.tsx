import { Link } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Instagram, Share2 } from "lucide-react";

type FooterProps = {
  isArabic?: boolean;
}

const Footer = ({ isArabic = false }: FooterProps) => {
  // Define services
  const services = [
    { name: isArabic ? "تركيب VPN" : "VPN Installation", path: "/services#vpn" },
    { name: isArabic ? "أنظمة مركز الاتصال" : "Call Center Systems", path: "/services#call-center" },
    { name: isArabic ? "إدارة علاقات العملاء" : "CRM", path: "/services#crm" },
    { name: isArabic ? "نقاط البيع" : "POS", path: "/services#pos" },
    { name: isArabic ? "تصميم الشبكة" : "Network Designing", path: "/services#network" }
  ];

  // Define quick links
  const quickLinks = [
    { name: isArabic ? "الرئيسية" : "Home", path: "/" },
    { name: isArabic ? "من نحن" : "About Us", path: "/about" },
    { name: isArabic ? "أعمالنا" : "Portfolio", path: "/portfolio" },
    { name: isArabic ? "اتصل بنا" : "Contact", path: "/contact" },
    { name: isArabic ? "المتجر" : "Shop", path: "/shop" },
    { name: isArabic ? "الأخبار" : "News", path: "/news" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-griffin-darkBlue text-white pt-16 pb-8" 
      style={{ direction: isArabic ? 'rtl' : 'ltr' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold font-montserrat mb-6 border-b border-griffin-teal pb-2">
              Griffin
            </h3>
            <p className="text-griffin-silver mb-4">
              {isArabic 
                ? "حلول تقنية متكاملة للشركات الطموحة. نقدم خدمات تكنولوجية متميزة لتعزيز أداء عملك."
                : "Integrated tech solutions for ambitious businesses. We provide outstanding technology services to enhance your business performance."
              }
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer-social">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com/griffin" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/griffin" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social">
                <Instagram size={20} />
              </a>
              <a href="https://tiktok.com/@griffin" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer-social">
                <Share2 size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold font-montserrat mb-6 border-b border-griffin-teal pb-2">
              {isArabic ? "خدماتنا" : "Our Services"}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.path}>
                  <Link to={service.path} className="footer-link">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold font-montserrat mb-6 border-b border-griffin-teal pb-2">
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold font-montserrat mb-6 border-b border-griffin-teal pb-2">
              {isArabic ? "اتصل بنا" : "Contact Us"}
            </h3>
            <div className="space-y-4">
              <p className="flex items-start">
                <span className="text-griffin-teal mr-2">Email:</span>
                <a href="mailto:info@griffin-tech.com" className="footer-link">
                  info@griffin-tech.com
                </a>
              </p>
              <p className="flex items-start">
                <span className="text-griffin-teal mr-2">Phone:</span>
                <a href="tel:+201234567890" className="footer-link">
                  +20 123 456 7890
                </a>
              </p>
              <p className="flex items-start">
                <span className="text-griffin-teal mr-2">{isArabic ? "العنوان:" : "Address:"}</span>
                <span className="text-griffin-silver">
                  {isArabic 
                    ? "القاهرة، مصر" 
                    : "Cairo, Egypt"
                  }
                </span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-griffin-silver">
          <p>
            © {currentYear} Griffin for Integrated Solutions. {isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
