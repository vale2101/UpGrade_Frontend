import LoginHeroImage from "../atoms/LoginHeroImage";
import RegisterForm from "./RegisterForm";
import BackToHomeButton from "../atoms/BackToHomeButton";

export default function RegisterSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <LoginHeroImage />
      <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">Registro</h1>
          <RegisterForm />
        </div>
      </div>
      <BackToHomeButton />
    </div>
  );
}

