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

const mainProducts: Product[] = [
  {
    id: "1",
    name: "Samsung Galaxy S24 Ultra 5G",
    image: "/s24ultra.png",
    currentPrice: "Desde $3.599.900",
    originalPrice: "Antes $4.099.900",
    installments: 6,
    monthlyAmount: "$599.983",
    discount: "-12%",
    condition: "Semi Nuevo" as const,
    category: "Samsung"
  },
  {
    id: "2",
    name: "Samsung Galaxy Z Fold 5 (2024)",
    image: "/zfold5.png",
    currentPrice: "Desde $3.599.900",
    originalPrice: "Antes $5.099.900",
    installments: 6,
    monthlyAmount: "$599.983",
    discount: "-29%",
    condition: "Outlet" as const,
    category: "Samsung"
  },
  {
    id: "3",
    name: "Samsung Galaxy S24 Plus 5G",
    image: "/s24plus.png",
    currentPrice: "Desde $2.899.900",
    originalPrice: "Antes $3.599.900",
    installments: 6,
    monthlyAmount: "$483.317",
    discount: "-19%",
    condition: "Como Nuevo" as const,
    category: "Samsung"
  },
  {
    id: "4",
    name: "Samsung Galaxy Z Fold 4 (2023)",
    image: "/zfold4.png",
    currentPrice: "Desde $2.799.900",
    originalPrice: "Antes $4.299.900",
    installments: 6,
    monthlyAmount: "$466.650",
    discount: "-35%",
    condition: "Outlet" as const,
    category: "Samsung"
  },
  {
    id: "6",
    name: "Samsung Galaxy A54 5G",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $1.899.900",
    originalPrice: "Antes $2.299.900",
    installments: 6,
    monthlyAmount: "$316.650",
    discount: "-17%",
    condition: "Outlet" as const,
    category: "Samsung"
  },
  {
    id: "5",
    name: "iPhone 15 Pro Max",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $4.299.900",
    originalPrice: "Antes $4.999.900",
    installments: 12,
    monthlyAmount: "$358.325",
    discount: "-14%",
    condition: "Como Nuevo" as const,
    category: "iPhone"
  },
  {
    id: "9",
    name: "iPhone 15 Pro",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $3.799.900",
    originalPrice: "Antes $4.299.900",
    installments: 12,
    monthlyAmount: "$316.658",
    discount: "-12%",
    condition: "Como Nuevo" as const,
    category: "iPhone"
  },
  {
    id: "10",
    name: "iPhone 14 Pro Max",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $3.299.900",
    originalPrice: "Antes $3.999.900",
    installments: 12,
    monthlyAmount: "$274.992",
    discount: "-18%",
    condition: "Outlet" as const,
    category: "iPhone"
  },
  {
    id: "11",
    name: "Apple Watch Series 9",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $1.999.900",
    originalPrice: "Antes $2.399.900",
    installments: 6,
    monthlyAmount: "$333.317",
    discount: "-17%",
    condition: "Como Nuevo" as const,
    category: "Apple Watch"
  },
  {
    id: "12",
    name: "Apple Watch Series 8",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $1.599.900",
    originalPrice: "Antes $1.999.900",
    installments: 6,
    monthlyAmount: "$266.650",
    discount: "-20%",
    condition: "Outlet" as const,
    category: "Apple Watch"
  },
  {
    id: "7",
    name: "iPad Air 5ta Gen",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $2.499.900",
    originalPrice: "Antes $2.999.900",
    installments: 6,
    monthlyAmount: "$416.650",
    discount: "-17%",
    condition: "Como Nuevo" as const,
    category: "iPad"
  },
  {
    id: "13",
    name: "iPad Pro 12.9\"",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $3.999.900",
    originalPrice: "Antes $4.499.900",
    installments: 12,
    monthlyAmount: "$333.325",
    discount: "-11%",
    condition: "Como Nuevo" as const,
    category: "iPad"
  },
  {
    id: "14",
    name: "iPad Mini 6ta Gen",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $1.899.900",
    originalPrice: "Antes $2.299.900",
    installments: 6,
    monthlyAmount: "$316.650",
    discount: "-17%",
    condition: "Outlet" as const,
    category: "iPad"
  },
  {
    id: "15",
    name: "Huawei P60 Pro",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $2.199.900",
    originalPrice: "Antes $2.699.900",
    installments: 6,
    monthlyAmount: "$366.650",
    discount: "-19%",
    condition: "Como Nuevo" as const,
    category: "Otras Marcas"
  },
  {
    id: "16",
    name: "Xiaomi 13 Pro",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $1.799.900",
    originalPrice: "Antes $2.199.900",
    installments: 6,
    monthlyAmount: "$299.983",
    discount: "-18%",
    condition: "Outlet" as const,
    category: "Otras Marcas"
  },
  {
    id: "17",
    name: "OnePlus 11",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $1.599.900",
    originalPrice: "Antes $1.999.900",
    installments: 6,
    monthlyAmount: "$266.650",
    discount: "-20%",
    condition: "Como Nuevo" as const,
    category: "Otras Marcas"
  },
  {
    id: "8",
    name: "MacBook Air M2",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $3.999.900",
    originalPrice: "Antes $4.499.900",
    installments: 12,
    monthlyAmount: "$333.325",
    discount: "-11%",
    condition: "Outlet" as const,
    category: "Otras Marcas"
  },
  {
    id: "18",
    name: "Samsung Galaxy S23 Sin IVA",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $1.199.900",
    originalPrice: "Antes $1.399.900",
    installments: 12,
    monthlyAmount: "$99.992",
    discount: "-14%",
    condition: "Como Nuevo" as const,
    category: "Sin IVA"
  },
  {
    id: "19",
    name: "iPhone 14 Sin IVA",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $2.199.900",
    originalPrice: "Antes $2.599.900",
    installments: 12,
    monthlyAmount: "$183.325",
    discount: "-15%",
    condition: "Como Nuevo" as const,
    category: "Sin IVA"
  },
  {
    id: "20",
    name: "iPad Air Sin IVA",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $1.999.900",
    originalPrice: "Antes $2.399.900",
    installments: 12,
    monthlyAmount: "$166.658",
    discount: "-17%",
    condition: "Como Nuevo" as const,
    category: "Sin IVA"
  },
  {
    id: "21",
    name: "Apple Watch Series 8 Sin IVA",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $1.299.900",
    originalPrice: "Antes $1.599.900",
    installments: 6,
    monthlyAmount: "$216.650",
    discount: "-19%",
    condition: "Como Nuevo" as const,
    category: "Sin IVA"
  },
  {
    id: "22",
    name: "iPhone 13 Pro Max Saldos",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $1.999.900",
    originalPrice: "Antes $2.999.900",
    installments: 12,
    monthlyAmount: "$166.658",
    discount: "-33%",
    condition: "Outlet" as const,
    category: "Saldos"
  },
  {
    id: "23",
    name: "Samsung Galaxy A54 Saldos",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $999.900",
    originalPrice: "Antes $1.599.900",
    installments: 6,
    monthlyAmount: "$166.650",
    discount: "-38%",
    condition: "Outlet" as const,
    category: "Saldos"
  },
  {
    id: "24",
    name: "iPad 9na Gen Saldos",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $1.299.900",
    originalPrice: "Antes $1.999.900",
    installments: 6,
    monthlyAmount: "$216.650",
    discount: "-35%",
    condition: "Outlet" as const,
    category: "Saldos"
  },
  {
    id: "25",
    name: "Apple Watch SE Saldos",
    image: "/api/placeholder/300/300",
    currentPrice: "Desde $799.900",
    originalPrice: "Antes $1.299.900",
    installments: 6,
    monthlyAmount: "$133.317",
    discount: "-38%",
    condition: "Outlet" as const,
    category: "Saldos"
  }
];

