"use client";
import { useParams } from "next/navigation";
import MainLayout from "../../../components/organisms/MainLayout";
import CategorySection from "../../../components/organisms/CategorySection";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <MainLayout>
      <CategorySection slug={slug} />
    </MainLayout>
  );
}
