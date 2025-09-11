import LoginHeroImage from "../organisms/LoginHeroImage"
import LoginCard from "../organisms/LoginCard"
import BackToHomeButton from "../atoms/BackToHomeButton"

export default function LoginLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <LoginHeroImage />
      <LoginCard />
      <BackToHomeButton />
    </div>
  )
}