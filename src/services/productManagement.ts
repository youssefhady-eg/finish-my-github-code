
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
        id: "vpn_service",
        title: "VPN Installation Package",
        title_ar: "باقة تركيب VPN",
        description: "Complete VPN solution with setup, configuration, and support.",
        description_ar: "حل VPN كامل مع الإعداد والتكوين والدعم.",
        price: 299,
        imageSrc: "/vpn.svg",
        features: [
          "Secure remote access setup",
          "Multiple device support",
          "24/7 technical support",
          "Regular security updates",
          "Network monitoring"
        ],
        features_ar: [
          "إعداد وصول عن بُعد آمن",
          "دعم الأجهزة المتعددة",
          "دعم فني على مدار الساعة",
          "تحديثات أمنية منتظمة",
          "مراقبة الشبكة"
        ],
        categoryId: "vpn",
        variants: [
          {
            id: "basic_vpn",
            name: "Basic VPN",
            name_ar: "VPN أساسي",
            price: 299
          },
          {
            id: "business_vpn",
            name: "Business VPN",
            name_ar: "VPN للأعمال",
            price: 499
          }
        ],
        relatedProductIds: ["callcenter_service", "network_service"]
      },
      {
        id: "callcenter_service",
        title: "Call Center Setup",
        title_ar: "إعداد مركز الاتصال",
        description: "Professional call center system implementation with VoIP integration.",
        description_ar: "تنفيذ نظام مركز اتصال احترافي مع تكامل VoIP.",
        price: 1999,
        imageSrc: "/callcenter.svg",
        features: [
          "VoIP system setup",
          "Call routing configuration",
          "Agent training",
          "Quality monitoring tools",
          "Analytics dashboard"
        ],
        features_ar: [
          "إعداد نظام VoIP",
          "تكوين توجيه المكالمات",
          "تدريب الموظفين",
          "أدوات مراقبة الجودة",
          "لوحة تحليلات"
        ],
        categoryId: "callcenter",
        variants: [
          {
            id: "small_cc",
            name: "Small Team",
            name_ar: "فريق صغير",
            price: 1999
          },
          {
            id: "large_cc",
            name: "Enterprise",
            name_ar: "مؤسسات",
            price: 3999
          }
        ],
        relatedProductIds: ["crm_service", "vpn_service"]
      },
      {
        id: "crm_service",
        title: "CRM Implementation",
        title_ar: "تنفيذ نظام CRM",
        description: "Custom CRM solution implementation with training and support.",
        description_ar: "تنفيذ حل CRM مخصص مع التدريب والدعم.",
        price: 1499,
        imageSrc: "/crm.svg",
        features: [
          "Custom workflow setup",
          "Data migration",
          "User training",
          "Integration support",
          "Reporting setup"
        ],
        features_ar: [
          "إعداد سير العمل المخصص",
          "ترحيل البيانات",
          "تدريب المستخدمين",
          "دعم التكامل",
          "إعداد التقارير"
        ],
        categoryId: "crm",
        variants: [
          {
            id: "starter_crm",
            name: "Starter CRM",
            name_ar: "CRM مبتدئ",
            price: 1499
          },
          {
            id: "premium_crm",
            name: "Premium CRM",
            name_ar: "CRM متميز",
            price: 2499
          }
        ],
        relatedProductIds: ["callcenter_service", "pos_service"]
      },
      {
        id: "pos_service",
        title: "POS System Setup",
        title_ar: "إعداد نظام نقاط البيع",
        description: "Complete point-of-sale system with hardware and software setup.",
        description_ar: "نظام نقاط بيع كامل مع إعداد الأجهزة والبرامج.",
        price: 2499,
        imageSrc: "/pos.svg",
        features: [
          "Hardware installation",
          "Software configuration",
          "Staff training",
          "Inventory setup",
          "Payment integration"
        ],
        features_ar: [
          "تركيب الأجهزة",
          "تكوين البرامج",
          "تدريب الموظفين",
          "إعداد المخزون",
          "تكامل المدفوعات"
        ],
        categoryId: "pos",
        variants: [
          {
            id: "basic_pos",
            name: "Basic POS",
            name_ar: "نقاط بيع أساسية",
            price: 2499
          },
          {
            id: "advanced_pos",
            name: "Advanced POS",
            name_ar: "نقاط بيع متقدمة",
            price: 3999
          }
        ],
        relatedProductIds: ["network_service", "crm_service"]
      },
      {
        id: "network_service",
        title: "Network Design & Implementation",
        title_ar: "تصميم وتنفيذ الشبكات",
        description: "Professional network infrastructure design and setup.",
        description_ar: "تصميم وإعداد البنية التحتية للشبكات بشكل احترافي.",
        price: 3999,
        imageSrc: "/network.svg",
        features: [
          "Network assessment",
          "Infrastructure design",
          "Security implementation",
          "Performance optimization",
          "Documentation"
        ],
        features_ar: [
          "تقييم الشبكة",
          "تصميم البنية التحتية",
          "تنفيذ الأمان",
          "تحسين الأداء",
          "التوثيق"
        ],
        categoryId: "network",
        variants: [
          {
            id: "smb_network",
            name: "SMB Network",
            name_ar: "شبكة الشركات الصغيرة",
            price: 3999
          },
          {
            id: "enterprise_network",
            name: "Enterprise Network",
            name_ar: "شبكة المؤسسات",
            price: 7999
          }
        ],
        relatedProductIds: ["vpn_service", "pos_service"]
      }
    ];
    
    // Save demo products
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(demoProducts));
  }
}

// Initialize demo products when the service is imported
initializeDemoProducts();

