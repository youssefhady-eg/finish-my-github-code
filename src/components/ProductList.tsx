
import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "@/services/productManagement";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProductListProps {
  onEdit: (product: any) => void;
  isArabic: boolean;
}

const ProductList = ({ onEdit, isArabic }: ProductListProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const loadedProducts = await getProducts();
      setProducts(loadedProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      await loadProducts();
      
      toast({
        title: isArabic ? "تم حذف المنتج" : "Product Deleted",
        description: isArabic 
          ? "تم حذف المنتج بنجاح" 
          : "Product has been successfully removed",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      
      toast({
        variant: "destructive",
        title: isArabic ? "خطأ" : "Error",
        description: isArabic 
          ? "حدث خطأ أثناء حذف المنتج" 
          : "An error occurred while deleting the product",
      });
    }
    
    setDeleteProductId(null);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p>{isArabic ? "جاري تحميل المنتجات..." : "Loading products..."}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-lg border">
        <p className="text-lg text-slate-600">
          {isArabic 
            ? "لا توجد منتجات. أضف منتجًا جديدًا للبدء." 
            : "No products found. Add a new product to get started."}
        </p>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              {isArabic ? "الصورة" : "Image"}
            </TableHead>
            <TableHead>{isArabic ? "الاسم" : "Name"}</TableHead>
            <TableHead>{isArabic ? "السعر" : "Price"}</TableHead>
            <TableHead className="text-right">{isArabic ? "الإجراءات" : "Actions"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="h-12 w-12 rounded-md overflow-hidden">
                  <img 
                    src={product.imageSrc} 
                    alt={isArabic ? product.title_ar : product.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                {isArabic ? product.title_ar : product.title}
              </TableCell>
              <TableCell>
                ${(product.variants && product.variants[0]?.price) || product.price}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">{isArabic ? "تعديل" : "Edit"}</span>
                  </Button>
                  
                  <AlertDialog open={deleteProductId === product.id} onOpenChange={(open) => !open && setDeleteProductId(null)}>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setDeleteProductId(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">{isArabic ? "حذف" : "Delete"}</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {isArabic ? "هل أنت متأكد؟" : "Are you sure?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {isArabic 
                            ? `هذا الإجراء لا يمكن التراجع عنه. سيتم حذف "${product.title_ar}" نهائيًا.` 
                            : `This action cannot be undone. "${product.title}" will be permanently deleted.`}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          {isArabic ? "إلغاء" : "Cancel"}
                        </AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 hover:bg-red-700"
                        >
                          {isArabic ? "حذف" : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ProductList;
