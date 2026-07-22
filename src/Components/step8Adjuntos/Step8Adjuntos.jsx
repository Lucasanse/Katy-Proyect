import React from 'react';

const Step8Adjuntos = ({ formData }) => {
  // Lista de categorías requeridas por el RF-08[cite: 1]
  const categoriasDocumentacion = [
    { id: 'patente', label: 'Fotos de patente', req: true },
    { id: 'danios', label: 'Fotos de daños en detalle', req: true },
    { id: 'dni', label: 'DNI (Frente y Dorso)', req: true },
    { id: 'licencia', label: 'Licencia de Conducir (Frente y Dorso)', req: true },
    { id: 'cedula', label: 'Cédula Verde / Azul', req: true },
    { id: 'denuncia', label: 'Denuncia administrativa previa', req: true },
    { id: 'cobertura', label: 'Certificado de cobertura', req: true },
    { id: 'presupuesto', label: 'Presupuesto de reparación', req: true },
  ];

  const handleSubmitFinal = (e) => {
    e.preventDefault();
    console.log("Listos para procesar los adjuntos");
    // Aquí irá la validación de que todos los obligatorios estén cargados
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">RF-08[cite: 1]</span>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">
          Gestión de Archivos Adjuntos[cite: 1]
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Carga categorizada y obligatoria de evidencias visuales y documentación legal[cite: 1].
        </p>
      </div>

      <form onSubmit={handleSubmitFinal}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {categoriasDocumentacion.map((cat) => (
            <div 
              key={cat.id} 
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col justify-between hover:border-blue-400 transition-colors bg-gray-50/50"
            >
              <div className="flex justify-between items-start mb-3">
                <label className="font-semibold text-gray-700 text-sm">
                  {cat.label}
                </label>
                {cat.req && (
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded">
                    Obligatorio[cite: 1]
                  </span>
                )}
              </div>

              {/* Placeholder para la futura integración con Cloudinary[cite: 1] */}
              <div className="bg-white border border-gray-200 rounded p-4 text-center">
                <p className="text-xs text-gray-400 mb-2">
                  [ Espacio reservado para widget de Cloudinary ][cite: 1]
                </p>
                <button
                  type="button"
                  disabled
                  className="bg-gray-100 text-gray-500 text-xs px-3 py-1.5 rounded border border-gray-300 cursor-not-allowed font-medium"
                >
                  Seleccionar archivo
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2.5 rounded-lg shadow transition-colors"
          >
            Confirmar y Enviar Siniestro[cite: 1]
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step8Adjuntos;