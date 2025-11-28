import Header from "./Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <footer className="bg-black text-gray-300 py-4 sm:py-6 mt-6 sm:mt-8 md:mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} UpGrade. Todos los derechos reservados.
          </p>
          <nav className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <a href="/politicas" className="hover:text-[#57ad63] transition-colors">Políticas</a>
            <a href="/terminos" className="hover:text-[#57ad63] transition-colors">Términos</a>
            <a href="/contacto" className="hover:text-[#57ad63] transition-colors">Contacto</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}


