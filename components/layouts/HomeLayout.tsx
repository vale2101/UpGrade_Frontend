import NavBar from "../organisms/Header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAVBAR */}
      <NavBar />

      {/* MAIN - aquí va el contenido */}
      <main className="flex-1 w-full">{children}</main>

      {/* FOOTER */}
      <footer className="bg-black text-gray-300 py-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} CleverCel. Todos los derechos reservados.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="/politicas" className="hover:text-[#57ad63]">Políticas</a>
            <a href="/terminos" className="hover:text-[#57ad63]">Términos</a>
            <a href="/contacto" className="hover:text-[#57ad63]">Contacto</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
