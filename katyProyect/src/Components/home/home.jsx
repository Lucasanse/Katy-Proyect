export default function Home({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Portal de Reclamos a Terceros
        </h1>
        <p className="text-lg text-slate-600 mb-10">
          Inicie la carga de denuncias de manera rápida. Tenga a mano los datos del contacto, detalles del siniestro y la compañía aseguradora.
        </p>
        <button
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          Iniciar Nuevo Reclamo
        </button>
      </div>
    </div>
  );
}