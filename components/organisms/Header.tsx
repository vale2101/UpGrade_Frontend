import Logo from "../atoms/Logo"
import NavMenu from "../molecules/NavMenu"
import ActionIcons from "../molecules/ActionIcons"

export default function NavBar() {
  return (
    <header className="bg-black text-white px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-8">
        <Logo />
        <NavMenu />
      </div>
      <ActionIcons />
    </header>
  )
}
