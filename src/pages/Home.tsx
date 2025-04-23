
import { useState, useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Section from "@/components/Section";
import { Progress } from "@/components/ui/progress";
import { 
  services, 
  testimonials, 
  portfolioItems 
} from "@/services/database";

type OutletContextType = {
  isArabic: boolean;
  setCartCount: (count: number) => void;
}

const Home = () => {
  const { isArabic } = useOutletContext<OutletContextType>();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [countersVisible, setCountersVisible] = useState(false);
  const countersRef = useRef<HTMLDivElement>(null);
  
  // Counter values 
  const counterFinalValues = {
    clients: 50,
    uptime: 99,
    years: 10,
    countries: 5
  };
  
  const [counterValues, setCounterValues] = useState({
    clients: 0,
    uptime: 0,
    years: 0,
    countries: 0
  });
  
  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((current) => 
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Counters animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setCountersVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (countersRef.current) {
      observer.observe(countersRef.current);
    }
    
    return () => {
      if (countersRef.current) {
        observer.unobserve(countersRef.current);
      }
    };
  }, []);
  
  // Animate counters when visible
  useEffect(() => {
    if (!countersVisible) return;
    
    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    
    const timer = setInterval(() => {
      setCounterValues((current) => {
        const newValues = { ...current };
        let completed = true;
        
        for (const key in counterFinalValues) {
          const typedKey = key as keyof typeof counterFinalValues;
          const increment = counterFinalValues[typedKey] / steps;
          const newValue = current[typedKey] + increment;
          
          if (newValue < counterFinalValues[typedKey]) {
            newValues[typedKey] = Math.round(newValue * 10) / 10;
            completed = false;
          } else {
            newValues[typedKey] = counterFinalValues[typedKey];
          }
        }
        
        if (completed) {
          clearInterval(timer);
        }
        
        return newValues;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, [countersVisible]);
  
  // Get featured case study
  const featuredCaseStudy = portfolioItems[0];
  
  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center bg-griffin-darkBlue overflow-hidden">
        {/* Video Background (placeholder with overlay) */}
        <div className="absolute inset-0 bg-black opacity-70">
          <div className="w-full h-full bg-griffin-darkBlue opacity-70 overflow-hidden">
            {/* Particles effect using pseudo-elements and animations */}
            <div className="absolute inset-0 opacity-20">
              {Array(20).fill(0).map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-white animate-float"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 10 + 2}px`,
                    height: `${Math.random() * 10 + 2}px`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 10 + 10}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Hero Content */}
        <div 
          className="container mx-auto px-4 z-10"
          style={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          <div className="max-w-3xl mx-auto text-center">
            {/* Logo */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white flex items-center justify-center animate-spin">
              <span className="text-griffin-darkBlue text-3xl font-bold">G</span>
            </div>
            
            {/* Company Name with Typing Effect */}
            <div className="mx-auto mb-8 overflow-hidden">
              <h2 className="text-xl text-griffin-teal font-fira typing-animation inline-block">
                {isArabic 
                  ? "جريفين للحلول المتكاملة" 
                  : "Griffin for Integrated Solutions"
                }
              </h2>
            </div>
            
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold font-montserrat mb-6">
              {isArabic 
                ? "قم بتشغيل عملك بتقنية الجيل القادم" 
                : "Power Your Business with Next-Gen Tech"
              }
            </h1>
            
            {/* Shop Now Button */}
            <Link
              to="/shop"
              className="btn-primary inline-block animate-scale"
            >
              {isArabic ? "تسوق الآن" : "Shop Now"}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Teaser - AMIT Learning Case Study */}
      <Section
        className="bg-white py-24"
        isArabic={isArabic}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-griffin-darkBlue mb-12 text-center">
            {isArabic ? "قصة نجاح" : "Success Story"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-griffin-darkBlue mb-3">
                {isArabic ? featuredCaseStudy.title_ar : featuredCaseStudy.title}
              </h3>
              
              <div className="mb-6">
                <p className="text-lg font-fira text-griffin-teal mb-2">
                  {isArabic ? "التحدي:" : "Challenge:"}
                </p>
                <p className="text-gray-600 mb-4">
                  {isArabic ? featuredCaseStudy.challenge_ar : featuredCaseStudy.challenge}
                </p>
                
                <p className="text-lg font-fira text-griffin-teal mb-2">
                  {isArabic ? "الحل:" : "Solution:"}
                </p>
                <p className="text-gray-600 mb-4">
                  {isArabic ? featuredCaseStudy.solution_ar : featuredCaseStudy.solution}
                </p>
                
                <p className="text-lg font-fira text-griffin-teal mb-2">
                  {isArabic ? "النتيجة:" : "Result:"}
                </p>
                <p className="text-gray-600">
                  {isArabic ? featuredCaseStudy.result_ar : featuredCaseStudy.result}
                </p>
              </div>
              
              <Link to="/portfolio" className="btn-secondary inline-block">
                {isArabic ? "عرض الأعمال" : "View Portfolio"}
              </Link>
            </div>
            
            <div className="order-1 md:order-2">
              <img 
                src={featuredCaseStudy.imageSrc} 
                alt={isArabic ? featuredCaseStudy.title_ar : featuredCaseStudy.title}
                className="rounded-lg shadow-lg w-full h-auto transform hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </Section>
      
      {/* Services Preview */}
      <Section
        title={isArabic ? "خدماتنا" : "Our Services"}
        subtitle={isArabic ? "حلول متكاملة لاحتياجات عملك" : "Integrated Solutions for Your Business Needs"}
        className="bg-griffin-lightGray"
        isArabic={isArabic}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service) => (
            <div key={service.id} className="service-card animate-fade-in">
              <div className="flex justify-center mb-4">
                <img 
                  src={service.imageSrc} 
                  alt={isArabic ? service.title_ar : service.title}
                  className="h-16 w-16 object-contain"
                />
              </div>
              
              <h3 className="text-xl font-bold text-griffin-darkBlue mb-3 text-center">
                {isArabic ? service.title_ar : service.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-6 text-center">
                {isArabic ? service.description_ar : service.description}
              </p>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2 text-sm">
                  <span>{isArabic ? "الموثوقية" : "Reliability"}</span>
                  <span>{service.reliabilityPercent}%</span>
                </div>
                <Progress value={service.reliabilityPercent} className="h-2 bg-gray-200" />
              </div>
              
              <div className="text-center">
                <Link 
                  to={`/services#${service.slug}`}
                  className="text-griffin-teal hover:text-griffin-darkBlue transition-colors"
                >
                  {isArabic ? "اعرف المزيد →" : "Learn More →"}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/services" className="btn-secondary">
            {isArabic ? "جميع الخدمات" : "All Services"}
          </Link>
        </div>
      </Section>
      
      {/* Testimonials */}
      <Section
        title={isArabic ? "ما يقوله عملاؤنا" : "What Our Clients Say"}
        className="bg-white"
        isArabic={isArabic}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === currentTestimonial ? 'opacity-100' : 'absolute opacity-0'
                }`}
                style={{ zIndex: index === currentTestimonial ? 10 : 0 }}
              >
                <div className="relative mb-8">
                  <div className="text-6xl text-griffin-teal opacity-20 absolute -top-8 left-0">"</div>
                  <p className="text-xl mb-6 text-gray-700 relative z-10 px-8">
                    {isArabic ? testimonial.quote_ar : testimonial.quote}
                  </p>
                  <div className="text-6xl text-griffin-teal opacity-20 absolute bottom-0 right-0">"</div>
                </div>
                
                <div className="flex items-center justify-center">
                  <img 
                    src={testimonial.imageSrc} 
                    alt={isArabic ? testimonial.author_ar : testimonial.author} 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-griffin-darkBlue">
                      {isArabic ? testimonial.author_ar : testimonial.author}
                    </h4>
                    <p className="text-sm text-griffin-teal">
                      {isArabic ? testimonial.company_ar : testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    index === currentTestimonial ? 'bg-griffin-teal' : 'bg-gray-300'
                  }`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>
      
      {/* Stats Counter */}
      <div 
        ref={countersRef}
        className="bg-griffin-darkBlue text-white py-20"
      >
        <div 
          className="container mx-auto px-4"
          style={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-griffin-teal mb-2">
                {counterValues.clients}+
              </div>
              <p className="text-gray-300">
                {isArabic ? "عميل" : "Clients"}
              </p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-griffin-teal mb-2">
                {counterValues.uptime}%
              </div>
              <p className="text-gray-300">
                {isArabic ? "وقت التشغيل" : "Uptime"}
              </p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-griffin-teal mb-2">
                {counterValues.years}+
              </div>
              <p className="text-gray-300">
                {isArabic ? "سنوات" : "Years"}
              </p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-griffin-teal mb-2">
                {counterValues.countries}
              </div>
              <p className="text-gray-300">
                {isArabic ? "دول" : "Countries"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <Section className="bg-griffin-lightGray" isArabic={isArabic}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-griffin-darkBlue mb-4">
            {isArabic 
              ? "جاهز لتحويل عملك؟" 
              : "Ready to Transform Your Business?"
            }
          </h2>
          
          <p className="text-gray-600 mb-8">
            {isArabic 
              ? "تواصل معنا اليوم واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك التكنولوجية." 
              : "Connect with us today and discover how we can help you achieve your technology goals."
            }
          </p>
          
          <div className="space-x-4">
            <Link to="/contact" className="btn-primary">
              {isArabic ? "اتصل بنا" : "Contact Us"}
            </Link>
            <Link to="/services" className="btn-secondary">
              {isArabic ? "استكشف الخدمات" : "Explore Services"}
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;
