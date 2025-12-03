import type { Metadata } from "next";
import type { ResolvingMetadata } from "next";

const categoryMap: Record<string, string> = {
  samsung: "Samsung",
  iphone: "iPhone",
  "apple-watch": "Apple Watch",
  ipad: "iPad",
  "otras-marcas": "Otras Marcas",
  "sin-iva": "Sin IVA",
  saldos: "Saldos",
};

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  _parent?: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = categoryMap[slug] || "Todos los Productos";

  return {
    title: `${categoryName} - UpGrade`,
    description:
      categoryName === "Todos los Productos"
        ? "Explora todos los productos tecnológicos reacondicionados en UpGrade. Calidad garantizada, precios increíbles y envío gratis en Colombia."
        : `Explora los mejores productos ${categoryName.toLowerCase()} reacondicionados en UpGrade. Calidad garantizada, precios increíbles y envío gratis en Colombia.`,
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
