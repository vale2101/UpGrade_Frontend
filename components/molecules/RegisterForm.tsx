import InputField from "../atoms/InputField"
import Button from "../atoms/Button"

export default function RegisterForm() {
  return (
    <div className="space-y-6">
      {/* Formulario */}
      <form className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Nombre completo</label>
          <InputField type="text" placeholder="Ingresa tu nombre completo" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Correo</label>
          <InputField type="email" placeholder="Ingresa tu correo" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Contraseña</label>
          <InputField type="password" placeholder="Ingresa tu contraseña" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Confirmar contraseña</label>
          <InputField type="password" placeholder="Confirma tu contraseña" />
        </div>
        <Button label="Registrarse" />
      </form>

      {/* Enlaces adicionales */}
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-green-600 hover:text-green-800 font-medium">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  )
}
