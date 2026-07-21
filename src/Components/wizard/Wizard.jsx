import React, { useState } from 'react';
import Step1Titular from '../step1contact/Step1contact';
import Step2Conductor from '../step2siniestro/Step2siniestro';
import Step3Productor from '../step3productor/Step3Productor'; // Crea un componente nuevo o integra según tu carpeta

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // RF-02 Titular
    titularTipoDoc: 'DNI', titularNumDoc: '', titularNombre: '', titularApellido: '',
    titularTelefono: '', titularEmail: '', titularPatente: '', titularSeguro: '',
    // RF-03 Conductor
    esMismoConductor: true,
    conductorNombreCompleto: '', conductorDocumento: '', conductorTelefono: '',
    conductorEmail: '', conductorLicencia: '', conductorVinculo: '',
    // RF-04 Productor
    esProductor: false,
    productorNombre: '', productorMatricula: '', productorTelefono: '', productorEmail: ''
  });

  const totalSteps = 3;

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmitFinal = () => {
    console.log("Formulario final listo para enviar:", formData);
    alert("¡Datos registrados con éxito!");
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Cabecera / Barra de Progreso al estilo de las imágenes */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            {currentStep > 1 ? (
              <button onClick={prevStep} className="text-blue-600 font-medium flex items-center hover:underline">
                ← Paso anterior
              </button>
            ) : <span />}
            <span className="text-sm font-semibold text-slate-500">
              Paso {currentStep} de {totalSteps}
            </span>
          </div>
          {/* Barra de progreso */}
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Contenido de los Pasos */}
        <div className="p-8">
          {currentStep === 1 && (
            <Step1Titular formData={formData} setFormData={setFormData} nextStep={nextStep} />
          )}
          {currentStep === 2 && (
            <Step2Conductor formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />
          )}
          {currentStep === 3 && (
            <Step3Productor formData={formData} setFormData={setFormData} prevStep={prevStep} onSubmit={handleSubmitFinal} />
          )}
        </div>

      </div>
    </div>
  );
}