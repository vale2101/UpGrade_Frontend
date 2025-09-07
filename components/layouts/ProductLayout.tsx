import ProductSection from "../organisms/ProductSection";

const productosDemo = [
  {
    image: "/s24ultra.png",
    title: "Samsung Galaxy S24 Ultra 5G",
    price: "Desde $3.599.900",
    oldPrice: "Antes $4.099.900",
    cuotas: "6 cuotas 0% interés $599.983*",
    tags: ["Outlet", "Semi Nuevo"],
    discount: "-12%",
  },
  {
    image: "/zfold5.png",
    title: "Samsung Galaxy Z Fold 5 (2024)",
    price: "Desde $3.599.900",
    oldPrice: "Antes $5.099.900",
    cuotas: "6 cuotas 0% interés $599.983*",
    tags: ["Outlet"],
    discount: "-29%",
  },
  {
    image: "/s24plus.png",
    title: "Samsung Galaxy S24 Plus 5G",
    price: "Desde $2.899.900",
    oldPrice: "Antes $3.599.900",
    cuotas: "6 cuotas 0% interés $483.317*",
    tags: ["Outlet", "Semi Nuevo", "Como Nuevo"],
    discount: "-19%",
  },
  {
    image: "/zfold4.png",
    title: "Samsung Galaxy Z Fold 4 (2023)",
    price: "Desde $2.799.900",
    oldPrice: "Antes $4.299.900",
    cuotas: "6 cuotas 0% interés $466.650*",
    tags: ["Outlet"],
    discount: "-35%",
  },
];

export default function ProductLayout() {
  return (
    <main>
      {/* Aquí puedes meter más secciones si quieres */}
      <ProductSection title="Productos Destacados" products={productosDemo} />
    </main>
  );
}
