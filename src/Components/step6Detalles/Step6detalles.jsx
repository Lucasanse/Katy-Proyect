import React from 'react';

export default function Step6detalles({ formData, setFormData, prevStep, onSubmit }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Información de los daños</h2>
        <p className="text-sm text-slate-500 mt-1">Detallá la mecánica del accidente y qué partes del vehículo resultaron afectadas.</p>
      </div>

      <div className="pt-2 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Descripción narrativa del hecho</label>
          
          <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-md mb-4">
            <p className="text-xs text-blue-900 leading-relaxed font-medium">
              💡 <strong>Sugerencia para una rápida gestión:</strong> Describí cómo fue el impacto y asegurate de detallar con claridad las <strong>zonas afectadas de tu vehículo</strong> (ej: frente, paragolpes trasero, lateral izquierdo, ambas puertas derechas, óptica, etc.).
            </p>
          </div>

          <textarea
            required
            name="detallesAccidente"
            value={formData.detallesAccidente}
            onChange={handleChange}
            rows={6}
            placeholder="Contanos qué pasó: Estaba detenido en el semáforo de la calle X cuando el vehículo tercero me chocó de atrás, dañando el paragolpes trasero y la tapa del baúl..."
            className="w-full p-4 border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-800 focus:outline-none transition resize-none shadow-sm"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <button type="button" onClick={prevStep} className="px-6 py-2.5 text-slate-600 font-medium hover:underline">
          ← Paso anterior
        </button>
        <button type="submit" className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 transition shadow-lg">
          Confirmar y Enviar Reclamo
        </button>
      </div>
    </form>
  );
}