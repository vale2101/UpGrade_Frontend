import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '../contexts/CartContext'
import { AuthProvider } from '../contexts/AuthContext'
import { CategoryProvider } from '../contexts/CategoryContext'
import { FilterProvider } from '../contexts/FilterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "UpGrade - Tecnología de Calidad al Mejor Precio",
  description: "Encuentra los mejores productos tecnológicos reacondicionados: iPhones, Samsung, iPads, Apple Watch y más. Calidad garantizada, precios increíbles y envío gratis en Colombia.",
  keywords: "tecnología, reacondicionados, iPhone, Samsung, iPad, Apple Watch, Colombia, ofertas, descuentos",
  openGraph: {
    title: "UpGrade - Tecnología de Calidad al Mejor Precio",
    description: "Encuentra los mejores productos tecnológicos reacondicionados: iPhones, Samsung, iPads, Apple Watch y más. Calidad garantizada, precios increíbles y envío gratis en Colombia.",
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "UpGrade - Tecnología de Calidad al Mejor Precio",
    description: "Encuentra los mejores productos tecnológicos reacondicionados: iPhones, Samsung, iPads, Apple Watch y más. Calidad garantizada, precios increíbles y envío gratis en Colombia.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <CategoryProvider>
              <FilterProvider>
                {children}
              </FilterProvider>
            </CategoryProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}