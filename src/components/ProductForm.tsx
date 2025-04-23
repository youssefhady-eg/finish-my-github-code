
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveProduct, ProductType } from "@/services/productManagement";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Save } from "lucide-react";

interface ProductFormProps {
  product?: ProductType | null;
  onClose: () => void;
  onSuccess: (action: string) => void;
  isArabic: boolean;
}

const ProductForm = ({ product, onClose, onSuccess, isArabic }: ProductFormProps) => {
  const isEditing = !!product;
  
  // Form validation schema
  const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, {
      message: isArabic ? "العنوان يجب أن يكون على الأقل حرفين" : "Title must be at least 2 characters",
    }),
    title_ar: z.string().min(2, {
      message: isArabic ? "العنوان العربي يجب أن يكون على الأقل حرفين" : "Arabic title must be at least 2 characters",
    }),
    description: z.string().min(10, {
      message: isArabic ? "الوصف يجب أن يكون على الأقل 10 أحرف" : "Description must be at least 10 characters",
    }),
    description_ar: z.string().min(10, {
      message: isArabic ? "الوصف العربي يجب أن يكون على الأقل 10 أحرف" : "Arabic description must be at least 10 characters",
    }),
    price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: isArabic ? "السعر يجب أن يكون رقمًا موجبًا" : "Price must be a positive number",
    }),
    imageSrc: z.string().url({
      message: isArabic ? "يرجى إدخال رابط صورة صالح" : "Please enter a valid image URL",
    }),
    features: z.string(),
    features_ar: z.string(),
    categoryId: z.string().optional(),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product?.id || '',
      title: product?.title || '',
      title_ar: product?.title_ar || '',
      description: product?.description || '',
      description_ar: product?.description_ar || '',
      price: product?.price?.toString() || '',
      imageSrc: product?.imageSrc || 'https://via.placeholder.com/300',
      features: product?.features?.join('\n') || '',
      features_ar: product?.features_ar?.join('\n') || '',
      categoryId: product?.categoryId || 'general',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Convert features from string to array
      const features = values.features.split('\n').filter(f => f.trim() !== '');
      const features_ar = values.features_ar.split('\n').filter(f => f.trim() !== '');
      
      // Create product object with required fields ensuring they're not optional
      const productData: ProductType = {
        id: values.id || `product_${Date.now()}`,
        title: values.title,
        title_ar: values.title_ar,
        description: values.description,
        description_ar: values.description_ar,
        price: parseFloat(values.price),
        imageSrc: values.imageSrc,
        features,
        features_ar,
        categoryId: values.categoryId || 'general',
        variants: [
          {
            id: 'default',
            name: 'Default',
            name_ar: 'افتراضي',
            price: parseFloat(values.price)
          }
        ],
        relatedProductIds: []
      };
      
      // Save the product
      await saveProduct(productData);
      
      // Notify parent of success
      onSuccess(isEditing ? 'edit' : 'add');
    } catch (error) {
      console.error("Error saving product:", error);
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? "عنوان المنتج" : "Product Title"}</FormLabel>
                    <FormControl>
                      <Input placeholder={isArabic ? "أدخل عنوان المنتج..." : "Enter product title..."} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="title_ar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? "العنوان بالعربية" : "Arabic Title"}</FormLabel>
                    <FormControl>
                      <Input placeholder={isArabic ? "أدخل العنوان بالعربية..." : "Enter Arabic title..."} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? "وصف المنتج" : "Description"}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={isArabic ? "أدخل وصف المنتج..." : "Enter product description..."} 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description_ar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? "الوصف بالعربية" : "Arabic Description"}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={isArabic ? "أدخل الوصف بالعربية..." : "Enter Arabic description..."} 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? "السعر" : "Price"}</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageSrc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? "رابط الصورة" : "Image URL"}</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? "مميزات المنتج" : "Features"}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={isArabic ? "أدخل كل ميزة في سطر منفصل..." : "Enter each feature on a new line..."} 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="features_ar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isArabic ? "المميزات بالعربية" : "Arabic Features"}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={isArabic ? "أدخل كل ميزة بالعربية في سطر منفصل..." : "Enter each Arabic feature on a new line..."} 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4 rtl:space-x-reverse">
              <Button type="button" variant="outline" onClick={onClose}>
                <X className="mr-2 h-4 w-4" />
                {isArabic ? "إلغاء" : "Cancel"}
              </Button>
              <Button type="submit" className="bg-griffin-teal hover:bg-griffin-darkBlue transition-colors">
                <Save className="mr-2 h-4 w-4" />
                {isEditing 
                  ? (isArabic ? "حفظ التغييرات" : "Save Changes") 
                  : (isArabic ? "إضافة المنتج" : "Add Product")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
