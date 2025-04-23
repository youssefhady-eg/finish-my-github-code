
// This file simulates a Bubble database with collections for our application

// Service Types
export interface Service {
  id: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  imageSrc: string;
  reliabilityPercent: number;
  slug: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  quote: string;
  quote_ar: string;
  author: string;
  author_ar: string;
  company: string;
  company_ar: string;
  imageSrc: string;
}

// News Types
export interface NewsItem {
  id: string;
  title: string;
  title_ar: string;
  date: string;
  content: string;
  content_ar: string;
  imageSrc: string;
  slug: string;
}

// Portfolio Types
export interface PortfolioItem {
  id: string;
  title: string;
  title_ar: string;
  challenge: string;
  challenge_ar: string;
  solution: string;
  solution_ar: string;
  result: string;
  result_ar: string;
  imageSrc: string;
  slug: string;
}

// Product Types
export interface Product {
  id: string;
  title: string;
  title_ar: string;
  price: number;
  description: string;
  description_ar: string;
  imageSrc: string;
  variants: ProductVariant[];
  features: string[];
  features_ar: string[];
  categoryId: string;
  relatedProductIds: string[];
}

export interface ProductVariant {
  id: string;
  name: string;
  name_ar: string;
  price: number;
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  name_ar: string;
  role: string;
  role_ar: string;
  bio: string;
  bio_ar: string;
  imageSrc: string;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  question_ar: string;
  answer: string;
  answer_ar: string;
}

// Timeline Event Types
export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
}

// Mock Services Data
export const services: Service[] = [
  {
    id: "1",
    title: "VPN Installation",
    title_ar: "تركيب VPN",
    description: "Secure encrypted connection for remote teams. Fast setup, 24/7 monitoring, global access points for superior performance.",
    description_ar: "اتصال مشفر آمن للفرق البعيدة. إعداد سريع، مراقبة على مدار الساعة، نقاط وصول عالمية للأداء المتميز.",
    imageSrc: "https://via.placeholder.com/150",
    reliabilityPercent: 95,
    slug: "vpn"
  },
  {
    id: "2",
    title: "Call Center Systems",
    title_ar: "أنظمة مركز الاتصال",
    description: "Scalable VoIP platform with intelligent IVR, real-time analytics, and 24/7 support for seamless customer engagement.",
    description_ar: "منصة VoIP قابلة للتوسع مع IVR ذكي وتحليلات في الوقت الحقيقي ودعم على مدار الساعة للتواصل السلس مع العملاء.",
    imageSrc: "https://via.placeholder.com/150",
    reliabilityPercent: 92,
    slug: "call-center"
  },
  {
    id: "3",
    title: "CRM Solutions",
    title_ar: "حلول إدارة علاقات العملاء",
    description: "Customized customer relationship management tools with data analysis, pipeline tracking, and automated workflows.",
    description_ar: "أدوات مخصصة لإدارة علاقات العملاء مع تحليل البيانات وتتبع خط الإنتاج وسير العمل الآلي.",
    imageSrc: "https://via.placeholder.com/150",
    reliabilityPercent: 90,
    slug: "crm"
  },
  {
    id: "4",
    title: "POS Installation",
    title_ar: "تركيب نقاط البيع",
    description: "Complete point-of-sale systems with hardware, software, inventory management and customer loyalty features.",
    description_ar: "أنظمة نقاط بيع كاملة مع أجهزة وبرامج وإدارة المخزون وميزات ولاء العملاء.",
    imageSrc: "https://via.placeholder.com/150",
    reliabilityPercent: 88,
    slug: "pos"
  },
  {
    id: "5",
    title: "Network Designing",
    title_ar: "تصميم الشبكة",
    description: "Enterprise network architecture with redundancy planning, security implementation, and performance optimization.",
    description_ar: "هندسة شبكات المؤسسات مع تخطيط التكرار وتنفيذ الأمان وتحسين الأداء.",
    imageSrc: "https://via.placeholder.com/150",
    reliabilityPercent: 97,
    slug: "network"
  }
];

