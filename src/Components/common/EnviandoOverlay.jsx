import Spinner from './Spinner.jsx';

export default function EnviandoOverlay({ open, title = 'Enviando tu reclamo…', message }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
        <Spinner size={40} className="mx-auto mb-6 text-blue-600" />
        <h2 className="text-xl text-slate-900 mb-2">{title}</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          {message ||
            'Estamos subiendo tu información al servidor. Este proceso puede demorar un poco la primera vez, por favor no cierres ni recargues esta ventana.'}
        </p>
      </div>
    </div>
  );
}
