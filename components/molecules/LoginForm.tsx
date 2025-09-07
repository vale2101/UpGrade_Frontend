import InputField from "../atoms/InputField"
import Button from "../atoms/Button"

export default function LoginForm() {
  return (
    <form className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-700">Correo</label>
        <InputField type="email" placeholder="Ingresa tu correo" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Contraseña</label>
        <InputField type="password" placeholder="Ingresa tu contraseña" />
      </div>
      <Button label="Iniciar Sesion" />
    </form>
  )
}