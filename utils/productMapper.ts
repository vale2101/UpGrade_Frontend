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
  stock?: number;
}

export function mapProductoToProduct(producto: productoInterface): Product {
  const price = typeof producto.precio === "string" 
    ? parseFloat(producto.precio.replace(/[^0-9.-]/g, "")) || 0
    : producto.precio || 0;
    
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);

  const installments = 6;
  const monthlyAmount = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price / installments);

  const images: string[] = [producto.foto];
  if (producto.foto2) images.push(producto.foto2);
  if (producto.foto3) images.push(producto.foto3);

  return {
    id: producto.id_producto?.toString() || "",
    name: producto.nombre,
    image: producto.foto,
    images: images,
    currentPrice: formattedPrice,
    originalPrice: undefined,
    discount: undefined,
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

export function extractBrand(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("samsung") || lower.includes("galaxy")) return "Samsung";
  if (lower.includes("iphone") || lower.includes("ipad") || lower.includes("apple watch")) return "iPhone";
  if (lower.includes("vivo")) return "Vivo";
  if (lower.includes("xiaomi")) return "Xiaomi";
  if (lower.includes("huawei")) return "Huawei";
  return "Otras Marcas";
}

export function mapSlugToBackendCategory(slug: string): string | null {
  const slugMap: { [key: string]: string } = {
    "samsung": "Samsung",
    "iphone": "iPhone",
    "apple-watch": "Apple Watch",
    "ipad": "iPad",
    "otras-marcas": "Otras Marcas",
    "sin-iva": "Sin IVA",
    "saldos": "Saldos",
    "todas": "null",
  };
  
  return slugMap[slug.toLowerCase()] ?? null;
}

export function filterProductsByCategory(
  products: Product[],
  category: string | null
): Product[] {
  if (!category || category === "Todas") {
    return products;
  }

  return products.filter((product) => {
    if (!product.category) return false;
    
    return product.category.toLowerCase() === category.toLowerCase();
  });
}

