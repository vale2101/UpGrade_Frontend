import type { Metadata } from 'next'

// Mapeo de slugs a nombres de categorías
const categoryMap: { [key: string]: string } = {
  "samsung": "Samsung",
  "iphone": "iPhone", 
  "apple-watch": "Apple Watch",
  "ipad": "iPad",
  "otras-marcas": "Otras Marcas",
  "sin-iva": "Sin IVA",
  "saldos": "Saldos"
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const categoryName = categoryMap[params.slug] || "Categoría";
  
  return {
    title: `${categoryName} - UpGrade`,
    description: `Explora los mejores productos ${categoryName.toLowerCase()} reacondicionados en UpGrade. Calidad garantizada, precios increíbles y envío gratis en Colombia.`,
  }
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
