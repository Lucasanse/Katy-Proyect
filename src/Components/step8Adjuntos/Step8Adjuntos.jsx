import React, { useEffect, useState } from 'react';

const categoriasDocumentacion = [
  { id: 'patente', label: 'Fotos de patente', req: true },
  { id: 'danios', label: 'Fotos de daños en detalle', req: true },
  { id: 'dni', label: 'DNI (Frente y Dorso)', req: true },
  { id: 'licencia', label: 'Licencia de Conducir (Frente y Dorso)', req: false },
  { id: 'cedula', label: 'Cédula Verde / Azul', req: false },
  { id: 'denuncia', label: 'Denuncia administrativa previa', req: false },
  { id: 'cobertura', label: 'Certificado de cobertura', req: false },
  { id: 'presupuesto', label: 'Presupuesto de reparación', req: false },
];

function FilePreview({ archivo }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!archivo || !archivo.type.startsWith('image/')) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(archivo);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [archivo]);

  if (previewUrl) {
    return <img src={previewUrl} alt={archivo.name} className="w-full h-24 object-cover rounded" />;
  }
  return (
    <div className="w-full h-24 flex items-center justify-center bg-slate-100 rounded text-xs text-slate-500 px-2 text-center">
      {archivo.name}
    </div>
  );
}

export default function Step8Adjuntos({ prevStep, onSubmitFinal, enviando, errorEnvio, siniestroCreado, onFinish }) {
  const [archivos, setArchivos] = useState({});

  function handleFileChange(categoriaId, file) {
    setArchivos((prev) => ({ ...prev, [categoriaId]: file }));
  }

  function handleRemoveFile(categoriaId) {
    setArchivos((prev) => {
      const next = { ...prev };
      delete next[categoriaId];
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitFinal(archivos);
  }

  if (siniestroCreado) {
    return (
      <div className="bg-white p-8 rounded-lg text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Reclamo registrado con éxito!</h2>
        <p className="text-gray-600 mb-6">
          Tu siniestro quedó cargado con el número <strong>#{siniestroCreado.id}</strong>. Nos pondremos en contacto a la brevedad.
        </p>
        {onFinish && (
          <button
            type="button"
            onClick={onFinish}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow transition-colors"
          >
            Volver al inicio
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">Último paso</span>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">Gestión de Archivos Adjuntos</h2>
        <p className="text-gray-600 text-sm mt-1">
          Adjuntá la evidencia y documentación disponible. Podés enviar el reclamo aunque todavía te falte algo.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {categoriasDocumentacion.map((cat) => {
            const archivo = archivos[cat.id];
            return (
              <div
                key={cat.id}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col justify-between hover:border-blue-400 transition-colors bg-gray-50/50"
              >
                <div className="flex justify-between items-start mb-3">
                  <label className="font-semibold text-gray-700 text-sm">{cat.label}</label>
                  {cat.req && (
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded">Recomendado</span>
                  )}
                </div>

                {archivo ? (
                  <div className="space-y-2">
                    <FilePreview archivo={archivo} />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(cat.id)}
                      className="text-xs text-red-600 hover:underline font-medium"
                    >
                      Quitar archivo
                    </button>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded p-4 text-center">
                    <label className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded border border-blue-200 cursor-pointer font-medium hover:bg-blue-100 transition-colors inline-block">
                      Seleccionar archivo
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => e.target.files[0] && handleFileChange(cat.id, e.target.files[0])}
                      />
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {errorEnvio && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">{errorEnvio}</p>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={enviando}
            className="px-6 py-2.5 text-slate-600 font-medium hover:underline disabled:opacity-50"
          >
            ← Paso anterior
          </button>
          <button
            type="submit"
            disabled={enviando}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-medium px-6 py-2.5 rounded-lg shadow transition-colors"
          >
            {enviando ? 'Enviando...' : 'Confirmar y Enviar Siniestro'}
          </button>
        </div>
      </form>
    </div>
  );
}
