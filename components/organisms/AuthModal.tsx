"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthService } from "../../hooks/useAuthService";
import ModalHeader from "../atoms/ModalHeader";
import ErrorAlert from "../atoms/ErrorAlert";
import AuthForm from "../molecules/AuthForm";
import DemoCredentials from "../atoms/DemoCredentials";

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, register, loading, error } = useAuthService();
  const [isLogin, setIsLogin] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: AuthFormData) => {
    setLocalError(null);
    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          onClose();
          router.push("/about"); 
        } else {
          setLocalError("Credenciales inválidas");
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setLocalError("Las contraseñas no coinciden");
          return;
        }
        const success = await register(formData.name!, formData.email, formData.password);
        if (success) {
          onClose();
          router.push("/register"); 
        } else {
          setLocalError("Error al crear la cuenta");
        }
      }
    } catch (err) {
      setLocalError("Ocurrió un error inesperado");
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setLocalError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <ModalHeader
            title={isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            onClose={onClose}
          />

          {(error || localError) && (
            <ErrorAlert message={localError || error || ""} />
          )}

          <AuthForm
            isLogin={isLogin}
            onSubmit={handleSubmit}
            isLoading={loading}
          />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
            </p>
            <button
              type="button"
              onClick={handleToggleMode}
              className="text-black font-medium hover:underline mt-1"
            >
              {isLogin ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </div>

          <DemoCredentials />
        </div>
      </div>
    </div>
  );
}
