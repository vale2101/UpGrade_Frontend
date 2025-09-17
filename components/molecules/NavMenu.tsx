import NavLink from "../atoms/NavLink";

interface NavMenuProps {
  mobile?: boolean;
}

export default function NavMenu({ mobile = false }: NavMenuProps) {
  if (mobile) {
    return (
      <nav className="flex flex-col space-y-4">
        <NavLink href="/promociones" highlight mobile>Promociones</NavLink>
        <NavLink href="/about" mobile>¿Quiénes somos?</NavLink>
        <NavLink href="/ayuda" mobile>Te ayudamos</NavLink>
        <NavLink href="/reparaciones" mobile>Reparaciones</NavLink>
        <NavLink href="/metodos-pago" mobile>Métodos de pago</NavLink>
      </nav>
    );
  }

  return (
    <nav className="flex gap-4">
      <NavLink href="/promociones" highlight>Promociones</NavLink>
      <NavLink href="/about">¿Quiénes somos?</NavLink>
      <NavLink href="/ayuda">Te ayudamos</NavLink>
      <NavLink href="/reparaciones">Reparaciones</NavLink>
      <NavLink href="/metodos-pago">Métodos de pago</NavLink>
    </nav>
  );
}
