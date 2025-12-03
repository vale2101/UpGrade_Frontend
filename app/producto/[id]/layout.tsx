import type { Metadata } from 'next'

export async function generateMetadata(
  _props: { params: { id: string } }
): Promise<Metadata> {
  return {
    title: "Producto - UpGrade",
    description: "Producto reacondicionado en UpGrade. Calidad garantizada y envío gratis en Colombia.",
  }
}

export default function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return <>{children}</>
}
