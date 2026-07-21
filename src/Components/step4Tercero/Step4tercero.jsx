import React from 'react';

const aseguradorasTerceros = [
  "Federación Patronal", "La Caja de Ahorro y Seguro", "Sancor Seguros", 
  "Allianz Argentina", "Mercantil Andina", "Seguros Rivadavia", "San Cristóbal", "La Segunda", "Otra"
];

export default function Step4tercero({ formData, setFormData, nextStep, prevStep }) {
  const addTercero = () => {
    setFormData(prev => ({
      ...prev,
      terceros: [...(prev.terceros || []), { dni: '', nombre: '', apellido: '', patente: '', aseguradora: '' }]
    }));
  };

  const removeTercero = (index) => {
    setFormData(prev => ({
      ...prev,
      terceros: prev.terceros.filter((_, i) => i !== index)
    }));
  };

  const handleTerceroChange = (index, field, value) => {
    const updated = [...formData.terceros];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, terceros: updated }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Datos de quién te chocó</h2>
          <p className="text-sm text-slate-500 mt-1">Registrá la información de los terceros involucrados en el accidente.</p>
        </div>
        <button 
          type="button" onClick={addTercero}
          className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold rounded-lg text-sm transition"
        >
          + Agregar otro tercero
        </button>
      </div>

      {(!formData.terceros || formData.terceros.length === 0) ? (
        <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-slate-500 text-sm">No hay terceros cargados.</p>
          <button type="button" onClick={addTercero} className="mt-2 text-blue-600 text-sm font-medium hover:underline">Hacé clic aquí para agregar uno</button>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.terceros.map((tercero, index) => (
            <div key={index} className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-700 text-sm uppercase tracking-wider">Vehículo / Tercero #{index + 1}</span>
                {formData.terceros.length > 1 && (
                  <button type="button" onClick={() => removeTercero(index)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Eliminar
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase">DNI / Cédula</label>
                  <input 
                    required type="text" value={tercero.dni} onChange={(e) => handleTerceroChange(index, 'dni', e.target.value)} placeholder="Ej: 30123456"
                    className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase">Nombre</label>
                  <input 
                    required type="text" value={tercero.nombre} onChange={(e) => handleTerceroChange(index, 'nombre', e.target.value)}
                    className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase">Apellido</label>
                  <input 
                    required type="text" value={tercero.apellido} onChange={(e) => handleTerceroChange(index, 'apellido', e.target.value)}
                    className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase">Patente del vehículo</label>
                  <input 
                    required type="text" value={tercero.patente} onChange={(e) => handleTerceroChange(index, 'patente', e.target.value)} placeholder="AB123CD"
                    className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 uppercase focus:outline-none bg-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase">Aseguradora del Tercero</label>
                  <select 
                    required value={tercero.aseguradora} onChange={(e) => handleTerceroChange(index, 'aseguradora', e.target.value)}
                    className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 bg-transparent focus:outline-none"
                  >
                    <option value="">Seleccioná una aseguradora...</option>
                    {aseguradorasTerceros.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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