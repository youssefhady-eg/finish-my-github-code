
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "./ui/badge";

type NavbarProps = {
  isArabic?: boolean;
  cartCount?: number;
  onLanguageToggle?: () => void;
}

const Navbar = ({ isArabic = false, cartCount = 0, onLanguageToggle }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Define nav items
  const navItems = [
    { label: isArabic ? "الرئيسية" : "Home", path: "/" },
    { label: isArabic ? "خدمات" : "Services", path: "/services" },
    { label: isArabic ? "أعمالنا" : "Portfolio", path: "/portfolio" },
    { label: isArabic ? "من نحن" : "About", path: "/about" },
    { label: isArabic ? "اتصل بنا" : "Contact", path: "/contact" },
    { label: isArabic ? "المتجر" : "Shop", path: "/shop" },
    { label: isArabic ? "الأخبار" : "News", path: "/news" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-transparent py-5"
      }`}
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-griffin-darkBlue flex items-center justify-center animate-spin">
            <span className="text-white font-bold">G</span>
          </div>
          <span className="ml-2 text-griffin-darkBlue text-xl font-bold font-montserrat">
            Griffin
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center space-x-6 ${isArabic ? 'space-x-reverse' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="navbar-link"
            >
              {item.label}
            </Link>
          ))}
          
          <button 
            onClick={onLanguageToggle}
            className="px-3 py-1 border border-griffin-teal text-griffin-teal rounded hover:bg-griffin-teal hover:text-white transition-colors duration-200"
          >
            {isArabic ? "EN" : "AR"}
          </button>
          
          <Link to="/shop" className="relative">
            <ShoppingCart className="text-griffin-darkBlue hover:text-griffin-teal transition-colors" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-griffin-teal text-white">
                {cartCount}
              </Badge>
            )}
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex items-center md:hidden">
          <Link to="/shop" className="relative mr-4">
            <ShoppingCart className="text-griffin-darkBlue" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-griffin-teal text-white">
                {cartCount}
              </Badge>
            )}
          </Link>
          
          <button 
            onClick={toggleMenu}
            className="text-griffin-darkBlue focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 animate-fade-in">
          <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-xl text-griffin-darkBlue hover:text-griffin-teal transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <button 
              onClick={() => {
                onLanguageToggle?.();
                setIsMenuOpen(false);
              }}
              className="w-20 py-2 border border-griffin-teal text-griffin-teal rounded hover:bg-griffin-teal hover:text-white transition-colors duration-200"
            >
              {isArabic ? "English" : "العربية"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
