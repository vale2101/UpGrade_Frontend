import HomeLayout from "../components/layouts/HomeLayout";
import CategoryMenu from "../components/molecules/CategoryMenu";
import HeroBanner from "../components/organisms/HeroBanner";
import CategoryTabs from "../components/molecules/CategoryTabs";
import ProductLayout from "../components/layouts/ProductLayout"; 
export default function HomePage() {
  return (
    <HomeLayout>
      {/* Menú superior (blanco) */}
      <CategoryMenu />

      {/* Banner principal (rosado) */}
      <HeroBanner />

      {/* Tabs debajo del banner */}
      <CategoryTabs />

      {/* Productos destacados */}
      <ProductLayout /> 
    </HomeLayout>
  );
}
