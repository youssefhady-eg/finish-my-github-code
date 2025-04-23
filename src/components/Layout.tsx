
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isArabic, setIsArabic] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

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
