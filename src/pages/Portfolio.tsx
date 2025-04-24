import { useOutletContext } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { portfolioItems } from "@/services/database";

type OutletContextType = {
  isArabic: boolean;
  setCartCount: (count: number) => void;
}

const Portfolio = () => {
  const { isArabic } = useOutletContext<OutletContextType>();
  const caseStudy = portfolioItems[0];

  return (
    <div>
      <PageHeader
        title={isArabic ? "سجل أعمالنا" : "Our Portfolio"}
        subtitle={isArabic ? "قصص نجاح مع عملائنا" : "Success Stories with Our Clients"}
        isArabic={isArabic}
      />
      
      <Section isArabic={isArabic}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl text-griffin-darkBlue font-bold mb-8 ${
            isArabic ? 'text-right text-4xl' : ''
          }`}>
            {isArabic ? caseStudy.title_ar : caseStudy.title}
          </h2>
          
          <div className="mb-12">
            <img 
              src={caseStudy.imageSrc} 
              alt={isArabic ? caseStudy.title_ar : caseStudy.title}
              className="w-full h-auto rounded-lg shadow-lg mb-8"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className={`bg-white p-6 rounded-lg shadow-md transform hover:scale-[1.02] transition-transform duration-300 ${
              isArabic ? 'text-right' : ''
            }`}>
              <h3 className={`text-xl font-bold text-griffin-darkBlue mb-4 ${
                isArabic ? 'text-2xl' : ''
              }`}>
                {isArabic ? "التحدي" : "Challenge"}
              </h3>
              <p className={`text-gray-700 ${
                isArabic ? 'text-lg leading-relaxed' : ''
              }`}>
                {isArabic ? caseStudy.challenge_ar : caseStudy.challenge}
              </p>
            </div>
            
            <div className={`bg-white p-6 rounded-lg shadow-md transform hover:scale-[1.02] transition-transform duration-300 ${
              isArabic ? 'text-right' : ''
            }`}>
              <h3 className={`text-xl font-bold text-griffin-teal mb-4 ${
                isArabic ? 'text-2xl' : ''
              }`}>
                {isArabic ? "الحل" : "Solution"}
              </h3>
              <p className={`text-gray-700 ${
                isArabic ? 'text-lg leading-relaxed' : ''
              }`}>
                {isArabic ? caseStudy.solution_ar : caseStudy.solution}
              </p>
            </div>
            
            <div className={`bg-white p-6 rounded-lg shadow-md transform hover:scale-[1.02] transition-transform duration-300 ${
              isArabic ? 'text-right' : ''
            }`}>
              <h3 className={`text-xl font-bold text-griffin-darkBlue mb-4 ${
                isArabic ? 'text-2xl' : ''
              }`}>
                {isArabic ? "النتيجة" : "Result"}
              </h3>
              <p className={`text-gray-700 ${
                isArabic ? 'text-lg leading-relaxed' : ''
              }`}>
                {isArabic ? caseStudy.result_ar : caseStudy.result}
              </p>
            </div>
          </div>
          
          <div className="relative py-12">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-griffin-teal"></div>
            
            <div className="relative z-10">
              <div className={`flex items-center mb-12 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`w-1/2 ${isArabic ? 'pr-8 text-right' : 'pr-8 text-right'}`}>
                  <h4 className={`font-bold text-griffin-darkBlue ${isArabic ? 'text-xl mb-2' : ''}`}>
                    {isArabic ? "تقييم الاحتياجات" : "Needs Assessment"}
                  </h4>
                  <p className={`${isArabic ? 'text-base leading-relaxed' : 'text-sm'} text-gray-600`}>
                    {isArabic 
                      ? "تحليل الأنظمة الحالية وتحديد متطلبات العمل"
                      : "Analyzing existing systems and identifying business requirements"
                    }
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-griffin-teal rounded-full">
                  <div className="w-10 h-10 bg-griffin-teal bg-opacity-20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                </div>
                <div className={`w-1/2 ${isArabic ? 'pl-8 text-left' : 'pl-8'}`}>
                  <div className={`text-griffin-teal ${isArabic ? 'text-lg' : 'text-sm'}`}>
                    {isArabic ? "VoIP: ٩٩.٩٪ وقت التشغيل" : "VoIP: 99.9% uptime"}
                  </div>
                </div>
              </div>
              
              <div className={`flex items-center mb-12 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`w-1/2 ${isArabic ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                  <div className={`text-griffin-teal ${isArabic ? 'text-lg' : 'text-sm'}`}>
                    {isArabic ? "IVR: توجيه الاتصال الذكي" : "IVR: Intelligent Call Routing"}
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-griffin-teal rounded-full">
                  <div className="w-10 h-10 bg-griffin-teal bg-opacity-20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                </div>
                <div className={`w-1/2 ${isArabic ? 'pr-8 text-right' : 'pl-8'}`}>
                  <h4 className={`font-bold text-griffin-darkBlue ${isArabic ? 'text-xl mb-2' : ''}`}>
                    {isArabic ? "التنفيذ" : "Implementation"}
                  </h4>
                  <p className={`${isArabic ? 'text-base leading-relaxed' : 'text-sm'} text-gray-600`}>
                    {isArabic ? "تكامل الأنظمة وتدريب الموظفين" : "System integration and staff training"}
                  </p>
                </div>
              </div>
              
              <div className={`flex items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className={`w-1/2 ${isArabic ? 'pr-8 text-right' : 'pr-8 text-right'}`}>
                  <h4 className={`font-bold text-griffin-darkBlue ${isArabic ? 'text-xl mb-2' : ''}`}>
                    {isArabic ? "القياس والتحسين" : "Measurement & Optimization"}
                  </h4>
                  <p className={`${isArabic ? 'text-base leading-relaxed' : 'text-sm'} text-gray-600`}>
                    {isArabic ? "تحليل البيانات وتحسين العمليات" : "Data analysis and process improvement"}
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-griffin-teal rounded-full">
                  <div className="w-10 h-10 bg-griffin-teal bg-opacity-20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                </div>
                <div className={`w-1/2 ${isArabic ? 'pl-8 text-left' : 'pl-8'}`}>
                  <div className={`text-griffin-teal ${isArabic ? 'text-lg' : 'text-sm'}`}>
                    {isArabic ? "الأداء: تحسين بنسبة ٤٠٪" : "Performance: 40% improvement"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Portfolio;
