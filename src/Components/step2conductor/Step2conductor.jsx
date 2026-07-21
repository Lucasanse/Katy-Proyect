import React, { useState } from 'react';

export default function Step2conductor({ formData, setFormData, nextStep, prevStep }) {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    if (!value || value.toString().trim() === "") {
      return "Este campo es obligatorio";
    }

    if (name === "conductorDocumento") {
      const dniRegex = /^\d{6,9}$/;
      if (!dniRegex.test(value)) {
        error = "El DNI debe tener entre 6 y 9 números";
      } else if (parseInt(value, 10) < 100000 || /^0+$/.test(value)) {
        error = "Número de documento inválido";
      } else if (value.trim() === formData?.titularNumDoc?.toString().trim()) {
        error = "El DNI no puede ser igual al del titular. Si maneja el titular, seleccioná 'SÍ, ERA EL TITULAR' arriba.";
      }
    } else if (name === "conductorEmail") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Formato de correo electrónico inválido";
      }
    } else if (name === "conductorTelefono") {
      const telRegex = /^\d+$/;
      if (!telRegex.test(value)) {
        error = "Solo se permiten números planos";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    
    if (!formData.esMismoConductor) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, finalValue) }));
    }
  };

  const handleRadioChange = (esMismo) => {
    setFormData(prev => ({ ...prev, esMismoConductor: esMismo }));
    if (esMismo) setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.esMismoConductor) {
      nextStep();
      return;
    }

    const newErrors = {};
    const fieldsToValidate = [
      'conductorNombreCompleto', 'conductorDocumento', 'conductorTelefono',
      'conductorEmail', 'conductorLicencia', 'conductorVinculo'
    ];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">2. Detalle del Conductor</h2>
        <p className="text-sm text-slate-500 mt-1">¿Quién se encontraba manejando el vehículo al momento del choque?</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
        <span className="text-lg font-medium text-slate-700 block mb-4">
          ¿El conductor al momento del choque era el titular del vehículo?
        </span>
        <div className="flex justify-center space-x-8">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" name="conductorRadio" checked={formData?.esMismoConductor === true} 
              onChange={() => handleRadioChange(true)} className="w-5 h-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-base font-semibold text-slate-700">SÍ, ERA EL TITULAR</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" name="conductorRadio" checked={formData?.esMismoConductor === false} 
              onChange={() => handleRadioChange(false)} className="w-5 h-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-base font-semibold text-slate-700">NO, ERA OTRA PERSONA</span>
          </label>
        </div>
      </div>

      {!formData?.esMismoConductor && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 animate-fadeIn">
          <div className="md:col-span-2">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
              Campos obligatorios del conductor
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Nombre y Apellido completo</label>
            <input 
              type="text" name="conductorNombreCompleto" 
              value={formData?.conductorNombreCompleto || ''} onChange={handleChange}
              className={`w-full mt-2 border-0 border-b-2 ${errors.conductorNombreCompleto ? 'border-red-500' : 'border-slate-300'} focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none`}
            />
            {errors.conductorNombreCompleto && <span className="text-xs text-red-500 mt-1 block">{errors.conductorNombreCompleto}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Tipo y Nº Documento (DNI / Cédula)</label>
            <input 
              type="text" name="conductorDocumento" placeholder="Ej: 35123456"
              maxLength={9}
              value={formData?.conductorDocumento || ''} onChange={handleChange}
              className={`w-full mt-2 border-0 border-b-2 ${errors.conductorDocumento ? 'border-red-500' : 'border-slate-300'} focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none`}
            />
            {errors.conductorDocumento && <span className="text-xs text-red-500 mt-1 block">{errors.conductorDocumento}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Teléfono de contacto</label>
            <input 
              type="tel" name="conductorTelefono" placeholder="Ej: 1123456789"
              value={formData?.conductorTelefono || ''} onChange={handleChange}
              className={`w-full mt-2 border-0 border-b-2 ${errors.conductorTelefono ? 'border-red-500' : 'border-slate-300'} focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none`}
            />
            {errors.conductorTelefono && <span className="text-xs text-red-500 mt-1 block">{errors.conductorTelefono}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Correo electrónico</label>
            <input 
              type="email" name="conductorEmail" placeholder="nombre@correo.com"
              value={formData?.conductorEmail || ''} onChange={handleChange}
              className={`w-full mt-2 border-0 border-b-2 ${errors.conductorEmail ? 'border-red-500' : 'border-slate-300'} focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none`}
            />
            {errors.conductorEmail && <span className="text-xs text-red-500 mt-1 block">{errors.conductorEmail}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Número de Licencia de conducir</label>
            <input 
              type="text" name="conductorLicencia" 
              value={formData?.conductorLicencia || ''} onChange={handleChange}
              className={`w-full mt-2 border-0 border-b-2 ${errors.conductorLicencia ? 'border-red-500' : 'border-slate-300'} focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none`}
            />
            {errors.conductorLicencia && <span className="text-xs text-red-500 mt-1 block">{errors.conductorLicencia}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Vínculo con el titular</label>
            <select 
              name="conductorVinculo" 
              value={formData?.conductorVinculo || ''} onChange={handleChange}
              className={`w-full mt-2 border-0 border-b-2 ${errors.conductorVinculo ? 'border-red-500' : 'border-slate-300'} focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 bg-transparent`}
            >
              <option value="">Seleccione relación...</option>
              <option value="Familiar">Familiar</option>
              <option value="Empleado">Empleado</option>
              <option value="Tercero autorizado">Tercero autorizado</option>
            </select>
            {errors.conductorVinculo && <span className="text-xs text-red-500 mt-1 block">{errors.conductorVinculo}</span>}
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6 border-t border-slate-200">
        <button type="button" onClick={prevStep} className="px-6 py-2.5 text-slate-600 font-medium hover:underline">
          ← Paso anterior
        </button>
        <button type="submit" className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
          Siguiente
        </button>
      </div>
    </form>
  );
}