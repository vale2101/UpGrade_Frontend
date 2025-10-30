export interface Product {
  id: string;
  name: string;
  brand?: string;
  image: string;
  images?: string[];
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  installments?: number;
  monthlyAmount?: string;
  condition: "Nuevo" | "Como Nuevo" | "Outlet" | "Semi Nuevo";
  category: string;
  capacity?: string | string[];
  color?: string | string[];
  description?: string;
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  icon?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface SearchItem {
  label: string;
  searchQuery: string;
}

export interface SearchSection {
  title: string;
  items: SearchItem[];
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  title: string;
  description: string;
  icon: string;
}

export interface PaymentMethod {
  title: string;
  description: string;
  icon: string;
}

export interface RepairService {
  title: string;
  description: string;
  icon: string;
}

export interface RepairProcess {
  title: string;
  description: string;
  icon: string;
}

export interface Promotion {
  title: string;
  description: string;
  icon: string;
}

// TODO: Los productos deben ser obtenidos desde la base de datos
const mainProducts: Product[] = [];

// TODO: Los productos de promoción deben ser obtenidos desde la base de datos
const promotionProducts: Product[] = [];

// TODO: Los detalles de productos deben ser obtenidos desde la base de datos
const productDetails: Record<string, Product> = {};

const data = {
  categories: [
    { 
      id: "1", 
      name: "Todas", 
      slug: "todas",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    { 
      id: "2", 
      name: "Samsung", 
      slug: "samsung",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    { 
      id: "3", 
      name: "iPhone", 
      slug: "iphone",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    { 
      id: "4", 
      name: "Apple Watch", 
      slug: "apple-watch",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    { 
      id: "5", 
      name: "iPad", 
      slug: "ipad",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    { 
      id: "6", 
      name: "Otras Marcas", 
      slug: "otras-marcas",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    { 
      id: "7", 
      name: "Sin IVA", 
      slug: "sin-iva",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    { 
      id: "8", 
      name: "Saldos", 
      slug: "saldos",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ],

  products: mainProducts,
  promotionProducts: promotionProducts,

  searchSections: [
    {
      title: "INICIO",
      items: [
        { label: "Inicio", searchQuery: "inicio" }
      ]
    },
    {
      title: "PRODUCTOS",
      items: [
        { label: "Samsung Gama S24", searchQuery: "Samsung Galaxy S24" },
        { label: "Samsung Gama S23", searchQuery: "Samsung Galaxy S23" },
        { label: "Samsung Gama S22", searchQuery: "Samsung Galaxy S22" },
        { label: "Samsung Galaxy Z", searchQuery: "Samsung Galaxy Z" },
        { label: "Samsung Galaxy A y M", searchQuery: "Samsung Galaxy A" },
        { label: "Apple Watch", searchQuery: "Apple Watch" },
        { label: "iPhone Familia 15", searchQuery: "iPhone 15" },
        { label: "iPhone Familia 14", searchQuery: "iPhone 14" },
        { label: "iPhone Familia 13", searchQuery: "iPhone 13" },
        { label: "iPhone Familia 12", searchQuery: "iPhone 12" },
        { label: "iPhone Familia 11", searchQuery: "iPhone 11" },
        { label: "Tablets Samsung", searchQuery: "Tablets Samsung" },
        { label: "Otras marcas", searchQuery: "Otras marcas" },
        { label: "Promociones", searchQuery: "Promociones" },
        { label: "Sin IVA", searchQuery: "Sin IVA" },
        { label: "iPad", searchQuery: "iPad" }
      ]
    },
    {
      title: "BENEFICIO DE 30 DÍAS",
      items: [
        { label: "Garantía de 30 días", searchQuery: "garantía 30 días" }
      ]
    },
    {
      title: "QUIÉNES SOMOS",
      items: [
        { label: "Categorías", searchQuery: "categorías" },
        { label: "Calidad", searchQuery: "calidad" },
        { label: "Garantía", searchQuery: "garantía" },
        { label: "Métodos de pago", searchQuery: "métodos de pago" },
        { label: "Medio ambiente", searchQuery: "medio ambiente" }
      ]
    }
  ],

  aboutFeatures: [
    {
      title: "Experiencia",
      description: "Más de 10 años en el mercado de reparación y venta de equipos tecnológicos.",
      icon: "🔧"
    },
    {
      title: "Calidad",
      description: "Garantizamos la mejor calidad en todos nuestros servicios y productos.",
      icon: "⭐"
    },
    {
      title: "Confianza",
      description: "Miles de clientes satisfechos respaldan nuestro trabajo.",
      icon: "🤝"
    }
  ],

  helpServices: [
    {
      title: "Soporte Técnico",
      description: "Asistencia técnica especializada para resolver cualquier problema con tus dispositivos.",
      icon: "🔧"
    },
    {
      title: "Consultoría",
      description: "Te ayudamos a elegir la mejor opción tecnológica según tus necesidades.",
      icon: "💡"
    },
    {
      title: "Instalación",
      description: "Servicio de instalación y configuración de software y hardware.",
      icon: "⚙️"
    },
    {
      title: "Capacitación",
      description: "Te enseñamos a usar tus dispositivos de manera eficiente y segura.",
      icon: "📚"
    },
    {
      title: "Mantenimiento",
      description: "Programas de mantenimiento preventivo para mantener tus equipos en óptimas condiciones.",
      icon: "🔍"
    },
    {
      title: "Recuperación de Datos",
      description: "Recuperamos información perdida de discos duros, memorias y otros dispositivos.",
      icon: "💾"
    }
  ],

  contactInfo: [
    {
      title: "Teléfono",
      description: "+1 (555) 123-4567",
      icon: "📞"
    },
    {
      title: "Email",
      description: "ayuda@upgrade.com",
      icon: "📧"
    },
    {
      title: "WhatsApp",
      description: "+1 (555) 987-6543",
      icon: "💬"
    },
    {
      title: "Horarios",
      description: "Lun-Vie: 8:00-18:00, Sáb: 9:00-15:00",
      icon: "🕒"
    }
  ],

  paymentMethods: [
    {
      title: "Tarjeta de Crédito/Débito",
      description: "Aceptamos todas las tarjetas principales: Visa, Mastercard, American Express",
      icon: "💳"
    },
    {
      title: "Transferencia Bancaria",
      description: "Pago directo desde tu cuenta bancaria con descuento especial",
      icon: "🏦"
    },
    {
      title: "Efectivo",
      description: "Pago en efectivo en nuestras tiendas físicas",
      icon: "💰"
    },
    {
      title: "PayPal",
      description: "Pago seguro a través de PayPal",
      icon: "🔒"
    },
    {
      title: "Criptomonedas",
      description: "Aceptamos Bitcoin y otras criptomonedas principales",
      icon: "₿"
    },
    {
      title: "Financiamiento",
      description: "Planes de financiamiento sin intereses hasta 12 meses",
      icon: "📅"
    }
  ],

  repairServices: [
    {
      title: "Laptops",
      description: "Reparación de pantallas, teclados, baterías, puertos USB y problemas de software.",
      icon: "💻"
    },
    {
      title: "Smartphones",
      description: "Cambio de pantallas, baterías, módulos de cámara y reparación de software.",
      icon: "📱"
    },
    {
      title: "Tablets",
      description: "Reparación de pantallas táctiles, conectores de carga y problemas de rendimiento.",
      icon: "📱"
    },
    {
      title: "PCs de Escritorio",
      description: "Reparación de motherboards, fuentes de poder, discos duros y tarjetas gráficas.",
      icon: "🖥️"
    },
    {
      title: "Consolas de Videojuegos",
      description: "Reparación de PlayStation, Xbox, Nintendo Switch y accesorios gaming.",
      icon: "🎮"
    },
    {
      title: "Impresoras",
      description: "Mantenimiento, reparación de cabezales, alimentadores y problemas de conectividad.",
      icon: "🖨️"
    }
  ],

  repairProcess: [
    {
      title: "Recibido",
      description: "Tu dispositivo ha sido recibido y registrado en nuestro sistema.",
      icon: "📥"
    },
    {
      title: "Revisión",
      description: "Nuestros técnicos están evaluando el problema y preparando el presupuesto.",
      icon: "🔍"
    },
    {
      title: "Reparación",
      description: "Realizamos la reparación con piezas originales y técnicas especializadas.",
      icon: "🔧"
    },
    {
      title: "Reparado",
      description: "Tu dispositivo está listo y ha pasado todas las pruebas de calidad.",
      icon: "✅"
    }
  ],

  promotions: [
    {
      title: "Descuento del 20%",
      description: "En reparaciones de laptops y computadoras de escritorio. Válido hasta el 31 de diciembre.",
      icon: "💻"
    },
    {
      title: "2x1 en Accesorios",
      description: "Compra cualquier accesorio y lleva otro igual gratis. Aplican términos y condiciones.",
      icon: "🎁"
    },
    {
      title: "Garantía Extendida",
      description: "Obtén 6 meses adicionales de garantía en todas las reparaciones. Sin costo extra.",
      icon: "🛡️"
    },
    {
      title: "Servicio a Domicilio",
      description: "Reparación a domicilio sin costo adicional en compras superiores a $200.",
      icon: "🚚"
    },
    {
      title: "Estudiantes",
      description: "15% de descuento presentando carnet estudiantil. Válido todo el año.",
      icon: "🎓"
    },
    {
      title: "Primera Vez",
      description: "10% de descuento en tu primera compra. Regístrate y obtén tu código.",
      icon: "✨"
    }
  ]
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "Todas") {
    return data.products;
  }
  return data.products.filter(product => product.category === category);
};

export const getPromotionProductsByCategory = (category: string): Product[] => {
  if (category === "Todas") {
    return data.promotionProducts;
  }
  return data.promotionProducts.filter(product => product.category === category);
};

export const getAllCategories = (): Category[] => {
  return data.categories;
};

export const getProductById = (id: string): Product | undefined => {
  return data.products.find(product => product.id === id) || 
         data.promotionProducts.find(product => product.id === id);
};

export const getProductDetail = (id: string): Product | undefined => {
  return productDetails[id];
};

export const getSearchSections = (): SearchSection[] => {
  return data.searchSections;
};

export const getAboutFeatures = (): Feature[] => {
  return data.aboutFeatures;
};

export const getHelpServices = (): Service[] => {
  return data.helpServices;
};

export const getContactInfo = (): ContactInfo[] => {
  return data.contactInfo;
};

export const getPaymentMethods = (): PaymentMethod[] => {
  return data.paymentMethods;
};

export const getRepairServices = (): RepairService[] => {
  return data.repairServices;
};

export const getRepairProcess = (): RepairProcess[] => {
  return data.repairProcess;
};

export const getPromotions = (): Promotion[] => {
  return data.promotions;
};


