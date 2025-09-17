import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Carrito de Compras - UpGrade",
  description: "Revisa los productos en tu carrito de compras. Modifica cantidades, elimina productos y procede al pago de forma segura con UpGrade.",
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
