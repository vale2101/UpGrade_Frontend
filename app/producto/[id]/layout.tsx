import type { Metadata } from 'next'
import { getProductDetail } from '../../../db/data'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = getProductDetail(params.id);
  
  if (!product) {
    return {
      title: "Producto no encontrado - UpGrade",
      description: "El producto que buscas no existe o ha sido eliminado.",
    }
  }

  return {
    title: `${product.name} - UpGrade`,
    description: `${product.name} reacondicionado en UpGrade. ${product.description || ''} Calidad garantizada, precio ${product.currentPrice} y envío gratis en Colombia.`,
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
