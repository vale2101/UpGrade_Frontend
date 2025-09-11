import { Product } from './data';

// Productos detallados para la página de producto individual
export const productDetails: Record<string, Product> = {
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

// Función para obtener un producto por ID
export const getProductDetailById = (id: string): Product | undefined => {
  return productDetails[id];
};