// Mock Testimonials Data
export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Griffin's POS transformed our retail operations with faster checkouts and real-time inventory tracking.",
    quote_ar: "لقد حول نظام نقاط البيع من Griffin عمليات البيع بالتجزئة لدينا مع عمليات دفع أسرع وتتبع المخزون في الوقت الفعلي.",
    author: "Ahmed Hassan",
    author_ar: "أحمد حسن",
    company: "MegaMart Retail",
    company_ar: "ميجا مارت للتجزئة",
    imageSrc: "https://via.placeholder.com/100"
  },
  {
    id: "2",
    quote: "The VPN solution from Griffin provides our remote team with secure, reliable connections at all times.",
    quote_ar: "يوفر حل VPN من Griffin لفريقنا البعيد اتصالات آمنة وموثوقة في جميع الأوقات.",
    author: "Sarah Johnson",
    author_ar: "سارة جونسون",
    company: "Global Finance Inc.",
    company_ar: "جلوبال فاينانس",
    imageSrc: "https://via.placeholder.com/100"
  },
  {
    id: "3",
    quote: "Griffin's call center implementation increased our customer satisfaction ratings by over 40%.",
    quote_ar: "أدى تنفيذ مركز الاتصال من Griffin إلى زيادة تقييمات رضا العملاء لدينا بأكثر من 40٪.",
    author: "Mohamed Ali",
    author_ar: "محمد علي",
    company: "AMIT Learning",
    company_ar: "أميت للتعليم",
    imageSrc: "https://via.placeholder.com/100"
  }
];

// Mock Portfolio Data (AMIT Learning Case Study)
export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Call Center Transformation, Egypt",
    title_ar: "تحويل مركز الاتصال، مصر",
    challenge: "AMIT Learning faced high call volumes, outdated systems, and poor customer satisfaction scores.",
    challenge_ar: "واجهت أميت للتعليم أحجام مكالمات عالية وأنظمة قديمة ودرجات منخفضة لرضا العملاء.",
    solution: "Implemented cloud-based VoIP with intelligent IVR, real-time analytics, and multi-agent support.",
    solution_ar: "نفذنا VoIP سحابي مع IVR ذكي وتحليلات في الوقت الحقيقي ودعم متعدد الوكلاء.",
    result: "40% faster responses, 30% higher customer satisfaction, and significantly reduced operating costs.",
    result_ar: "استجابات أسرع بنسبة 40٪، ورضا العملاء أعلى بنسبة 30٪، وانخفاض كبير في تكاليف التشغيل.",
    imageSrc: "https://via.placeholder.com/800x400",
    slug: "amit-learning"
  }
];

// Mock Products Data
export const products: Product[] = [
  {
    id: "1",
    title: "VPN Installation",
    title_ar: "تركيب VPN",
    price: 599,
    description: "Secure encrypted connection for remote teams with global access points. Includes setup and configuration.",
    description_ar: "اتصال مشفر آمن للفرق البعيدة مع نقاط وصول عالمية. يشمل الإعداد والتكوين.",
    imageSrc: "https://via.placeholder.com/300",
    variants: [
      { id: "v1", name: "Basic", name_ar: "أساسي", price: 599 },
      { id: "v2", name: "Premium", name_ar: "متميز", price: 999 }
    ],
    features: [
      "24/7 Support",
      "Global Access Points",
      "Military-grade Encryption"
    ],
    features_ar: [
      "دعم على مدار 24/7",
      "نقاط وصول عالمية",
      "تشفير عسكري المستوى"
    ],
    categoryId: "vpn",
    relatedProductIds: ["2", "5"]
  },
  {
    id: "2",
    title: "Call Center System",
    title_ar: "نظام مركز الاتصال",
    price: 2499,
    description: "Complete call center solution with VoIP integration, customer management, and real-time analytics.",
    description_ar: "حل مركز اتصال كامل مع تكامل VoIP وإدارة العملاء والتحليلات في الوقت الفعلي.",
    imageSrc: "https://via.placeholder.com/300",
    variants: [
      { id: "v1", name: "5 Agents", name_ar: "5 وكلاء", price: 2499 },
      { id: "v2", name: "10 Agents", name_ar: "10 وكلاء", price: 4499 }
    ],
    features: [
      "IVR System",
      "Call Recording",
      "Performance Analytics"
    ],
    features_ar: [
      "نظام IVR",
      "تسجيل المكالمات",
      "تحليلات الأداء"
    ],
    categoryId: "call-center",
    relatedProductIds: ["3", "5"]
  },
  {
    id: "3",
    title: "CRM Customization",
    title_ar: "تخصيص إدارة علاقات العملاء",
    price: 1799,
    description: "Custom CRM solutions tailored to your business needs with pipeline management and automation.",
    description_ar: "حلول CRM مخصصة مصممة لاحتياجات عملك مع إدارة خط الأنابيب والأتمتة.",
    imageSrc: "https://via.placeholder.com/300",
    variants: [
      { id: "v1", name: "10 Users", name_ar: "10 مستخدمين", price: 1799 },
      { id: "v2", name: "25 Users", name_ar: "25 مستخدم", price: 3599 }
    ],
    features: [
      "Custom Dashboards",
      "Workflow Automation",
      "Email Integration"
    ],
    features_ar: [
      "لوحات معلومات مخصصة",
      "أتمتة سير العمل",
      "تكامل البريد الإلكتروني"
    ],
    categoryId: "crm",
    relatedProductIds: ["2", "4"]
  },
  {
    id: "4",
    title: "POS Installation",
    title_ar: "تركيب نقاط البيع",
    price: 1299,
    description: "Complete point-of-sale solution with hardware, software, and inventory management.",
    description_ar: "حل كامل لنقاط البيع مع الأجهزة والبرامج وإدارة المخزون.",
    imageSrc: "https://via.placeholder.com/300",
    variants: [
      { id: "v1", name: "Retail", name_ar: "تجزئة", price: 1299 },
      { id: "v2", name: "Restaurant", name_ar: "مطعم", price: 1599 }
    ],
    features: [
      "Inventory Management",
      "Customer Loyalty System",
      "Payment Processing"
    ],
    features_ar: [
      "إدارة المخزون",
      "نظام ولاء العملاء",
      "معالجة الدفع"
    ],
    categoryId: "pos",
    relatedProductIds: ["3", "5"]
  },
  {
    id: "5",
    title: "Network Design",
    title_ar: "تصميم الشبكة",
    price: 2999,
    description: "Comprehensive network design with security implementation, redundancy planning and optimization.",
    description_ar: "تصميم شبكة شامل مع تنفيذ الأمان وتخطيط التكرار والتحسين.",
    imageSrc: "https://via.placeholder.com/300",
    variants: [
      { id: "v1", name: "2 Sites", name_ar: "موقعان", price: 2999 },
      { id: "v2", name: "5 Sites", name_ar: "5 مواقع", price: 5999 }
    ],
    features: [
      "Network Redundancy",
      "Security Implementation",
      "Performance Optimization"
    ],
    features_ar: [
      "تكرار الشبكة",
      "تنفيذ الأمان",
      "تحسين الأداء"
    ],
    categoryId: "network",
    relatedProductIds: ["1", "2"]
  }
];

