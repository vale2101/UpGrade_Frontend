import HeroImage from "@/components/organisms/HeroImage"
import RegisterForm from "@/components/molecules/RegisterForm"
import BackToHomeButton from "@/components/atoms/BackToHomeButton"

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <HeroImage />
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Registro</h1>
          <RegisterForm />
        </div>
      </div>
      <BackToHomeButton />
    </div>
  )
}
