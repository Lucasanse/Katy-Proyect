export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-display font-bold tracking-tight text-white text-sm">
          MISIÓN SINIESTROS
        </p>
        <p className="text-sm mt-2">
          &copy; {new Date().getFullYear()} Misión Siniestros. Todos los derechos reservados.
        </p>
        <p className="text-xs mt-2 text-slate-400">
          Contacto: documentacion@estudio.com
        </p>
      </div>
    </footer>
  );
}
