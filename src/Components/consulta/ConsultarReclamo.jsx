import { useState } from 'react';
import EstadoBadge from '../admin/EstadoBadge.jsx';
import siniestrosService from '../../services/siniestros.service.js';
import { formatearFecha, formatearFechaHora } from '../../utils/formatearFecha.js';

// TODO: completar con el email de contacto real para consultas sobre un reclamo.
const EMAIL_CONSULTAS = '';

export default function ConsultarReclamo() {
  const [numero, setNumero] = useState('');
  const [credencial, setCredencial] = useState('');
  const [tieneProductor, setTieneProductor] = useState(true);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [buscando, setBuscando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setResultado(null);

    if (!numero.trim() || !credencial.trim()) {
      setError(
        tieneProductor
          ? 'Completá el número de siniestro y la matrícula del proveedor de seguros'
          : 'Completá el número de siniestro y el DNI del titular del vehículo',
      );
      return;
    }

    setBuscando(true);
    try {
      const data = await siniestrosService.consultar(numero.trim(), credencial.trim());
      setResultado(data);
    } catch (err) {
      setError(err.message || 'No se encontró un reclamo con esos datos');
    } finally {
      setBuscando(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">Consultar Reclamo</h1>
        <p className="text-slate-600 mb-8 text-center">
          Ingresá el número de siniestro y la matrícula del proveedor de seguros (o tu DNI, si el reclamo no tiene
          productor de seguros cargado) para ver el estado de tu reclamo.
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Número de siniestro</label>
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Ej: MS000482"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">¿Cargaste el siniestro siendo productor de seguros?</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setTieneProductor(true); setCredencial(''); }}
                className={`flex-1 text-sm font-medium py-2 rounded-lg border transition-colors ${
                  tieneProductor ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Sí, tengo matrícula
              </button>
              <button
                type="button"
                onClick={() => { setTieneProductor(false); setCredencial(''); }}
                className={`flex-1 text-sm font-medium py-2 rounded-lg border transition-colors ${
                  !tieneProductor ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                No, uso mi DNI
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
              {tieneProductor ? 'Matrícula del proveedor de seguros' : 'DNI del titular del vehículo'}
            </label>
            <input
              type="text"
              value={credencial}
              onChange={(e) => setCredencial(e.target.value)}
              placeholder={tieneProductor ? 'Ingrese acá la matrícula' : 'Ej: 30123456'}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

          <button
            type="submit"
            disabled={buscando}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg shadow transition-colors"
          >
            {buscando ? 'Buscando...' : 'Consultar'}
          </button>
        </form>

        {resultado && (
          <div className="mt-6 bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Siniestro {resultado.numero}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Estado actual:</span>
              <EstadoBadge estado={resultado.estado} />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase block">Fecha de carga</span>
              <span className="text-sm text-slate-800">{formatearFecha(resultado.fechaCarga.slice(0, 10))}</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase block">Último cambio de estado</span>
              <span className="text-sm text-slate-800">
                {formatearFechaHora(resultado.fechaUltimoCambioEstado)}
              </span>
            </div>

            <p className="text-xs text-slate-500 border-t border-slate-100 pt-3">
              ¿Alguna consulta sobre este reclamo? Escribinos a{' '}
              {EMAIL_CONSULTAS ? (
                <a href={`mailto:${EMAIL_CONSULTAS}`} className="text-blue-600 hover:underline">
                  {EMAIL_CONSULTAS}
                </a>
              ) : (
                <span className="italic">[completar email de contacto]</span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