// Mock Team Members Data
export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Ahmed Khalid",
    name_ar: "أحمد خالد",
    role: "CEO",
    role_ar: "الرئيس التنفيذي",
    bio: "Drives tech vision with 15 years in IT. Passionate about innovative solutions that transform businesses.",
    bio_ar: "يقود الرؤية التقنية مع 15 عامًا في تكنولوجيا المعلومات. متحمس للحلول المبتكرة التي تحول الأعمال.",
    imageSrc: "https://via.placeholder.com/300"
  },
  {
    id: "2",
    name: "Sara Hassan",
    name_ar: "سارة حسن",
    role: "CTO",
    role_ar: "مدير التكنولوجيا",
    bio: "Tech expert specializing in network architecture and security implementations with 12+ years experience.",
    bio_ar: "خبير تقني متخصص في هندسة الشبكات وتنفيذ الأمان مع خبرة أكثر من 12 عامًا.",
    imageSrc: "https://via.placeholder.com/300"
  },
  {
    id: "3",
    name: "Mohamed Ibrahim",
    name_ar: "محمد إبراهيم",
    role: "Head of Operations",
    role_ar: "رئيس العمليات",
    bio: "Streamlines service delivery with focus on customer satisfaction and operational excellence.",
    bio_ar: "يبسط تقديم الخدمات مع التركيز على رضا العملاء والتميز التشغيلي.",
    imageSrc: "https://via.placeholder.com/300"
  }
];

// Mock News Data
export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "VPN Upgrade: Faster Encryption",
    title_ar: "ترقية VPN: تشفير أسرع",
    date: "2025-03-15",
    content: "Griffin introduces new VPN technology with 30% faster encryption while maintaining military-grade security standards.",
    content_ar: "تقدم Griffin تقنية VPN جديدة بتشفير أسرع بنسبة 30٪ مع الحفاظ على معايير الأمان العسكرية.",
    imageSrc: "https://via.placeholder.com/400",
    slug: "vpn-upgrade"
  },
  {
    id: "2",
    title: "New CRM Features Released",
    title_ar: "إطلاق ميزات CRM جديدة",
    date: "2025-02-28",
    content: "Our latest CRM update includes AI-powered analytics, advanced pipeline visualization, and improved mobile support.",
    content_ar: "يتضمن تحديث CRM الأخير لدينا تحليلات مدعومة بالذكاء الاصطناعي، وتصور متقدم لخط الأنابيب، ودعمًا محسنًا للجوال.",
    imageSrc: "https://via.placeholder.com/400",
    slug: "new-crm-features"
  },
  {
    id: "3",
    title: "Griffin Partners with AMIT Learning",
    title_ar: "Griffin تتشارك مع أميت للتعليم",
    date: "2025-01-10",
    content: "Strategic partnership delivers transformative call center solution for Egypt's leading educational institution.",
    content_ar: "تقدم الشراكة الاستراتيجية حلاً تحويليًا لمركز الاتصال للمؤسسة التعليمية الرائدة في مصر.",
    imageSrc: "https://via.placeholder.com/400",
    slug: "amit-partnership"
  }
];

