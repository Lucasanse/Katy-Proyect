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
      <section className="bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 py-14 md:py-20 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4">
            Gestión de siniestros
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6 leading-tight">
            Denunciá tu siniestro sin vueltas
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
            Iniciá la carga de tu reclamo de manera rápida y ordenada. Tené a mano los datos de
            contacto, del siniestro y de la compañía aseguradora.
          </p>
          <button
            onClick={onStart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg shadow-lg transition-transform hover:scale-[1.03] mb-10"
          >
            Iniciar Nuevo Reclamo
          </button>

          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-blue-600 font-bold">✓</span> 100% online
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-blue-600 font-bold">✓</span> Seguimiento en tiempo real
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-blue-600 font-bold">✓</span> Sin papeleo
            </li>
          </ul>
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

    </div>
  );
}
