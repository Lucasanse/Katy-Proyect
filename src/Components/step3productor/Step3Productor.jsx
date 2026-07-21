import React from 'react';

// 1. Cambiamos 'onSubmit' por 'nextStep' y agregamos 'prevStep' en las props
export default function Step3Productor({ formData, setFormData, nextStep, prevStep }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleProductor = () => {
    setFormData({ ...formData, esProductor: !formData.esProductor });
  };

  return (
    // 2. Al enviar el formulario, ejecutamos nextStep() para avanzar al Paso 4
    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Intermediario / Asesor</h2>
        <p className="text-sm text-slate-500 mt-1">Si sos un productor gestionando este siniestro, por favor indicalo aquí.</p>
      </div>

      {/* Interruptor interactivo solicitado */}
      <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-200 rounded-lg">
        <span className="font-semibold text-slate-700 text-lg">¿Soy productor de seguros?</span>
        <button
          type="button"
          onClick={toggleProductor}
          className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            formData.esProductor ? 'bg-blue-600' : 'bg-slate-300'
          }`}
        >
          <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
            formData.esProductor ? 'translate-x-7' : 'translate-x-0'
          }`} />
        </button>
      </div>

      {/* Bloque oculto dinámico */}
      {formData.esProductor && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 animate-fadeIn">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Nombre y Apellido / Razón Social</label>
            <input 
              required={formData.esProductor} type="text" name="productorNombre" 
              value={formData.productorNombre || ''} onChange={handleChange}
              className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Número de Matrícula (SSN)</label>
            <input 
              required={formData.esProductor} type="text" name="productorMatricula" 
              value={formData.productorMatricula || ''} onChange={handleChange}
              className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Teléfono comercial</label>
            <input 
              required={formData.esProductor} type="tel" name="productorTelefono" 
              value={formData.productorTelefono || ''} onChange={handleChange}
              className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Correo electrónico (Notificaciones)</label>
            <input 
              required={formData.esProductor} type="email" name="productorEmail" 
              value={formData.productorEmail || ''} onChange={handleChange}
              className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* 3. Botones de navegación inferiores (Volver y Siguiente) */}
      <div className="flex justify-between pt-6 border-t border-slate-200">
        <button type="button" onClick={prevStep} className="px-6 py-2.5 text-slate-600 font-medium hover:underline">
          ← Paso anterior
        </button>
        <button type="submit" className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-md">
          Siguiente
        </button>
      </div>
    </form>
  );
}