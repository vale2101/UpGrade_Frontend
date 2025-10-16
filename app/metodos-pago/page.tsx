import MainLayout from "../../components/organisms/MainLayout";
import PaymentMethodsSection from "../../components/organisms/PaymentMethodsSection";

export const metadata = {
  title: "Métodos de Pago - UpGrade",
  description: "Conoce todos los métodos de pago disponibles en UpGrade. Pago seguro con tarjeta, transferencia bancaria, efectivo contra entrega y más opciones para tu comodidad."
};

export default function PaymentMethodsPage() {
  return (
    <MainLayout>
      <PaymentMethodsSection />
    </MainLayout>
  );
}
