
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

type OutletContextType = {
  isArabic: boolean;
  setCartCount: (count: number) => void;
}

const Contact = () => {
  const { isArabic } = useOutletContext<OutletContextType>();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: isArabic ? "تم إرسال رسالتك" : "Message Sent",
        description: isArabic 
          ? "شكرًا للتواصل معنا. سنرد عليك قريبًا." 
          : "Thank you for contacting us. We'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <PageHeader
        title={isArabic ? "اتصل بنا" : "Contact Us"}
        subtitle={isArabic ? "نحن هنا للإجابة على أسئلتك" : "We're Here to Answer Your Questions"}
        isArabic={isArabic}
      />
      
      <Section isArabic={isArabic}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-griffin-darkBlue mb-6">
                {isArabic ? "أرسل لنا رسالة" : "Send Us a Message"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    {isArabic ? "الاسم" : "Name"}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {isArabic ? "البريد الإلكتروني" : "Email"}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    {isArabic ? "رقم الهاتف" : "Phone"}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {isArabic ? "الرسالة" : "Message"}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full h-32"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-griffin-teal hover:bg-griffin-darkBlue transition-colors"
                >
                  {isSubmitting 
                    ? (isArabic ? "جاري الإرسال..." : "Sending...") 
                    : (isArabic ? "إرسال الرسالة" : "Send Message")
                  }
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-griffin-darkBlue mb-6">
                {isArabic ? "معلومات الاتصال" : "Contact Information"}
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-griffin-teal p-2 rounded-full">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-griffin-darkBlue">
                      {isArabic ? "البريد الإلكتروني" : "Email"}
                    </h3>
                    <a href="mailto:info@griffin-tech.com" className="text-griffin-teal hover:underline">
                      info@griffin-tech.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-griffin-teal p-2 rounded-full">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-griffin-darkBlue">
                      {isArabic ? "الهاتف" : "Phone"}
                    </h3>
                    <a href="tel:+201234567890" className="text-griffin-teal hover:underline">
                      +20 123 456 7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-griffin-teal p-2 rounded-full">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-griffin-darkBlue">
                      {isArabic ? "العنوان" : "Address"}
                    </h3>
                    <p className="text-gray-600">
                      {isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="mt-8 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">
                  {isArabic ? "خريطة الموقع" : "Map Location"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
