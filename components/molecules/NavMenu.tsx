import NavLink from "../atoms/NavLink";

export default function NavMenu() {
  return (
    <nav className="flex gap-4">
      <NavLink href="/about">¿Quiénes somos?</NavLink>
      <NavLink href="/metodos-pago">Métodos de pago</NavLink>
      <NavLink href="/promociones" highlight>Promociones</NavLink>
      <NavLink href="/ayuda">Te ayudamos</NavLink>
      <NavLink href="/reparaciones">Reparaciones</NavLink>
      <NavLink href="/blog">Blog</NavLink>
    </nav>
  );
}
