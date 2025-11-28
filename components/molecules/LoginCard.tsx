import LoginForm from "./LoginForm"

export default function LoginCard() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}

