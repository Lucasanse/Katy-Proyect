export default function Header({ onHomeClick, onConsultarClick }) {
  return (
    <header className="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Marca (solo tipografía, sin logo) */}
        <button
          type="button"
          onClick={onHomeClick}
          className="font-display font-extrabold tracking-tight text-lg sm:text-xl text-slate-900 flex items-center gap-2 cursor-pointer"
        >
          <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />
          <span>
            MISIÓN <span className="text-blue-600">SINIESTROS</span>
          </span>
        </button>

        {/* Navegación / Botón volver al inicio */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onConsultarClick}
            className="text-sm sm:text-base text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            Consultar Reclamo
          </button>
          <button
            onClick={onHomeClick}
            className="text-sm sm:text-base text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            Inicio
          </button>
        </nav>
      </div>
    </header>
  );
}
