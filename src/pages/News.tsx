
import { useOutletContext } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { newsItems } from "@/services/database";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type OutletContextType = {
  isArabic: boolean;
  setCartCount: (count: number) => void;
}

const News = () => {
  const { isArabic } = useOutletContext<OutletContextType>();

  const handleShare = (platform: string, item: any) => {
    const url = window.location.origin + `/news/${item.slug}`;
    const text = isArabic ? item.title_ar : item.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct sharing URL, we'll copy the link instead
        navigator.clipboard.writeText(url);
        toast({
          title: isArabic ? "تم النسخ" : "Link Copied",
          description: isArabic ? "يمكنك الآن مشاركة الرابط على Instagram" : "You can now share the link on Instagram",
        });
        return;
      case 'tiktok':
        // TikTok doesn't have a direct sharing URL, we'll copy the link instead
        navigator.clipboard.writeText(url);
        toast({
          title: isArabic ? "تم النسخ" : "Link Copied",
          description: isArabic ? "يمكنك الآن مشاركة الرابط على TikTok" : "You can now share the link on TikTok",
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

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
                
                <CardFooter className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleShare('facebook', item)}
                      title={isArabic ? "مشاركة على Facebook" : "Share on Facebook"}
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleShare('instagram', item)}
                      title={isArabic ? "مشاركة على Instagram" : "Share on Instagram"}
                    >
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleShare('tiktok', item)}
                      title={isArabic ? "مشاركة على TikTok" : "Share on TikTok"}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
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
