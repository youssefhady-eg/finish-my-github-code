
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type OutletContextType = {
  isArabic: boolean;
};

const ProductManagement = () => {
  const { isArabic } = useOutletContext<OutletContextType>();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const { toast } = useToast();
  
  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };
  
  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };
  
  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };
  
  const handleFormSuccess = (action: string) => {
    setShowForm(false);
    setEditingProduct(null);
    
    toast({
      title: action === 'add' 
        ? (isArabic ? "تمت إضافة المنتج" : "Product Added") 
        : (isArabic ? "تم تحديث المنتج" : "Product Updated"),
      description: isArabic 
        ? "تم حفظ التغييرات بنجاح" 
        : "Changes saved successfully",
    });
  };

  return (
    <>
      <PageHeader
        title={isArabic ? "إدارة المنتجات" : "Product Management"}
        subtitle={isArabic ? "إضافة وتعديل منتجات المتجر" : "Add and edit shop products"}
        isArabic={isArabic}
      />
      
      <Section isArabic={isArabic}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isArabic ? "المنتجات" : "Products"}
          </h2>
          
          <Button 
            onClick={handleAddNew}
            className="bg-griffin-teal hover:bg-griffin-darkBlue transition-colors"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {isArabic ? "إضافة منتج جديد" : "Add New Product"}
          </Button>
        </div>
        
        {showForm ? (
          <ProductForm 
            product={editingProduct} 
            onClose={handleFormClose} 
            onSuccess={handleFormSuccess}
            isArabic={isArabic}
          />
        ) : (
          <ProductList 
            onEdit={handleEdit} 
            isArabic={isArabic} 
          />
        )}
      </Section>
    </>
  );
};

export default ProductManagement;
