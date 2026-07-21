import React, { useState } from 'react';

// Importaciones previas intactas
import Step1contact from '../step1contact/Step1contact';
import Step2conductor from '../step2conductor/Step2conductor';
import Step3Productor from '../step3productor/Step3Productor';
import Step4tercero from '../step4Tercero/Step4tercero';
import Step5siniestro from '../step5Siniestro/Step5siniestro';
import Step6detalles from '../step6Detalles/Step6detalles';

// 1. NUEVAS IMPORTACIONES (asegúrate de crear las carpetas y archivos correspondientes)
import Step7Verificacion from '../step7verificacion/Step7Verificacion';
import Step8Adjuntos from '../step8adjuntos/Step8Adjuntos';

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8; // 2. Actualizamos el total a 8 pasos

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

  // 3. NUEVO ESTADO para controlar la seguridad y verificación OTP
  const [authData, setAuthData] = useState({
    codigoGenerado: null,
    emailDestino: '',
    verificado: false
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // 4. NUEVA FUNCIÓN que se ejecuta al terminar el Paso 6
  const iniciarVerificacion = () => {
    // Si en el paso 3 eligió que hay productor y puso su mail, se lo mandamos al productor. Si no, al titular.
    const emailDestino = formData.esProductor && formData.productorEmail 
      ? formData.productorEmail 
      : formData.titularEmail;

    if (!emailDestino) {
      alert("Por favor, regresa e ingresa un email válido para el Titular o el Productor.");
      return;
    }

    // Generamos un código numérico aleatorio de 6 dígitos
    const nuevoCodigo = Math.floor(100000 + Math.random() * 900000).toString();

    // Guardamos en el estado el código y el correo
    setAuthData({
      codigoGenerado: nuevoCodigo,
      emailDestino: emailDestino,
      verificado: false
    });

    // SIMULACIÓN DE ENVÍO DE EMAIL (acá luego conectarás tu backend o EmailJS)
    console.log(`=========================================`);
    console.log(`[SEGURIDAD] Código OTP generado: ${nuevoCodigo}`);
    console.log(`[SEGURIDAD] Enviado por email a: ${emailDestino}`);
    console.log(`=========================================`);
    
    alert(`Se envió un código de verificación al correo: ${emailDestino}\n(Revisa la consola con F12 para ver el código generado de prueba)`);

    // Avanzamos al Paso 7
    setCurrentStep(7);
  };

  // 5. FUNCIÓN que se ejecuta cuando el código en el Paso 7 es correcto
  const handleVerificacionExitosa = () => {
    setAuthData(prev => ({ ...prev, verificado: true }));
    setCurrentStep(8); // Pasamos por fin al RF-08 (Adjuntos)
  };

  // Función finalísima cuando ya cargó las fotos en el Paso 8
  const handleSubmitFinal = () => {
    console.log("Formulario final con documentación enviado:", formData);
    alert("¡Siniestro y documentación registrados correctamente!");
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
          
          {/* Al terminar el Paso 6, ahora ejecuta iniciarVerificacion en lugar del submit final */}
          {currentStep === 6 && <Step6detalles formData={formData} setFormData={setFormData} prevStep={prevStep} onSubmit={iniciarVerificacion} />}

          {/* NUEVO PASO 7: Verificación OTP */}
          {currentStep === 7 && (
            <Step7Verificacion 
              emailDestino={authData.emailDestino}
              codigoCorrecto={authData.codigoGenerado}
              onSuccess={handleVerificacionExitosa}
              onResend={iniciarVerificacion}
              prevStep={prevStep}
            />
          )}

          {/* NUEVO PASO 8: RF-08 Gestión de Archivos Adjuntos */}
          {currentStep === 8 && (
            <Step8Adjuntos 
              formData={formData} 
              prevStep={prevStep}
              onSubmitFinal={handleSubmitFinal} 
            />
          )}
        </div>

      </div>
    </div>
  );
}