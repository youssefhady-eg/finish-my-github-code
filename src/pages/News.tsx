
import { useOutletContext } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { newsItems } from "@/services/database";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type OutletContextType = {
  isArabic: boolean;
  setCartCount: (count: number) => void;
}

const News = () => {
  const { isArabic } = useOutletContext<OutletContextType>();

  return (
    <div>
      <PageHeader
        title={isArabic ? "الأخبار" : "News"}
        subtitle={isArabic ? "آخر الأخبار والتحديثات" : "Latest News and Updates"}
        isArabic={isArabic}
      />
      
      <Section isArabic={isArabic}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.imageSrc} 
                    alt={isArabic ? item.title_ar : item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                <CardHeader>
                  <CardTitle>{isArabic ? item.title_ar : item.title}</CardTitle>
                  <CardDescription>
                    {new Date(item.date).toLocaleDateString(
                      isArabic ? 'ar-EG' : 'en-US',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600">
                    {isArabic ? item.content_ar : item.content}
                  </p>
                </CardContent>
                
                <CardFooter>
                  <Link to={`/news/${item.slug}`}>
                    <Button variant="outline" className="flex items-center gap-2">
                      {isArabic ? "اقرأ المزيد" : "Read More"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default News;
