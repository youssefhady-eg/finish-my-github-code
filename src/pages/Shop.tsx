
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getCartCount, addToCart } from "@/services/cart";
import { Product, products } from "@/services/database";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Check, ChevronRight } from "lucide-react";

const Shop = () => {
  const { isArabic, setCartCount } = useOutletContext<{ 
    isArabic: boolean;
    setCartCount: React.Dispatch<React.SetStateAction<number>>;
  }>();
  
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Update cart count on page load
  useEffect(() => {
    const count = getCartCount();
    setCartCount(count);
  }, [setCartCount]);

  // Handle variant selection
  const handleVariantChange = (productId: string, variantId: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variantId
    }));
  };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    const variantId = selectedVariants[product.id] || product.variants[0].id;
    const variant = product.variants.find(v => v.id === variantId);
    
    if (!variant) return;
    
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
  };

  // Get related products
  const getRelatedProducts = (product: Product) => {
    return product.relatedProductIds
      .map(id => products.find(p => p.id === id))
      .filter(Boolean) as Product[];
  };

  return (
    <>
      <PageHeader
        title={isArabic ? "المتجر" : "Shop"}
        subtitle={isArabic ? "حلول تقنية متخصصة لعملك" : "Specialized Tech Solutions for Your Business"}
        isArabic={isArabic}
      />
      
      <Section isArabic={isArabic}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
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
                  {/* Variant Selection */}
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
                        {product.variants.map((variant) => (
                          <SelectItem key={variant.id} value={variant.id}>
                            {isArabic ? variant.name_ar : variant.name} - ${variant.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Features */}
                  <div>
                    <h4 className="font-medium mb-2">
                      {isArabic ? "المميزات" : "Features"}
                    </h4>
                    <ul className="space-y-1">
                      {(isArabic ? product.features_ar : product.features).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-griffin-teal mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 border-t pt-4">
                {/* Price */}
                <div className="flex justify-between items-center w-full">
                  <span className="text-lg font-bold">
                    ${(product.variants.find(v => v.id === (selectedVariants[product.id] || product.variants[0].id)) || product.variants[0]).price}
                  </span>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-griffin-teal hover:bg-griffin-darkBlue transition-colors"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isArabic ? "أضف إلى السلة" : "Add to Cart"}
                  </Button>
                </div>
                
                {/* Related Products */}
                {getRelatedProducts(product).length > 0 && (
                  <div className="w-full">
                    <h4 className="text-sm font-medium mb-2">
                      {isArabic ? "منتجات ذات صلة" : "Related Products"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {getRelatedProducts(product).map((relatedProduct) => (
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
