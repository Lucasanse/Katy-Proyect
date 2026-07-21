import React, { useState } from 'react';

// Importaciones con las rutas exactas de tu captura de pantalla
import Step1contact from '../step1contact/Step1contact';
import Step2conductor from '../step2conductor/Step2conductor';
import Step3Productor from '../step3productor/Step3Productor';
import Step4tercero from '../step4Tercero/Step4tercero';
import Step5siniestro from '../step5Siniestro/Step5siniestro';
import Step6detalles from '../step6Detalles/Step6detalles';

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Estado global para todos los requerimientos (RF-02 al RF-07)
  const [formData, setFormData] = useState({
    // RF-02: Titular
    titularTipoDoc: 'DNI', titularNumDoc: '', titularNombre: '', titularApellido: '',
    titularPatente: '', titularTelefono: '', titularEmail: '', titularSeguro: '',

    // RF-03: Conductor
    esMismoConductor: true, conductorNombreCompleto: '', conductorDocumento: '',
    conductorTelefono: '', conductorEmail: '', conductorLicencia: '', conductorVinculo: '',

    // RF-04: Productor
    esProductor: false, productorNombre: '', productorMatricula: '',
    productorTelefono: '', productorEmail: '',

    // RF-06: Terceros (Array dinámico ilimitado)
    terceros: [{ dni: '', nombre: '', apellido: '', patente: '', aseguradora: '' }],

    // RF-05: Siniestro + Maps JS API
    fechaSiniestro: '', horaSiniestro: '', huboHeridos: false,
    lugarCalle: '', lugarLocalidad: '', lugarProvincia: '', latitud: null, longitud: null,

    // RF-07: Detalles
    detallesAccidente: ''
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmitFinal = () => {
    console.log("Formulario final enviado:", formData);
    alert("¡Siniestro registrado correctamente!");
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        
        {/* Barra de Progreso Superior */}
        <div className="bg-slate-50 border-b border-slate-200 px-8 py-5">
          <div className="flex items-center justify-between mb-3">
            {currentStep > 1 ? (
              <button type="button" onClick={prevStep} className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:underline">
                ← Paso anterior
              </button>
            ) : <span />}
            <span className="text-sm font-bold text-slate-600 tracking-wide">
              Paso {currentStep} de {totalSteps}
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Componentes Paso a Paso */}
        <div className="p-8">
          {currentStep === 1 && <Step1contact formData={formData} setFormData={setFormData} nextStep={nextStep} />}
          {currentStep === 2 && <Step2conductor formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
          {currentStep === 3 && <Step3Productor formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
          {currentStep === 4 && <Step4tercero formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
          {currentStep === 5 && <Step5siniestro formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
          {currentStep === 6 && <Step6detalles formData={formData} setFormData={setFormData} prevStep={prevStep} onSubmit={handleSubmitFinal} />}
        </div>

      </div>
    </div>
  );
}