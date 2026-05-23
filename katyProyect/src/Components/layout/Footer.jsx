export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Portal de Reclamos. Todos los derechos reservados.
        </p>
        <p className="text-xs mt-2 text-slate-500">
          Contacto: documentacion@estudio.com
        </p>
      </div>
    </footer>
  );
}