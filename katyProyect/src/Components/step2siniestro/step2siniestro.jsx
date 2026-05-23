export default function Step2Siniestro({ formData, handleInput }) {
  // Array de ejemplo, acá podés agregar todas las del mercado
  const aseguradoras = [
    "Federación Patronal", "Caja de Seguros", "Sancor Seguros", "Mercantil andina",
    "San Cristóbal", "Seguros Rivadavia", "Allianz", "Zurich", "Mapfre", "Orbis", 
    "Provincia Seguros", "Nación Seguros", "La Segunda", "Otra"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Características del Hecho</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Fecha y Hora del Siniestro</label>
          <input 
            required 
            type="datetime-local" 
            name="fechaHora" 
            value={formData.fechaHora} 
            onChange={handleInput} 
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Compañía de Seguros</label>
          <select 
            required 
            name="aseguradora" 
            value={formData.aseguradora} 
            onChange={handleInput} 
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="" disabled>Desplegar listado...</option>
            {aseguradoras.map((cia) => (
              <option key={cia} value={cia}>{cia}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Lugar (Calles / Intersección)</label>
        <input 
          required 
          type="text" 
          name="ubicacion" 
          value={formData.ubicacion} 
          onChange={handleInput} 
          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder="Ej: Intersección Av. San Martín y Belgrano" 
        />
        {/* Placeholder visual para la futura API de Google Maps */}
        <div className="mt-2 w-full h-12 bg-slate-200 border-2 border-dashed border-slate-300 rounded-md flex items-center justify-center text-slate-500 text-sm">
           📍 Integración de Geolocalización Maps pendiente
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Relato del Siniestro (Cómo fue)</label>
        <textarea 
          required 
          name="relato" 
          value={formData.relato} 
          onChange={handleInput} 
          rows="5" 
          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
          placeholder="Describa la mecánica del accidente de la forma más detallada posible..."
        ></textarea>
      </div>
    </div>
  );
}