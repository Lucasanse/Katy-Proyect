import logo from '../../assets/logos/3-Fondo VERDE.png';

export default function Header({ onHomeClick, onConsultarClick }) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={onHomeClick}
          className="font-display font-extrabold tracking-tight text-lg sm:text-xl text-white flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="" className="h-9 w-auto" aria-hidden="true" />
          <span>
            MISIÓN <span className="text-slate-300">SINIESTROS</span>
          </span>
        </button>

        {/* Navegación / Botón volver al inicio */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onConsultarClick}
            className="text-sm sm:text-base text-slate-300 hover:text-white font-medium transition-colors"
          >
            Consultar Reclamo
          </button>
          <button
            onClick={onHomeClick}
            className="text-sm sm:text-base text-slate-300 hover:text-white font-medium transition-colors"
          >
            Inicio
          </button>
        </nav>
      </div>
    </header>
  );
}
