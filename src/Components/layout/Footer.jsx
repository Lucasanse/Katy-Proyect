import logo from '../../assets/logos/2-Fondo BLANCO.png';

export default function Footer({ onStart }) {
  return (
    <footer className="bg-slate-100 text-slate-600 py-14">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl text-slate-900 mb-3">¿Listo para empezar?</h2>
          <p className="text-slate-600 mb-6">
            Iniciá tu denuncia ahora mismo, no lleva más de unos minutos.
          </p>
          <button
            onClick={onStart}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-[1.03]"
          >
            Iniciar Nuevo Reclamo
          </button>
        </div>

        <div className="text-center md:text-right md:border-l md:border-slate-300 md:pl-10">
          <img src={logo} alt="Misión Siniestros" className="h-10 w-auto mx-auto md:mx-0 md:ml-auto mb-3" />
          <p className="text-sm text-slate-700">
            &copy; {new Date().getFullYear()} Misión Siniestros. Todos los derechos reservados.
          </p>
          <p className="text-xs mt-2 text-slate-500">
            Contacto: misionsiniestros@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
