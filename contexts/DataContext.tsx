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
        { label: "Samsung", searchQuery: "Samsung" },
        { label: "iPhone", searchQuery: "iPhone" },
        { label: "Apple Watch", searchQuery: "Apple Watch" },
        { label: "iPad", searchQuery: "iPad" },
        { label: "Otras Marcas", searchQuery: "Otras marcas" },
        { label: "Sin IVA", searchQuery: "Sin IVA" },
        { label: "Saldos", searchQuery: "Saldos" }
      ]
    },
    {
      title: "QUIÉNES SOMOS",
      items: [
        { label: "¿Quiénes somos?", searchQuery: "/about" },
        { label: "Te ayudamos", searchQuery: "/ayuda" },
        { label: "Reparaciones", searchQuery: "/reparaciones" },
        { label: "Métodos de pago", searchQuery: "/metodos-pago" }
      ]
    }
  ],

  aboutFeatures: [
    {
      title: "Experiencia",
      description: "Más de 10 años en el mercado de reparación y venta de equipos tecnológicos.",
      icon: "wrench"
    },
    {
      title: "Calidad",
      description: "Garantizamos la mejor calidad en todos nuestros servicios y productos.",
      icon: "star"
    },
    {
      title: "Confianza",
      description: "Miles de clientes satisfechos respaldan nuestro trabajo.",
      icon: "handshake"
    }
  ],

  helpServices: [
    {
      title: "Soporte Técnico",
      description: "Asistencia técnica especializada para resolver cualquier problema con tus dispositivos.",
      icon: "wrench"
    },
    {
      title: "Consultoría",
      description: "Te ayudamos a elegir la mejor opción tecnológica según tus necesidades.",
      icon: "lightbulb"
    },
    {
      title: "Instalación",
      description: "Servicio de instalación y configuración de software y hardware.",
      icon: "settings"
    },
    {
      title: "Capacitación",
      description: "Te enseñamos a usar tus dispositivos de manera eficiente y segura.",
      icon: "book-open"
    },
    {
      title: "Mantenimiento",
      description: "Programas de mantenimiento preventivo para mantener tus equipos en óptimas condiciones.",
      icon: "search"
    },
    {
      title: "Recuperación de Datos",
      description: "Recuperamos información perdida de discos duros, memorias y otros dispositivos.",
      icon: "hard-drive"
    }
  ],

  contactInfo: [
    {
      title: "Teléfono",
      description: "606-881-2556",
      icon: "phone"
    },
    {
      title: "Email",
      description: "ayuda@upgrade.com",
      icon: "mail"
    },
    {
      title: "WhatsApp",
      description: "314 800 65 47",
      icon: "message-circle"
    },
    {
      title: "Horarios",
      description: "Lun-Vie: 8:00-18:00, Sáb: 9:00-15:00",
      icon: "clock"
    }
  ],

  paymentMethods: [
    {
      title: "Tarjeta de Crédito/Débito",
      description: "Aceptamos todas las tarjetas principales: Visa, Mastercard, American Express",
      icon: "credit-card"
    },
    {
      title: "Transferencia Bancaria",
      description: "Pago directo desde tu cuenta bancaria con descuento especial",
      icon: "building-2"
    },
    {
      title: "Efectivo",
      description: "Pago en efectivo en nuestras tiendas físicas",
      icon: "dollar-sign"
    },
    {
      title: "PayPal",
      description: "Pago seguro a través de PayPal",
      icon: "lock"
    },
    {
      title: "Criptomonedas",
      description: "Aceptamos Bitcoin y otras criptomonedas principales",
      icon: "bitcoin"
    },
    {
      title: "Financiamiento",
      description: "Planes de financiamiento sin intereses hasta 12 meses",
      icon: "calendar"
    }
  ],

  repairServices: [
    {
      title: "Laptops",
      description: "Reparación de pantallas, teclados, baterías, puertos USB y problemas de software.",
      icon: "laptop"
    },
    {
      title: "Smartphones",
      description: "Cambio de pantallas, baterías, módulos de cámara y reparación de software.",
      icon: "smartphone"
    },
    {
      title: "Tablets",
      description: "Reparación de pantallas táctiles, conectores de carga y problemas de rendimiento.",
      icon: "tablet"
    },
    {
      title: "PCs de Escritorio",
      description: "Reparación de motherboards, fuentes de poder, discos duros y tarjetas gráficas.",
      icon: "monitor"
    },
    {
      title: "Consolas de Videojuegos",
      description: "Reparación de PlayStation, Xbox, Nintendo Switch y accesorios gaming.",
      icon: "gamepad-2"
    },
    {
      title: "Impresoras",
      description: "Mantenimiento, reparación de cabezales, alimentadores y problemas de conectividad.",
      icon: "printer"
    }
  ],

  repairProcess: [
    {
      title: "Recibido",
      description: "Tu dispositivo ha sido recibido y registrado en nuestro sistema.",
      icon: "download"
    },
    {
      title: "Revisión",
      description: "Nuestros técnicos están evaluando el problema y preparando el presupuesto.",
      icon: "search"
    },
    {
      title: "Reparación",
      description: "Realizamos la reparación con piezas originales y técnicas especializadas.",
      icon: "wrench"
    },
    {
      title: "Reparado",
      description: "Tu dispositivo está listo y ha pasado todas las pruebas de calidad.",
      icon: "check-circle-2"
    }
  ],

  promotions: [
    {
      title: "Descuento del 20%",
      description: "En reparaciones de laptops y computadoras de escritorio. Válido hasta el 31 de diciembre.",
      icon: "laptop"
    },
    {
      title: "2x1 en Accesorios",
      description: "Compra cualquier accesorio y lleva otro igual gratis. Aplican términos y condiciones.",
      icon: "gift"
    },
    {
      title: "Garantía Extendida",
      description: "Obtén 6 meses adicionales de garantía en todas las reparaciones. Sin costo extra.",
      icon: "shield"
    },
    {
      title: "Servicio a Domicilio",
      description: "Reparación a domicilio sin costo adicional en compras superiores a $200.",
      icon: "truck"
    },
    {
      title: "Estudiantes",
      description: "15% de descuento presentando carnet estudiantil. Válido todo el año.",
      icon: "graduation-cap"
    },
    {
      title: "Primera Vez",
      description: "10% de descuento en tu primera compra. Regístrate y obtén tu código.",
      icon: "sparkles"
    }
  ]
};

export const getAllCategories = (): Category[] => {
  return data.categories;
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


