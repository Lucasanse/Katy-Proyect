export default function Header({ onHomeClick, onConsultarClick }) {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo o Título clickeable */}
        <div
          className="font-bold text-xl text-blue-600 cursor-pointer flex items-center gap-2"
          onClick={onHomeClick}
        >
          <span>Misión Siniestros</span>
        </div>

        {/* Navegación / Botón volver al inicio */}
        <nav className="flex items-center gap-6">
          <button
            onClick={onConsultarClick}
            className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            Consultar Reclamo
          </button>
          <button
            onClick={onHomeClick}
            className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            Inicio
          </button>
        </nav>
      </div>
    </header>
  );
}