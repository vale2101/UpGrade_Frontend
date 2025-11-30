"use client";
import { useParams } from "next/navigation";
import MainLayout from "../../../../components/organisms/MainLayout";
import OrderDetailSection from "../../../../components/organisms/OrderDetailSection";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  return (
    <MainLayout>
      <OrderDetailSection orderId={orderId} />
    </MainLayout>
  );
}

