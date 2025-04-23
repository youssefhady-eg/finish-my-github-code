
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import { getCartCount } from "@/services/cart";

const Layout = () => {
  const [isArabic, setIsArabic] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };
  
  // Initialize cart count on load
  useEffect(() => {
    setCartCount(getCartCount());
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-griffin-lightGray">
      <Navbar 
        isArabic={isArabic} 
        cartCount={cartCount} 
        onLanguageToggle={toggleLanguage} 
      />
      
      <main className="flex-grow">
        <Outlet context={{ isArabic, setCartCount }} />
      </main>
      
      <Footer isArabic={isArabic} />
    </div>
  );
};

export default Layout;
