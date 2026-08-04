const PASOS = [
  {
    numero: '01',
    titulo: 'Contanos qué pasó',
    detalle: 'Cargá tus datos y los detalles del siniestro en un formulario simple, paso a paso.',
  },
  {
    numero: '02',
    titulo: 'Sumá la documentación',
    detalle: 'Adjuntá fotos, licencia y demás evidencia directamente desde tu celular o computadora.',
  },
  {
    numero: '03',
    titulo: 'Seguí el estado',
    detalle: 'Con tu número de siniestro podés consultar el avance de tu reclamo cuando quieras.',
  },
];

export default function Home({ onStart }) {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">
              Gestión de siniestros
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6 leading-tight">
              Denunciá tu siniestro sin vueltas
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto md:mx-0">
              Iniciá la carga de tu reclamo de manera rápida y ordenada. Tené a mano los datos de
              contacto, del siniestro y de la compañía aseguradora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={onStart}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg shadow-lg transition-transform hover:scale-[1.03]"
              >
                Iniciar Nuevo Reclamo
              </button>
            </div>
          </div>

          {/* Motivo gráfico: solo tipografía y color, sin logo ni imágenes */}
          <div className="hidden md:block rounded-3xl bg-slate-900 shadow-xl p-10">
            <p className="font-display font-extrabold text-white text-2xl leading-snug mb-8">
              MISIÓN
              <br />
              SINIESTROS
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white text-xs">
                  ✓
                </span>
                <span className="text-slate-200">100% online</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white text-xs">
                  ✓
                </span>
                <span className="text-slate-200">Seguimiento en tiempo real</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white text-xs">
                  ✓
                </span>
                <span className="text-slate-200">Sin papeleo</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl text-slate-900 mb-4">Cómo funciona</h2>
            <p className="text-slate-600">
              Un proceso guiado en tres pasos, pensado para completarse en pocos minutos.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {PASOS.map((paso) => (
              <div
                key={paso.numero}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-8 hover:border-blue-300 transition-colors"
              >
                <span className="font-display font-extrabold text-4xl text-blue-600">
                  {paso.numero}
                </span>
                <h3 className="text-lg text-slate-900 mt-4 mb-2">{paso.titulo}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{paso.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl text-white mb-4">¿Listo para empezar?</h2>
          <p className="text-slate-300 mb-8">
            Iniciá tu denuncia ahora mismo, no lleva más de unos minutos.
          </p>
          <button
            onClick={onStart}
            className="bg-white hover:bg-slate-100 text-slate-900 font-semibold py-4 px-10 rounded-lg shadow-lg transition-transform hover:scale-[1.03]"
          >
            Iniciar Nuevo Reclamo
          </button>
        </div>
      </section>
    </div>
  );
}
