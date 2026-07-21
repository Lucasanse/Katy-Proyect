import React, { useState } from 'react';

export default function Step3Productor({ formData, setFormData, nextStep, prevStep }) {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    if (!value || value.trim() === "") {
      return "Este campo es obligatorio";
    }

    if (name === "productorEmail") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Formato de correo electrónico inválido";
      }
    } else if (name === "productorTelefono") {
      const telRegex = /^\d+$/;
      if (!telRegex.test(value)) {
        error = "Solo se permiten números planos";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formData.esProductor) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const toggleProductor = () => {
    setFormData({ ...formData, esProductor: !formData.esProductor });
    if (formData.esProductor) setErrors({}); // Limpiar errores al desactivar el toggle
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.esProductor) {
      nextStep();
      return;
    }

    const newErrors = {};
    const fieldsToValidate = ['productorNombre', 'productorMatricula', 'productorTelefono', 'productorEmail'];

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
        <h2 className="text-2xl font-bold text-slate-800">3. Intermediario / Asesor</h2>
        <p className="text-sm text-slate-500 mt-1">Si sos un productor gestionando este siniestro, por favor indicalo aquí.</p>
      </div>

      <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-200 rounded-lg">
        <span className="font-semibold text-slate-700 text-lg">¿Soy productor de seguros?</span>
        <button
          type="button"
          onClick={toggleProductor}
          className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            formData?.esProductor ? 'bg-blue-600' : 'bg-slate-300'
          }`}
        >
          <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
            formData?.esProductor ? 'translate-x-7' : 'translate-x-0'
          }`} />
        </button>
      </div>

      {formData?.esProductor && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 animate-fadeIn">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Nombre y Apellido / Razón Social</label>
            <input 
              type="text" name="productorNombre" 
              value={formData?.productorNombre || ''} onChange={handleChange}
              className={`w-full mt-2 border-0 border-b-2 ${errors.productorNombre ? 'border-red-500' : 'border-slate-300'} focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none`}
            />
            {errors.productorNombre && <span className="text-xs text-red-500 mt-1 block">{errors.productorNombre}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Número de Matrícula (SSN)</label>
            <input 
              type="text" name="productorMatricula" 
              value={formData?.productorMatricula || ''} onChange={handleChange}
              className={`w-full mt-2 border-0 border-b-2 ${errors.productorMatricula ? 'border-red-500' : 'border-slate-300'} focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none`}
            />
            {errors.productorMatricula && <span className="text-xs text-red-500 mt-1 block">{errors.productorMatricula}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Teléfono comercial</label>
            <input 
              type="tel" name="productorTelefono" placeholder="Ej: 1123456789"
              value={formData?.productorTelefono || ''} onChange={handleChange}
              className={`w-full mt-2 border-0 border-b-2 ${errors.productorTelefono ? 'border-red-500' : 'border-slate-300'} focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none`}
            />
            {errors.productorTelefono && <span className="text-xs text-red-500 mt-1 block">{errors.productorTelefono}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Correo electrónico (Notificaciones)</label>
            <input 
              type="email" name="productorEmail" placeholder="nombre@correo.com"
              value={formData?.productorEmail || ''} onChange={handleChange}
              className={`w-full mt-2 border-0 border-b-2 ${errors.productorEmail ? 'border-red-500' : 'border-slate-300'} focus:border-blue-600 focus:ring-0 pb-1 text-slate-800 focus:outline-none`}
            />
            {errors.productorEmail && <span className="text-xs text-red-500 mt-1 block">{errors.productorEmail}</span>}
          </div>
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