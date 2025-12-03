import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  return {
    title: "Producto - UpGrade",
    description:
      "Producto reacondicionado en UpGrade. Calidad garantizada y envío gratis en Colombia.",
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
