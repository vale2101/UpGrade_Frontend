import { productoInterface } from "../interfaces/producto.interface";

export interface Product {
  id: string;
  name: string;
  image: string;
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  installments?: number;
  monthlyAmount?: string;
  condition: string;
  category: string;
  capacity?: string | string[];
  color?: string | string[];
  brand?: string;
  images?: string[];
  stock?: number; // Stock del producto
}

/**
 * Mapea un productoInterface (del backend) a Product (formato del frontend)
 */
export function mapProductoToProduct(producto: productoInterface): Product {
  // Convertir precio a number si viene como string
  const price = typeof producto.precio === "string" 
    ? parseFloat(producto.precio.replace(/[^0-9.-]/g, "")) || 0
    : producto.precio || 0;
    
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);

  // Calcular cuotas mensuales (6 cuotas como predeterminado)
  const installments = 6;
  const monthlyAmount = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price / installments);

  // Obtener imágenes (filtrar valores null)
  const images: string[] = [producto.foto];
  if (producto.foto2) images.push(producto.foto2);
  if (producto.foto3) images.push(producto.foto3);

  return {
    id: producto.id_producto?.toString() || "",
    name: producto.nombre,
    image: producto.foto,
    images: images,
    currentPrice: formattedPrice,
    originalPrice: undefined, // Si el backend no proporciona precio original
    discount: undefined, // Si el backend no proporciona descuento
    installments: installments,
    monthlyAmount: monthlyAmount,
    condition: producto.tipo || "Reacondicionado",
    category: producto.categoria || "Todas",
    capacity: producto.capacidad ? [producto.capacidad] : undefined,
    color: producto.color ? [producto.color] : undefined,
    brand: extractBrand(producto.nombre),
    stock: producto.stock || 0,
  };
}

/**
 * Extrae la marca del nombre del producto
 */
export function extractBrand(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("samsung") || lower.includes("galaxy")) return "Samsung";
  if (lower.includes("iphone") || lower.includes("ipad") || lower.includes("apple watch")) return "iPhone";
  if (lower.includes("vivo")) return "Vivo";
  if (lower.includes("xiaomi")) return "Xiaomi";
  if (lower.includes("huawei")) return "Huawei";
  return "Otras Marcas";
}

/**
 * Mapea un slug a la categoría correspondiente del backend
 */
export function mapSlugToBackendCategory(slug: string): string | null {
  const slugMap: { [key: string]: string } = {
    "samsung": "Samsung",
    "iphone": "iPhone",
    "apple-watch": "Apple Watch",
    "ipad": "iPad",
    "otras-marcas": "Otras Marcas",
    "sin-iva": "Sin IVA",
    "saldos": "Saldos",
    "todas": null, // null significa mostrar todos
  };
  
  return slugMap[slug.toLowerCase()] ?? null;
}

/**
 * Filtra productos por categoría usando el campo categoria del backend
 */
export function filterProductsByCategory(
  products: Product[],
  category: string | null
): Product[] {
  // Si no hay categoría o es "Todas", mostrar todos los productos
  if (!category || category === "Todas") {
    return products;
  }

  // Filtrar directamente por el campo categoria del backend
  return products.filter((product) => {
    if (!product.category) return false;
    
    // Comparación case-insensitive del campo categoria
    return product.category.toLowerCase() === category.toLowerCase();
  });
}

