export default function Step1Contact({ formData, handleInput }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Información del Tercero</h2>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Nombre y Apellido completo</label>
        <input 
          required 
          type="text" 
          name="nombre" 
          value={formData.nombre} 
          onChange={handleInput} 
          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
          placeholder="Ej: Juan Pérez" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">DNI / CUIT</label>
        <input 
          required 
          type="number" 
          name="dni" 
          value={formData.dni} 
          onChange={handleInput} 
          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Teléfono / WhatsApp</label>
          <input 
            required 
            type="tel" 
            name="telefono" 
            value={formData.telefono} 
            onChange={handleInput} 
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Correo Electrónico</label>
          <input 
            required 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInput} 
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
          />
        </div>
      </div>
    </div>
  );
}