import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Promociones y Ofertas - UpGrade",
  description: "Descubre las mejores promociones y ofertas en productos tecnológicos reacondicionados. Descuentos especiales, productos outlet y ofertas limitadas en UpGrade.",
}

export default function PromotionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
