import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getCartCount, addToCart } from "@/services/cart";
import { addToWooCart } from "@/services/woocommerce";
import { useWooProducts } from "@/hooks/useWooProducts";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Check, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Shop = () => {
  const { isArabic, setCartCount } = useOutletContext<{ 
    isArabic: boolean;
    setCartCount: React.Dispatch<React.SetStateAction<number>>;
  }>();
  
  const { data: products, isLoading, error } = useWooProducts();
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    const count = getCartCount();
    setCartCount(count);
  }, [setCartCount]);

  const handleVariantChange = (productId: string, variantId: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variantId
    }));
  };

  const handleAddToCart = async (product: any) => {
    try {
      const variantId = selectedVariants[product.id] || product.variants[0].id;
      const variant = product.variants.find((v: any) => v.id === variantId);
      
      if (!variant) return;
      
      const cartItem = await addToWooCart(product.id, variant.id);
      addToCart(product, variant);
      
      const newCartCount = getCartCount();
      setCartCount(newCartCount);
      
      toast({
        title: isArabic ? "تمت الإضافة إلى سلة التسوق" : "Added to cart",
        description: isArabic ? `${product.title_ar} - ${variant.name_ar}` : `${product.title} - ${variant.name}`,
        action: (
          <Button variant="outline" size="sm" className="gap-1">
            <ShoppingCart className="h-4 w-4" />
            {isArabic ? "عرض السلة" : "View Cart"}
          </Button>
        ),
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        variant: "destructive",
        title: isArabic ? "خطأ" : "Error",
        description: isArabic 
          ? "حدث خطأ أثناء إضافة المنتج إلى سلة التسوق"
          : "An error occurred while adding the product to your cart",
      });
    }
  };

  const getRelatedProducts = (product: any) => {
    if (!product || !product.relatedProductIds || !products) return [];
    return product.relatedProductIds
      .map((id: string) => products.find((p: any) => p.id === id))
      .filter(Boolean);
  };

  if (isLoading) {
    return (
      <>
        <PageHeader
          title={isArabic ? "المتجر" : "Shop"}
          subtitle={isArabic ? "حلول تقنية متخصصة لعملك" : "Specialized Tech Solutions for Your Business"}
          isArabic={isArabic}
        />
        
        <Section isArabic={isArabic}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="flex flex-col h-full">
                <CardHeader>
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <div>
                      <Skeleton className="h-4 w-1/4 mb-2" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-4 border-t pt-4">
                  <div className="flex justify-between items-center w-full">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Section>
      </>
    );
  }

  if (error || !products) {
    return (
      <>
        <PageHeader
          title={isArabic ? "المتجر" : "Shop"}
          subtitle={isArabic ? "حلول تقنية متخصصة لعملك" : "Specialized Tech Solutions for Your Business"}
          isArabic={isArabic}
        />
        
        <Section isArabic={isArabic}>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              {isArabic ? "عذراً، حدث خطأ" : "Sorry, an error occurred"}
            </h2>
            <p className="mb-6">
              {isArabic 
                ? "لم نتمكن من تحميل المنتجات من متجر ووردبريس. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى."
                : "We couldn't load products from your WordPress store. Please check your internet connection and try again."}
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-griffin-teal hover:bg-griffin-darkBlue transition-colors"
            >
              {isArabic ? "إعادة تحميل" : "Reload"}
            </Button>
            
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 max-w-lg mx-auto">
              <p className="font-medium mb-2">
                {isArabic ? "معلومات لمسؤول الموقع:" : "Information for site admin:"}
              </p>
              <ul className="list-disc list-inside space-y-1 text-left">
                <li>{isArabic ? "تأكد من أن موقع ووردبريس متصل بالإنترنت" : "Make sure your WordPress site is online"}</li>
                <li>{isArabic ? "تحقق من تكوين REST API في ووردبريس" : "Check your WooCommerce REST API configuration"}</li>
                <li>{isArabic ? "تأكد من أن مفاتيح API صحيحة" : "Ensure your API keys are correct"}</li>
                <li>{isArabic ? "تحقق من إعدادات CORS على خادم ووردبريس" : "Check CORS settings on your WordPress server"}</li>
              </ul>
            </div>
          </div>
        </Section>
      </>
    );
  }

  if (!products || products.length === 0) {
    return (
      <>
        <PageHeader
          title={isArabic ? "المتجر" : "Shop"}
          subtitle={isArabic ? "حلول تقنية متخصصة لعملك" : "Specialized Tech Solutions for Your Business"}
          isArabic={isArabic}
        />
        
        <Section isArabic={isArabic}>
          <div className="text-center py-12">
            <h2 className="text-xl font-bold mb-4">
              {isArabic ? "لا توجد منتجات متاحة حالياً" : "No products available yet"}
            </h2>
            <p className="mb-6 max-w-lg mx-auto">
              {isArabic 
                ? "لم يتم إضافة أي منتجات إلى متجر ووردبريس الخاص بك بعد. قم بإضافة بعض المنتجات من لوحة تحكم ووردبريس."
                : "No products have been added to your WordPress store yet. Add some products from your WordPress dashboard."}
            </p>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={isArabic ? "المتجر" : "Shop"}
        subtitle={isArabic ? "حلول تقنية متخصصة لعملك" : "Specialized Tech Solutions for Your Business"}
        isArabic={isArabic}
      />
      
      <Section isArabic={isArabic}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <Card key={product.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300" id={`product-${product.id}`}>
              <CardHeader>
                <div className="h-48 rounded-md overflow-hidden mb-4">
                  <img 
                    src={product.imageSrc} 
                    alt={isArabic ? product.title_ar : product.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle>{isArabic ? product.title_ar : product.title}</CardTitle>
                <CardDescription>
                  {isArabic ? product.description_ar : product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  {product.variants && product.variants.length > 1 && (
                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        {isArabic ? "الخيارات" : "Options"}
                      </label>
                      <Select 
                        value={selectedVariants[product.id] || product.variants[0].id}
                        onValueChange={(value) => handleVariantChange(product.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={isArabic ? "اختر نوع المنتج" : "Select variant"} />
                        </SelectTrigger>
                        <SelectContent>
                          {product.variants.map((variant: any) => (
                            <SelectItem key={variant.id} value={variant.id}>
                              {isArabic ? variant.name_ar : variant.name} - ${variant.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {product.features && product.features.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">
                        {isArabic ? "المميزات" : "Features"}
                      </h4>
                      <ul className="space-y-1">
                        {(isArabic && product.features_ar && product.features_ar.length > 0 
                          ? product.features_ar 
                          : product.features
                        ).map((feature: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-griffin-teal mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 border-t pt-4">
                <div className="flex justify-between items-center w-full">
                  <span className="text-lg font-bold">
                    ${(product.variants.find((v: any) => v.id === (selectedVariants[product.id] || product.variants[0].id)) || product.variants[0]).price}
                  </span>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-griffin-teal hover:bg-griffin-darkBlue transition-colors"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isArabic ? "أضف إلى السلة" : "Add to Cart"}
                  </Button>
                </div>
                
                {getRelatedProducts(product).length > 0 && (
                  <div className="w-full">
                    <h4 className="text-sm font-medium mb-2">
                      {isArabic ? "منتجات ذات صلة" : "Related Products"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {getRelatedProducts(product).map((relatedProduct: any) => (
                        <Badge 
                          key={relatedProduct.id} 
                          variant="outline"
                          className="flex items-center cursor-pointer hover:bg-griffin-teal hover:text-white transition-colors"
                          onClick={() => {
                            const element = document.getElementById(`product-${relatedProduct.id}`);
                            element?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {isArabic ? relatedProduct.title_ar : relatedProduct.title}
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Shop;
