import InputField from "../atoms/InputField"
import Button from "../atoms/Button"

export default function LoginForm() {
  return (
    <div className="space-y-6">
      {/* Formulario */}
      <form className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Correo</label>
          <InputField type="email" placeholder="Ingresa tu correo" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Contraseña</label>
          <InputField type="password" placeholder="Ingresa tu contraseña" />
        </div>
        <Button label="Iniciar Sesión" />
      </form>

      {/* Enlaces adicionales */}
      <div className="text-center space-y-2">
        <a href="#" className="text-sm text-green-600 hover:text-green-800">
          ¿Olvidaste tu contraseña?
        </a>
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-green-600 hover:text-green-800 font-medium">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  )
}