const promotionProducts: Product[] = [
  {
    id: "p1",
    name: "Samsung Galaxy A05S",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    currentPrice: "$299.900",
    installments: 6,
    monthlyAmount: "$49.983",
    condition: "Como Nuevo" as const,
    category: "Samsung"
  },
  {
    id: "p2", 
    name: "Samsung Galaxy A13 (2022)",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    currentPrice: "$299.900",
    originalPrice: "$349.900",
    discount: "14%",
    installments: 6,
    monthlyAmount: "$49.983",
    condition: "Outlet" as const,
    category: "Samsung"
  },
  {
    id: "p3",
    name: "iPad Mini 4 4ta Gen",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", 
    currentPrice: "$424.900",
    originalPrice: "$539.900",
    discount: "21%",
    installments: 6,
    monthlyAmount: "$70.817",
    condition: "Outlet" as const,
    category: "iPad"
  },
  {
    id: "p4",
    name: "Vivo Y22s",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    currentPrice: "$429.900", 
    originalPrice: "$479.900",
    discount: "10%",
    installments: 6,
    monthlyAmount: "$71.650",
    condition: "Outlet" as const,
    category: "Otras Marcas"
  },
  {
    id: "p5",
    name: "iPhone 13 Pro",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    currentPrice: "$1.299.900",
    originalPrice: "$1.499.900", 
    discount: "13%",
    installments: 12,
    monthlyAmount: "$108.325",
    condition: "Como Nuevo" as const,
    category: "iPhone"
  },
  {
    id: "p6",
    name: "Samsung Galaxy S22",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    currentPrice: "$899.900",
    originalPrice: "$1.099.900",
    discount: "18%", 
    installments: 12,
    monthlyAmount: "$74.992",
    condition: "Outlet" as const,
    category: "Samsung"
  },
  {
    id: "p7",
    name: "Apple Watch Series 8",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    currentPrice: "$799.900",
    originalPrice: "$999.900",
    discount: "20%",
    installments: 6,
    monthlyAmount: "$133.317",
    condition: "Como Nuevo" as const,
    category: "Apple Watch"
  },
  {
    id: "p8",
    name: "iPhone 15 Pro Max",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    currentPrice: "$1.599.900",
    originalPrice: "$1.899.900",
    discount: "16%",
    installments: 12,
    monthlyAmount: "$133.325",
    condition: "Nuevo" as const,
    category: "iPhone"
  },
  {
    id: "p9",
    name: "Samsung Galaxy S23 Sin IVA",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    currentPrice: "$1.199.900",
    originalPrice: "$1.399.900",
    discount: "14%",
    installments: 12,
    monthlyAmount: "$99.992",
    condition: "Como Nuevo" as const,
    category: "Sin IVA"
  },
  {
    id: "p10",
    name: "iPhone 14 Saldos",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    currentPrice: "$899.900",
    originalPrice: "$1.199.900",
    discount: "25%",
    installments: 12,
    monthlyAmount: "$74.992",
    condition: "Outlet" as const,
    category: "Saldos"
  },
  {
    id: "p11",
    name: "iPad Air Sin IVA",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    currentPrice: "$1.099.900",
    originalPrice: "$1.299.900",
    discount: "15%",
    installments: 12,
    monthlyAmount: "$91.658",
    condition: "Como Nuevo" as const,
    category: "Sin IVA"
  },
  {
    id: "p12",
    name: "Samsung Galaxy A54 Saldos",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    currentPrice: "$399.900",
    originalPrice: "$599.900",
    discount: "33%",
    installments: 6,
    monthlyAmount: "$66.650",
    condition: "Outlet" as const,
    category: "Saldos"
  }
];

