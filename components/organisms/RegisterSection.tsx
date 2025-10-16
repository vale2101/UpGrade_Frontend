import LoginHeroImage from "./LoginHeroImage";
import RegisterForm from "../molecules/RegisterForm";
import BackToHomeButton from "../atoms/BackToHomeButton";

export default function RegisterSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <LoginHeroImage />
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Registro</h1>
          <RegisterForm />
        </div>
      </div>
      <BackToHomeButton />
    </div>
  );
}

