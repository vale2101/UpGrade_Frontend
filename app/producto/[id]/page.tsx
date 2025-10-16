"use client";
import { useParams } from "next/navigation";
import MainLayout from "../../../components/organisms/MainLayout";
import ProductDetailSection from "../../../components/organisms/ProductDetailSection";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  return (
    <MainLayout>
      <ProductDetailSection productId={productId} />
    </MainLayout>
  );
}
