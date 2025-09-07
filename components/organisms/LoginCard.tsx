import LoginForm from "../molecules/LoginForm"

export default function LoginCard() {
  return (
    <div className="flex flex-col justify-center p-10 bg-white h-full shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <LoginForm />
    </div>
  )
}