import LoginHeroImage from "../atoms/LoginHeroImage";
import LoginCard from "./LoginCard";
import BackToHomeButton from "../atoms/BackToHomeButton";

export default function LoginSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <LoginHeroImage />
      <LoginCard />
      <BackToHomeButton />
    </div>
  );
}

