import React from 'react';

export default function Step2Conductor({ formData, setFormData, nextStep }) {
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleRadioChange = (esMismo) => {
    setFormData({ ...formData, esMismoConductor: esMismo });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Detalle del Conductor</h2>
        <p className="text-sm text-slate-500 mt-1">¿Quién se encontraba manejando el vehículo al momento del choque?</p>
      </div>

      {/* Selector Estilo Imagen */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
        <span className="text-lg font-medium text-slate-700 block mb-4">
          ¿El conductor al momento del choque era el titular del vehículo?
        </span>
        <div className="flex justify-center space-x-8">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" name="conductorRadio" checked={formData.esMismoConductor === true} 
              onChange={() => handleRadioChange(true)} className="w-5 h-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-base font-semibold text-slate-700">SÍ, ERA EL TITULAR</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" name="conductorRadio" checked={formData.esMismoConductor === false} 
              onChange={() => handleRadioChange(false)} className="w-5 h-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-base font-semibold text-slate-700">NO, ERA OTRA PERSONA</span>
          </label>
        </div>
      </div>

      {/* Bloque condicional obligatorio */}
      {!formData.esMismoConductor && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 animate-fadeIn">
          <div className="md:col-span-2">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
              Campos obligatorios del conductor
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Nombre y Apellido completo</label>
            <input 
              required={!formData.esMismoConductor} type="text" name="conductorNombreCompleto" 
              value={formData.conductorNombreCompleto} onChange={handleChange}
              className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Tipo y Nº Documento (DNI / Cédula)</label>
            <input 
              required={!formData.esMismoConductor} type="text" name="conductorDocumento" 
              value={formData.conductorDocumento} onChange={handleChange}
              className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Teléfono de contacto</label>
            <input 
              required={!formData.esMismoConductor} type="tel" name="conductorTelefono" 
              value={formData.conductorTelefono} onChange={handleChange}
              className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Correo electrónico</label>
            <input 
              required={!formData.esMismoConductor} type="email" name="conductorEmail" 
              value={formData.conductorEmail} onChange={handleChange}
              className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Número de Licencia de conducir</label>
            <input 
              required={!formData.esMismoConductor} type="text" name="conductorLicencia" 
              value={formData.conductorLicencia} onChange={handleChange}
              className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Vínculo con el titular</label>
            <select 
              required={!formData.esMismoConductor} name="conductorVinculo" 
              value={formData.conductorVinculo} onChange={handleChange}
              className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 bg-transparent"
            >
              <option value="">Seleccione relación...</option>
              <option value="Familiar">Familiar</option>
              <option value="Empleado">Empleado</option>
              <option value="Tercero autorizado">Tercero autorizado</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-6">
        <button type="submit" className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
          Siguiente
        </button>
      </div>
    </form>
  );
}