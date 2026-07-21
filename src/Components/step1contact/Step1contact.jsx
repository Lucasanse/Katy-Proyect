import React from 'react';

const aseguradorasCatalogo = [
  "Federación Patronal", "La Caja de Ahorro y Seguro", "Sancor Seguros", 
  "Allianz Argentina", "Mercantil Andina", "Seguros Rivadavia", "Otra"
];

export default function Step1Titular({ formData, setFormData, nextStep }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Datos titular del vehículo</h2>
        <p className="text-sm text-slate-500 mt-1">Por favor, registrá la información del propietario del coche afectado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase">Tipo Doc.</label>
          <select 
            name="titularTipoDoc" value={formData.titularTipoDoc} onChange={handleChange}
            className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 bg-transparent"
          >
            <option value="DNI">DNI</option>
            <option value="CUIT">CUIT</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase">Número de Documento</label>
          <input 
            required type="text" name="titularNumDoc" value={formData.titularNumDoc} onChange={handleChange} placeholder="Ej: 30123456"
            className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase">Nombre</label>
          <input 
            required type="text" name="titularNombre" value={formData.titularNombre} onChange={handleChange}
            className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase">Apellido</label>
          <input 
            required type="text" name="titularApellido" value={formData.titularApellido} onChange={handleChange}
            className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase">Patente del vehículo</label>
          <input 
            required type="text" name="titularPatente" value={formData.titularPatente} onChange={handleChange} placeholder="AB123CD"
            className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 uppercase focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase">Teléfono móvil</label>
          <input 
            required type="tel" name="titularTelefono" value={formData.titularTelefono} onChange={handleChange} placeholder="011 15..."
            className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase">E-mail</label>
          <input 
            required type="email" name="titularEmail" value={formData.titularEmail} onChange={handleChange} placeholder="nombre@correo.com"
            className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase">Compañía de seguros</label>
          <select 
            required name="titularSeguro" value={formData.titularSeguro} onChange={handleChange}
            className="w-full mt-2 border-0 border-b-2 border-slate-300 focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 bg-transparent"
          >
            <option value="">Seleccioná tu aseguradora</option>
            {aseguradorasCatalogo.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button type="submit" className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
          Siguiente
        </button>
      </div>
    </form>
  );
}