// Mock FAQs Data
export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How fast is VPN setup?",
    question_ar: "ما مدى سرعة إعداد VPN؟",
    answer: "Our VPN setup typically takes 1-2 business days for basic configurations and 3-5 days for complex enterprise implementations.",
    answer_ar: "عادة ما يستغرق إعداد VPN لدينا 1-2 يوم عمل للتكوينات الأساسية و 3-5 أيام للتنفيذات المؤسسية المعقدة."
  },
  {
    id: "2",
    question: "Do you provide training for CRM systems?",
    question_ar: "هل توفرون تدريبًا لأنظمة CRM؟",
    answer: "Yes, we include comprehensive training sessions for all CRM implementations, both in-person and virtual options are available.",
    answer_ar: "نعم، نقدم جلسات تدريبية شاملة لجميع تطبيقات CRM، وتتوفر خيارات شخصية وافتراضية."
  },
  {
    id: "3",
    question: "What payment methods do you accept?",
    question_ar: "ما هي طرق الدفع التي تقبلونها؟",
    answer: "We accept credit cards, bank transfers, and PayPal. For large projects, we also offer flexible payment plans.",
    answer_ar: "نقبل بطاقات الائتمان والتحويلات المصرفية وPayPal. للمشاريع الكبيرة، نقدم أيضًا خطط دفع مرنة."
  },
  {
    id: "4",
    question: "How long does call center implementation take?",
    question_ar: "كم من الوقت يستغرق تنفيذ مركز الاتصال؟",
    answer: "A standard call center implementation takes 2-4 weeks, depending on complexity and customization requirements.",
    answer_ar: "يستغرق تنفيذ مركز الاتصال القياسي 2-4 أسابيع، اعتمادًا على متطلبات التعقيد والتخصيص."
  },
  {
    id: "5",
    question: "Do you offer maintenance contracts?",
    question_ar: "هل تقدمون عقود صيانة؟",
    answer: "Yes, we offer various maintenance packages that include regular updates, security patches, and technical support.",
    answer_ar: "نعم، نقدم حزم صيانة مختلفة تشمل تحديثات منتظمة وتصحيحات أمنية ودعمًا فنيًا."
  }
];

// Mock Timeline Events Data
export const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    year: "2015",
    title: "Founded",
    title_ar: "التأسيس",
    description: "Griffin for Integrated Solutions was established in Cairo, Egypt.",
    description_ar: "تأسست Griffin للحلول المتكاملة في القاهرة، مصر."
  },
  {
    id: "2",
    year: "2017",
    title: "VPN Service Launch",
    title_ar: "إطلاق خدمة VPN",
    description: "Introduced our first enterprise VPN solution with global access points.",
    description_ar: "قدمنا أول حل VPN للمؤسسات مع نقاط وصول عالمية."
  },
  {
    id: "3",
    year: "2019",
    title: "Call Center Expertise",
    title_ar: "خبرة مركز الاتصال",
    description: "Developed comprehensive call center solutions for enterprise clients.",
    description_ar: "طورنا حلول شاملة لمراكز الاتصال لعملاء المؤسسات."
  },
  {
    id: "4",
    year: "2020",
    title: "AMIT Success",
    title_ar: "نجاح أميت",
    description: "Transformed AMIT Learning's customer service with our call center implementation.",
    description_ar: "قمنا بتحويل خدمة عملاء أميت للتعليم من خلال تنفيذ مركز الاتصال لدينا."
  },
  {
    id: "5",
    year: "2023",
    title: "International Expansion",
    title_ar: "التوسع الدولي",
    description: "Expanded operations to serve clients in 5 countries across the Middle East.",
    description_ar: "وسعنا عملياتنا لخدمة العملاء في 5 دول في جميع أنحاء الشرق الأوسط."
  }
];

// Translations for UI elements
export interface Translation {
  key: string;
  english: string;
  arabic: string;
}

export const translations: Translation[] = [
  { key: "shop_now", english: "Shop Now", arabic: "تسوق الآن" },
  { key: "learn_more", english: "Learn More", arabic: "اعرف المزيد" },
  { key: "our_services", english: "Our Services", arabic: "خدماتنا" },
  { key: "success_stories", english: "Success Stories", arabic: "قصص النجاح" },
  { key: "read_more", english: "Read More", arabic: "اقرأ المزيد" },
  { key: "contact_us", english: "Contact Us", arabic: "اتصل بنا" },
  { key: "about_us", english: "About Us", arabic: "من نحن" },
  { key: "view_all", english: "View All", arabic: "عرض الكل" }
];
