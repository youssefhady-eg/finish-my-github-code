
import { ProductType } from '../types/product';

export const demoProducts: ProductType[] = [
  {
    id: "vpn_hardware",
    title: "VPN Router Package",
    title_ar: "باقة راوتر VPN",
    description: "Enterprise-grade VPN router with pre-configured security settings.",
    description_ar: "راوتر VPN للشركات مع إعدادات أمان مسبقة التكوين.",
    price: 599,
    imageSrc: "/vpn.svg",
    features: [
      "Pre-configured security settings",
      "Multi-WAN support",
      "Hardware firewall",
      "24/7 technical support",
      "1-year warranty"
    ],
    features_ar: [
      "إعدادات أمان مسبقة التكوين",
      "دعم متعدد WAN",
      "جدار حماية مادي",
      "دعم فني على مدار الساعة",
      "ضمان لمدة سنة"
    ],
    categoryId: "hardware",
    variants: [
      {
        id: "basic_router",
        name: "Basic Router",
        name_ar: "راوتر أساسي",
        price: 599
      },
      {
        id: "pro_router",
        name: "Pro Router",
        name_ar: "راوتر احترافي",
        price: 899
      }
    ],
    relatedProductIds: ["ip_phone", "network_switch"]
  },
  {
    id: "ip_phone",
    title: "IP Phone System",
    title_ar: "نظام هاتف IP",
    description: "Professional IP phone system for business communications.",
    description_ar: "نظام هاتف IP احترافي لاتصالات الأعمال.",
    price: 299,
    imageSrc: "/callcenter.svg",
    features: [
      "HD voice quality",
      "Multiple line support",
      "Power over Ethernet",
      "Advanced call features",
      "Conference calling"
    ],
    features_ar: [
      "جودة صوت عالية الدقة",
      "دعم خطوط متعددة",
      "الطاقة عبر الإيثرنت",
      "ميزات اتصال متقدمة",
      "مكالمات جماعية"
    ],
    categoryId: "hardware",
    variants: [
      {
        id: "standard_phone",
        name: "Standard Phone",
        name_ar: "هاتف قياسي",
        price: 299
      },
      {
        id: "executive_phone",
        name: "Executive Phone",
        name_ar: "هاتف تنفيذي",
        price: 499
      }
    ],
    relatedProductIds: ["vpn_hardware", "network_switch"]
  },
  {
    id: "network_switch",
    title: "Managed Network Switch",
    title_ar: "سويتش شبكة مُدار",
    description: "Enterprise managed switch with advanced networking features.",
    description_ar: "سويتش مُدار للشركات مع ميزات شبكات متقدمة.",
    price: 799,
    imageSrc: "/network.svg",
    features: [
      "Layer 3 switching",
      "PoE+ support",
      "VLAN management",
      "QoS features",
      "Remote management"
    ],
    features_ar: [
      "تبديل Layer 3",
      "دعم PoE+",
      "إدارة VLAN",
      "ميزات جودة الخدمة",
      "إدارة عن بعد"
    ],
    categoryId: "hardware",
    variants: [
      {
        id: "24_port",
        name: "24-Port Switch",
        name_ar: "سويتش 24 منفذ",
        price: 799
      },
      {
        id: "48_port",
        name: "48-Port Switch",
        name_ar: "سويتش 48 منفذ",
        price: 1499
      }
    ],
    relatedProductIds: ["vpn_hardware", "ip_phone"]
  },
  {
    id: "pos_terminal",
    title: "POS Terminal",
    title_ar: "جهاز نقاط البيع",
    description: "Complete point-of-sale hardware terminal with touchscreen.",
    description_ar: "جهاز نقاط بيع كامل مع شاشة تعمل باللمس.",
    price: 1299,
    imageSrc: "/pos.svg",
    features: [
      "15\" touchscreen display",
      "Thermal receipt printer",
      "Barcode scanner",
      "Cash drawer",
      "Customer display"
    ],
    features_ar: [
      "شاشة لمس 15 بوصة",
      "طابعة إيصالات حرارية",
      "ماسح الباركود",
      "درج النقود",
      "شاشة العميل"
    ],
    categoryId: "hardware",
    variants: [
      {
        id: "standard_pos",
        name: "Standard Terminal",
        name_ar: "جهاز قياسي",
        price: 1299
      },
      {
        id: "premium_pos",
        name: "Premium Terminal",
        name_ar: "جهاز متميز",
        price: 1999
      }
    ],
    relatedProductIds: ["network_switch", "ip_phone"]
  }
];
