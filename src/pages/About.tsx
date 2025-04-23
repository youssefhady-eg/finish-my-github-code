
import { useOutletContext } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { teamMembers, timelineEvents } from "@/services/database";

type OutletContextType = {
  isArabic: boolean;
  setCartCount: (count: number) => void;
}

const About = () => {
  const { isArabic } = useOutletContext<OutletContextType>();

  return (
    <div>
      <PageHeader
        title={isArabic ? "من نحن" : "About Us"}
        subtitle={isArabic ? "تعرف على جريفين للحلول المتكاملة" : "Learn About Griffin for Integrated Solutions"}
        isArabic={isArabic}
      />
      
      {/* Company Story */}
      <Section isArabic={isArabic}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-griffin-darkBlue mb-6 text-center">
            {isArabic ? "قصتنا" : "Our Story"}
          </h2>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <p className="text-lg text-gray-700 mb-4">
              {isArabic 
                ? "تعد Griffin رائدة في مجال الحلول التقنية الآمنة والمبتكرة، بدءًا من شبكات VPN وصولاً إلى مراكز الاتصال، للشركات العالمية."
                : "Griffin pioneers secure, innovative tech solutions, from VPNs to call centers, for global businesses."
              }
            </p>
            <p className="text-gray-700">
              {isArabic 
                ? "نحن نركز على تقديم حلول مخصصة تلبي الاحتياجات الفريدة لكل عميل، مع التركيز على الجودة والموثوقية والأداء المتميز."
                : "We focus on delivering customized solutions that meet the unique needs of each client, with an emphasis on quality, reliability, and exceptional performance."
              }
            </p>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-griffin-darkBlue mb-8 text-center">
            {isArabic ? "رحلتنا" : "Our Journey"}
          </h2>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-1 bg-griffin-teal transform md:-translate-x-1/2"></div>
            
            {/* Timeline Events */}
            {timelineEvents.map((event, index) => (
              <div 
                key={event.id}
                className={`relative flex flex-col md:flex-row items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Year Bubble */}
                <div className="absolute left-0 md:left-1/2 w-12 h-12 bg-griffin-darkBlue rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-10">
                  <span className="text-white font-bold">{event.year}</span>
                </div>
                
                {/* Content */}
                <div className={`bg-white p-6 rounded-lg shadow-md ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8 md:ml-auto' : 'md:ml-8'
                } w-full md:w-5/12 animate-fade-in`}>
                  <h3 className="text-xl font-bold text-griffin-teal mb-2">
                    {isArabic ? event.title_ar : event.title}
                  </h3>
                  <p className="text-gray-600">
                    {isArabic ? event.description_ar : event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team Section */}
        <h2 className="text-3xl font-bold text-griffin-darkBlue mb-8 text-center">
          {isArabic ? "فريقنا" : "Our Team"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:rotate-1 hover:scale-105"
            >
              <img 
                src={member.imageSrc} 
                alt={isArabic ? member.name_ar : member.name} 
                className="w-full h-64 object-cover"
              />
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-griffin-darkBlue mb-1">
                  {isArabic ? member.name_ar : member.name}
                </h3>
                
                <p className="text-griffin-teal font-fira mb-4">
                  {isArabic ? member.role_ar : member.role}
                </p>
                
                <p className="text-gray-600">
                  {isArabic ? member.bio_ar : member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default About;
