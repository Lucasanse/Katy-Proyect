import { useState } from 'react';
import Step1Contact from "../step1contact/step1contact.jsx";
import Step2Siniestro from "../step2siniestro/step2siniestro.jsx"

export default function Wizard({ onCancel }) {
  const [step, setStep] = useState(1);
  
  // Estado centralizado para todos los datos
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    email: '',
    fechaHora: '',
    ubicacion: '',
    relato: '',
    aseguradora: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos listos para enviar a PHP:", formData);
    alert("Reclamo simulado con éxito. Abrí la consola para ver el JSON de los datos.");
    onCancel(); // Vuelve al inicio tras finalizar
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 mt-10 bg-white rounded-xl shadow-md border border-slate-200">
      
      {/* Cabecera / Indicador de progreso */}
      <div className="flex justify-between border-b pb-4 mb-8">
        <div className={`text-lg font-semibold ${step === 1 ? 'text-blue-600' : 'text-slate-400'}`}>
          1. Datos de Contacto
        </div>
        <div className={`text-lg font-semibold ${step === 2 ? 'text-blue-600' : 'text-slate-400'}`}>
          2. Detalle del Siniestro
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        
        {step === 1 && (
          <Step1Contact formData={formData} handleInput={handleInput} />
        )}
        
        {step === 2 && (
          <Step2Siniestro formData={formData} handleInput={handleInput} />
        )}

        {/* Aviso de documentación por correo (Solo en el paso final) */}
        {step === 2 && (
          <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-md">
            <h4 className="text-yellow-800 font-bold mb-1">Carga de Documentación</h4>
            <p className="text-sm text-yellow-700">
              Para asegurar la calidad de las imágenes y archivos pesados (Fotos, Denuncia Administrativa, Cédula), por favor envíelos por correo electrónico a <strong>documentacion@estudio.com</strong> indicando el DNI del tercero en el Asunto.
            </p>
          </div>
        )}

        {/* Botonera de navegación */}
        <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
          {step === 1 ? (
            <button type="button" onClick={onCancel} className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2">
              Cancelar
            </button>
          ) : (
            <button type="button" onClick={prevStep} className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-6 rounded-md font-medium transition-colors">
              Volver Atrás
            </button>
          )}

          {step === 1 ? (
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-8 rounded-md font-semibold transition-colors shadow-sm">
              Continuar
            </button>
          ) : (
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-8 rounded-md font-semibold transition-colors shadow-sm">
              Guardar Reclamo
            </button>
          )}
        </div>
      </form>
    </div>
  );
}