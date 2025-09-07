import HomeLayout from "../components/layouts/HomeLayout";
import CategoryMenu from "../components/molecules/CategoryMenu";
import HeroBanner from "../components/organisms/HeroBanner";

export default function HomePage() {
  return (
    <HomeLayout>
      {/* Menú superior (blanco) */}
      <CategoryMenu />

      {/* Banner principal (rosado) */}
      <HeroBanner />
    </HomeLayout>
  );
}
