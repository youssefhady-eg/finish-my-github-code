
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

  useEffect(() => {
    setCartCount(getCartCount());
    // Listen to localStorage for cart changes (sync across tabs)
    const syncCart = () => setCartCount(getCartCount());
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
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

