
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CartDrawer from "@/components/CartDrawer";

interface NavbarProps {
  isArabic: boolean;
  cartCount: number;
  onLanguageToggle: () => void;
}

const Navbar = ({ isArabic, cartCount, onLanguageToggle }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const location = useLocation();

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  // Add the missing toggleMenu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", name_ar: "الرئيسية", path: "/" },
    { name: "Services", name_ar: "الخدمات", path: "/services" },
    { name: "Portfolio", name_ar: "المعرض", path: "/portfolio" },
    { name: "About", name_ar: "عن الشركة", path: "/about" },
    { name: "Shop", name_ar: "المتجر", path: "/shop" },
    { name: "News", name_ar: "الأخبار", path: "/news" },
    { name: "Contact", name_ar: "اتصل بنا", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className={`text-griffin-teal font-bold text-xl ${isArabic ? 'font-arabic text-2xl' : ''}`}>
              Griffin
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4" dir={isArabic ? 'rtl' : 'ltr'}>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                      ${isActivePage(item.path) 
                        ? 'bg-griffin-teal text-white' 
                        : 'text-gray-500 hover:bg-gray-200'}
                      ${isArabic ? 'font-arabic text-base mx-2' : ''}
                    `}
                  >
                    {isArabic ? item.name_ar : item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <Switch id="language-toggle" onCheckedChange={onLanguageToggle} />
            </div>
            <div className="mr-4 relative">
              <button
                className="text-gray-500 hover:text-gray-700 relative"
                onClick={() => setCartDrawerOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
                    {cartCount}
                  </span>
                )}
              </button>
              <CartDrawer
                open={cartDrawerOpen}
                onOpenChange={setCartDrawerOpen}
                onCartUpdate={() => {}} // Not needed, parent (Layout) handles cartCount
              />
            </div>
            <div className="-mr-2 flex md:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" onClick={toggleMenu}>
                    {isArabic ? "القائمة" : "Menu"}
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="text-left">
                  <DrawerHeader>
                    <DrawerTitle>Griffin</DrawerTitle>
                    <DrawerDescription>
                      {isArabic
                        ? "تصفح موقعنا"
                        : "Navigate our website"}
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="py-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-2 text-gray-500 hover:bg-gray-200 rounded-md text-sm font-medium"
                      >
                        {isArabic ? item.name_ar : item.name}
                      </Link>
                    ))}
                  </div>
                  <DrawerFooter>
                    <DrawerClose>
                      <Button variant="outline">{isArabic ? "إغلاق" : "Close"}</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
