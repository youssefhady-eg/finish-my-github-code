
// Product Management Service

// Define product structure
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

// Key for localStorage
const PRODUCTS_STORAGE_KEY = "griffin_products";

// Get all products
export async function getProducts(): Promise<ProductType[]> {
  try {
    const productsData = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!productsData) return [];
    return JSON.parse(productsData);
  } catch (error) {
    console.error("Failed to get products:", error);
    return [];
  }
}

// Get a single product by ID
export async function getProduct(id: string): Promise<ProductType | null> {
  try {
    const products = await getProducts();
    return products.find(product => product.id === id) || null;
  } catch (error) {
    console.error(`Failed to get product ${id}:`, error);
    return null;
  }
}

// Add or update a product
export async function saveProduct(product: ProductType): Promise<ProductType> {
  try {
    const products = await getProducts();
    
    // Check if product already exists
    const index = products.findIndex(p => p.id === product.id);
    
    if (index >= 0) {
      // Update existing product
      products[index] = product;
    } else {
      // Add new product
      products.push(product);
    }
    
    // Save to localStorage
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    
    return product;
  } catch (error) {
    console.error("Failed to save product:", error);
    throw new Error("Failed to save product");
  }
}

// Delete a product
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const products = await getProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    
    if (filteredProducts.length === products.length) {
      // Product not found
      return false;
    }
    
    // Save updated products list
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(filteredProducts));
    
    return true;
  } catch (error) {
    console.error(`Failed to delete product ${id}:`, error);
    throw new Error("Failed to delete product");
  }
}

// Get featured products
export async function getFeaturedProducts(limit: number = 4): Promise<ProductType[]> {
  try {
    const products = await getProducts();
    return products.slice(0, limit);
  } catch (error) {
    console.error("Failed to get featured products:", error);
    return [];
  }
}

// Initialize demo products if none exist
export async function initializeDemoProducts(): Promise<void> {
  const products = await getProducts();
  
  // Only initialize if there are no products
  if (products.length === 0) {
    const demoProducts: ProductType[] = [
      {
        id: "product_1",
        title: "Professional Website Package",
        title_ar: "باقة الموقع الاحترافي",
        description: "Complete website solution for businesses with responsive design, CMS integration, and SEO optimization.",
        description_ar: "حل موقع ويب كامل للشركات مع تصميم متجاوب وتكامل نظام إدارة المحتوى وتحسين محركات البحث.",
        price: 1499,
        imageSrc: "https://via.placeholder.com/300x200/3498db/ffffff?text=Website+Package",
        features: [
          "Responsive design for all devices",
          "Content Management System",
          "SEO optimization",
          "5 pages included",
          "3 months support"
        ],
        features_ar: [
          "تصميم متجاوب لجميع الأجهزة",
          "نظام إدارة المحتوى",
          "تحسين محركات البحث",
          "يتضمن 5 صفحات",
          "دعم لمدة 3 أشهر"
        ],
        categoryId: "websites",
        variants: [
          {
            id: "basic",
            name: "Basic Package",
            name_ar: "الباقة الأساسية",
            price: 999
          },
          {
            id: "pro",
            name: "Professional Package",
            name_ar: "الباقة الاحترافية",
            price: 1499
          },
          {
            id: "premium",
            name: "Premium Package",
            name_ar: "الباقة المتميزة",
            price: 2499
          }
        ],
        relatedProductIds: ["product_2", "product_3"]
      },
      {
        id: "product_2",
        title: "E-commerce Solution",
        title_ar: "حل التجارة الإلكترونية",
        description: "Complete e-commerce platform with product management, payment processing, and inventory tracking.",
        description_ar: "منصة تجارة إلكترونية كاملة مع إدارة المنتجات ومعالجة المدفوعات وتتبع المخزون.",
        price: 2999,
        imageSrc: "https://via.placeholder.com/300x200/e74c3c/ffffff?text=E-commerce",
        features: [
          "Product management system",
          "Secure payment gateway",
          "Inventory tracking",
          "Customer accounts",
          "Order management"
        ],
        features_ar: [
          "نظام إدارة المنتجات",
          "بوابة دفع آمنة",
          "تتبع المخزون",
          "حسابات العملاء",
          "إدارة الطلبات"
        ],
        categoryId: "ecommerce",
        variants: [
          {
            id: "starter",
            name: "Starter Store",
            name_ar: "المتجر المبتدئ",
            price: 1999
          },
          {
            id: "business",
            name: "Business Store",
            name_ar: "متجر الأعمال",
            price: 2999
          },
          {
            id: "enterprise",
            name: "Enterprise Store",
            name_ar: "متجر المؤسسات",
            price: 4999
          }
        ],
        relatedProductIds: ["product_1", "product_3"]
      },
      {
        id: "product_3",
        title: "Mobile App Development",
        title_ar: "تطوير تطبيقات الجوال",
        description: "Custom mobile application development for iOS and Android platforms with backend integration.",
        description_ar: "تطوير تطبيقات الجوال المخصصة لمنصات iOS و Android مع تكامل الواجهة الخلفية.",
        price: 4999,
        imageSrc: "https://via.placeholder.com/300x200/2ecc71/ffffff?text=Mobile+Apps",
        features: [
          "Cross-platform development",
          "Native iOS and Android apps",
          "Backend API integration",
          "User authentication",
          "Push notifications"
        ],
        features_ar: [
          "تطوير متعدد المنصات",
          "تطبيقات iOS و Android الأصلية",
          "تكامل واجهة برمجة التطبيقات الخلفية",
          "مصادقة المستخدم",
          "إشعارات الدفع"
        ],
        categoryId: "mobile",
        variants: [
          {
            id: "mvp",
            name: "MVP Version",
            name_ar: "نسخة الحد الأدنى من المنتج",
            price: 3499
          },
          {
            id: "standard",
            name: "Standard App",
            name_ar: "التطبيق القياسي",
            price: 4999
          },
          {
            id: "premium",
            name: "Premium App",
            name_ar: "التطبيق المتميز",
            price: 7999
          }
        ],
        relatedProductIds: ["product_1", "product_2"]
      }
    ];
    
    // Save demo products
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(demoProducts));
  }
}

// Initialize demo products when the service is imported
initializeDemoProducts();