const productDetails: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Samsung Galaxy A05S",
    brand: "SAMSUNG",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    currentPrice: "$299.900",
    originalPrice: "$349.900",
    discount: "14%",
    installments: 6,
    monthlyAmount: "$49.983",
    condition: "Como Nuevo",
    category: "Samsung",
    capacity: ["64GB", "128GB"],
    color: ["Gray", "White", "Green"],
    description: "El Samsung Galaxy A05S es un smartphone confiable con características esenciales y rendimiento sólido.",
    features: [
      "Pantalla HD+ de 6.7 pulgadas",
      "Procesador MediaTek Helio G85",
      "Cámara triple de 50MP",
      "Batería de 5000mAh",
      "Android 13"
    ]
  },
  "2": {
    id: "2",
    name: "Samsung Galaxy A13 (2022)",
    brand: "SAMSUNG",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    currentPrice: "$299.900",
    originalPrice: "$349.900",
    discount: "14%",
    installments: 6,
    monthlyAmount: "$49.983",
    condition: "Outlet",
    category: "Samsung",
    capacity: ["64GB", "128GB"],
    color: ["Black", "White", "Blue"],
    description: "El Samsung Galaxy A13 ofrece un excelente equilibrio entre rendimiento y precio.",
    features: [
      "Pantalla HD+ de 6.6 pulgadas",
      "Procesador Exynos 850",
      "Cámara cuádruple de 50MP",
      "Batería de 5000mAh",
      "Android 12"
    ]
  },
  "3": {
    id: "3",
    name: "iPad Mini 4 4ta Gen",
    brand: "APPLE",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    currentPrice: "$424.900",
    originalPrice: "$539.900",
    discount: "21%",
    installments: 6,
    monthlyAmount: "$70.817",
    condition: "Outlet",
    category: "iPad",
    capacity: ["64GB", "128GB", "256GB"],
    color: ["Space Gray", "Silver", "Gold"],
    description: "El iPad Mini 4ta Gen combina portabilidad y potencia en un diseño compacto.",
    features: [
      "Pantalla Liquid Retina de 8.3 pulgadas",
      "Chip A15 Bionic",
      "Cámara trasera de 12MP",
      "Cámara frontal de 12MP",
      "Touch ID"
    ]
  },
  "4": {
    id: "4",
    name: "Vivo Y22s",
    brand: "VIVO",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    currentPrice: "$429.900",
    originalPrice: "$479.900",
    discount: "10%",
    installments: 6,
    monthlyAmount: "$71.650",
    condition: "Outlet",
    category: "Otras Marcas",
    capacity: ["128GB"],
    color: ["Black", "White", "Blue"],
    description: "El Vivo Y22s ofrece características premium a un precio accesible.",
    features: [
      "Pantalla HD+ de 6.55 pulgadas",
      "Procesador Snapdragon 680",
      "Cámara dual de 50MP",
      "Batería de 5000mAh",
      "Android 12"
    ]
  },
  "5": {
    id: "5",
    name: "iPhone 13 Pro",
    brand: "APPLE",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    currentPrice: "$1.299.900",
    originalPrice: "$1.499.900",
    discount: "13%",
    installments: 12,
    monthlyAmount: "$108.325",
    condition: "Como Nuevo",
    category: "iPhone",
    capacity: ["128GB", "256GB", "512GB", "1TB"],
    color: ["Graphite", "Gold", "Silver", "Sierra Blue"],
    description: "El iPhone 13 Pro ofrece rendimiento profesional con el chip A15 Bionic.",
    features: [
      "Pantalla Super Retina XDR de 6.1 pulgadas",
      "Chip A15 Bionic",
      "Sistema de cámara Pro de 12MP",
      "Batería de hasta 22 horas de video",
      "Resistente al agua IP68"
    ]
  },
  "6": {
    id: "6",
    name: "Samsung Galaxy S22",
    brand: "SAMSUNG",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    currentPrice: "$899.900",
    originalPrice: "$1.099.900",
    discount: "18%",
    installments: 12,
    monthlyAmount: "$74.992",
    condition: "Outlet",
    category: "Samsung",
    capacity: ["128GB", "256GB"],
    color: ["Phantom Black", "Phantom White", "Green", "Pink Gold"],
    description: "El Samsung Galaxy S22 combina diseño elegante con rendimiento excepcional.",
    features: [
      "Pantalla Dynamic AMOLED 2X de 6.1 pulgadas",
      "Procesador Snapdragon 8 Gen 1",
      "Cámara triple de 50MP",
      "Batería de 3700mAh",
      "Resistente al agua IP68"
    ]
  },
  "7": {
    id: "7",
    name: "Apple Watch Series 8",
    brand: "APPLE",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    currentPrice: "$799.900",
    originalPrice: "$999.900",
    discount: "20%",
    installments: 6,
    monthlyAmount: "$133.317",
    condition: "Como Nuevo",
    category: "Apple Watch",
    capacity: ["41mm", "45mm"],
    color: ["Midnight", "Starlight", "Silver", "Gold"],
    description: "El Apple Watch Series 8 es el reloj inteligente más avanzado de Apple.",
    features: [
      "Pantalla Always-On Retina",
      "Chip S8",
      "Detección de caídas",
      "Resistente al agua hasta 50 metros",
      "Hasta 18 horas de batería"
    ]
  },
  "8": {
    id: "8",
    name: "iPhone 15 Pro Max",
    brand: "APPLE",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    currentPrice: "$1.599.900",
    originalPrice: "$1.899.900",
    discount: "16%",
    installments: 12,
    monthlyAmount: "$133.325",
    condition: "Nuevo",
    category: "iPhone",
    capacity: ["256GB", "512GB", "1TB"],
    color: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    description: "El iPhone 15 Pro Max es el smartphone más avanzado de Apple con el chip A17 Pro.",
    features: [
      "Pantalla Super Retina XDR de 6.7 pulgadas",
      "Chip A17 Pro",
      "Sistema de cámara Pro de 48MP",
      "Batería de hasta 29 horas de video",
      "Resistente al agua IP68"
    ]
  }
};

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

