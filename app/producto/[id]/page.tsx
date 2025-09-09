"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import HomeLayout from "../../../components/layouts/HomeLayout";
import BackToHomeButton from "../../../components/atoms/BackToHomeButton";
import { useCart } from "../../../contexts/CartContext";

// Datos de productos (en un proyecto real vendrían de una API)
const productos = {
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
    colors: ["Gray", "White", "Green"],
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
    colors: ["Black", "White", "Blue"],
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
    colors: ["Space Gray", "Silver", "Gold"],
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
    colors: ["Black", "White", "Blue"],
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
    colors: ["Graphite", "Gold", "Silver", "Sierra Blue"],
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
    colors: ["Phantom Black", "Phantom White", "Green", "Pink Gold"],
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
    colors: ["Midnight", "Starlight", "Silver", "Gold"],
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
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
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

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState("Outlet");
  const [selectedCapacity, setSelectedCapacity] = useState("128GB");
  const [selectedColor, setSelectedColor] = useState("Gray");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = productos[productId as keyof typeof productos];

  if (!product) {
    return (
      <HomeLayout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <BackToHomeButton />
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
              <p className="text-gray-600">El producto que buscas no existe o ha sido eliminado.</p>
            </div>
          </div>
        </div>
      </HomeLayout>
    );
  }

  const handleAddToCart = () => {
    // Agregar el producto al carrito con las opciones seleccionadas
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.currentPrice,
        originalPrice: product.originalPrice,
        discount: product.discount,
        condition: selectedCondition,
        capacity: selectedCapacity,
        color: selectedColor,
        category: product.category
      });
    }
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <BackToHomeButton />
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Galería de imágenes */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-black' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-center text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Información del producto */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-semibold text-gray-600">{product.brand}</span>
                    <span className="text-sm text-green-600 font-medium">Disponible</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Descuento {product.discount} IVA incluido</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-gray-900">{product.currentPrice}</span>
                      <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {product.installments} cuotas 0% interés {product.monthlyAmount}*
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-100 border border-red-300 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-semibold text-red-800">¡BAJÓ DE PRECIO! APROVECHA AHORA</span>
                    </div>
                  </div>
                </div>

                {/* Selector de cantidad */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Cantidad:</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Botón agregar al carrito */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full font-bold py-4 px-6 rounded-lg transition-colors ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                  }`}
                >
                  {addedToCart ? '✓ AGREGADO AL CARRITO' : 'AÑADIR AL CARRITO'}
                </button>
                
                {addedToCart && (
                  <div className="mt-2 text-center">
                    <p className="text-green-600 text-sm font-medium">
                      ¡Producto agregado al carrito! ({quantity} unidad{quantity !== 1 ? 'es' : ''})
                    </p>
                  </div>
                )}

                {/* Opciones de personalización */}
                <div className="space-y-4">
                  {/* Categoría */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Categoría: {selectedCondition}
                    </label>
                    <div className="flex space-x-2">
                      {["Outlet", "Semi Nuevo", "Como Nuevo"].map((condition) => (
                        <button
                          key={condition}
                          onClick={() => setSelectedCondition(condition)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedCondition === condition
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {condition}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Capacidad */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Capacidad: {selectedCapacity}
                    </label>
                    <div className="flex space-x-2">
                      {product.capacity.map((cap) => (
                        <button
                          key={cap}
                          onClick={() => setSelectedCapacity(cap)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedCapacity === cap
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {cap}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Color: {selectedColor}
                    </label>
                    <div className="flex space-x-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedColor === color
                              ? 'border-black'
                              : 'border-gray-300'
                          }`}
                          style={{
                            backgroundColor: color === 'Gray' ? '#6B7280' :
                                           color === 'White' ? '#FFFFFF' :
                                           color === 'Green' ? '#10B981' :
                                           color === 'Beige' ? '#F3E8FF' :
                                           color === 'Purple' ? '#8B5CF6' :
                                           color === 'Black' ? '#000000' :
                                           color === 'Blue' ? '#3B82F6' :
                                           color === 'Natural Titanium' ? '#D1D5DB' :
                                           color === 'Blue Titanium' ? '#60A5FA' :
                                           color === 'White Titanium' ? '#F9FAFB' :
                                           color === 'Black Titanium' ? '#374151' : '#6B7280'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>

                {/* Características */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Características principales</h3>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
