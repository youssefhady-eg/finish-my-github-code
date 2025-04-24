
export interface ProductType {
  id: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  price: number;
  imageSrc: string;
  features: string[];
  features_ar: string[];
  categoryId: string;
  variants: {
    id: string;
    name: string;
    name_ar: string;
    price: number;
  }[];
  relatedProductIds: string[];
}
