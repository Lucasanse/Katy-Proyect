import { useState } from 'react';
import EstadoBadge, { ESTADO_LABELS } from './EstadoBadge.jsx';
import siniestrosService from '../../services/siniestros.service.js';

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</dt>
      <dd className="text-sm text-slate-800 mt-0.5">{value ?? '—'}</dd>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border border-slate-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">{title}</h3>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">{children}</dl>
    </div>
  );
}

function EmptyNotice({ children }) {
  return (
    <div className="flex items-center gap-2 border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 text-sm text-slate-500">
      <span aria-hidden="true">ℹ️</span>
      <span>{children}</span>
    </div>
  );
}

export default function SiniestroDetalle({ siniestro, onClose, onEstadoUpdated }) {
  const [estado, setEstado] = useState(siniestro.estado);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  async function handleEstadoChange(e) {
    const nuevoEstado = e.target.value;
    setError('');
    setUpdating(true);
    try {
      const actualizado = await siniestrosService.updateEstado(siniestro.id, nuevoEstado);
      setEstado(actualizado.estado);
      onEstadoUpdated(actualizado);
    } catch (err) {
      setError(err.message || 'No se pudo actualizar el estado');
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white rounded-t-xl">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Siniestro #{siniestro.id}</h2>
            <p className="text-sm text-slate-500">{siniestro.fechaSiniestro} · {siniestro.horaSiniestro}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none px-2"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-slate-700">Estado:</span>
            <EstadoBadge estado={estado} />
            <select
              value={estado}
              onChange={handleEstadoChange}
              disabled={updating}
              className="ml-auto rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            >
              {Object.entries(ESTADO_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  Cambiar a: {label}
                </option>
              ))}
            </select>
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}

          <Section title="Datos del siniestro">
            <Field label="Fecha" value={siniestro.fechaSiniestro} />
            <Field label="Hora" value={siniestro.horaSiniestro} />
            <Field label="¿Hubo heridos?" value={siniestro.huboHeridos ? 'Sí' : 'No'} />
            <Field label="Calle" value={siniestro.lugarCalle} />
            <Field label="Localidad" value={siniestro.lugarLocalidad} />
            <Field label="Provincia" value={siniestro.lugarProvincia} />
            <div className="sm:col-span-2">
              <Field label="Detalles del accidente" value={siniestro.detallesAccidente} />
            </div>
          </Section>

          {siniestro.titular ? (
            <Section title="Titular">
              <Field label="Nombre" value={`${siniestro.titular.nombre} ${siniestro.titular.apellido}`} />
              <Field label="Documento" value={`${siniestro.titular.tipoDoc} ${siniestro.titular.numDoc}`} />
              <Field label="Patente" value={siniestro.titular.patente} />
              <Field label="Teléfono" value={siniestro.titular.telefono} />
              <Field label="Email" value={siniestro.titular.email} />
              <Field label="Aseguradora" value={siniestro.titular.aseguradora?.nombre} />
            </Section>
          ) : (
            <EmptyNotice>No se cargaron los datos del titular del vehículo.</EmptyNotice>
          )}

          {siniestro.conductor ? (
            <Section title="Conductor">
              <Field label="Nombre completo" value={siniestro.conductor.nombreCompleto} />
              <Field label="Documento" value={siniestro.conductor.documento} />
              <Field label="Teléfono" value={siniestro.conductor.telefono} />
              <Field label="Email" value={siniestro.conductor.email} />
              <Field label="Vínculo con el titular" value={siniestro.conductor.vinculo} />
            </Section>
          ) : (
            <EmptyNotice>No se cargó un conductor: el titular era quien conducía el vehículo.</EmptyNotice>
          )}

          {siniestro.productor?.esProductor ? (
            <Section title="Productor de seguros">
              <Field label="Nombre" value={siniestro.productor.nombre} />
              <Field label="Matrícula" value={siniestro.productor.matricula} />
              <Field label="Teléfono" value={siniestro.productor.telefono} />
              <Field label="Email" value={siniestro.productor.email} />
            </Section>
          ) : (
            <EmptyNotice>Este siniestro no fue gestionado por un productor de seguros.</EmptyNotice>
          )}

          {siniestro.terceros?.length > 0 ? (
            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Terceros involucrados</h3>
              <div className="space-y-3">
                {siniestro.terceros.map((tercero) => (
                  <dl key={tercero.id} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-100 pt-3 first:border-t-0 first:pt-0">
                    <Field label="Nombre" value={`${tercero.nombre || ''} ${tercero.apellido || ''}`.trim()} />
                    <Field label="DNI" value={tercero.dni} />
                    <Field label="Patente" value={tercero.patente} />
                    <Field label="Aseguradora" value={tercero.aseguradora?.nombre} />
                  </dl>
                ))}
              </div>
            </div>
          ) : (
            <EmptyNotice>No se registraron terceros involucrados en este siniestro.</EmptyNotice>
          )}

          <div className="border border-slate-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Evidencia {siniestro.evidencias?.length ? `(${siniestro.evidencias.length})` : ''}
            </h3>
            {siniestro.evidencias?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {siniestro.evidencias.map((evidencia) => (
                  <button
                    key={evidencia.id}
                    type="button"
                    onClick={() => setPreviewUrl(evidencia.urlArchivo)}
                    className="group text-left"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                      <img
                        src={evidencia.urlArchivo}
                        alt={evidencia.tipoDocumento}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1 truncate">{evidencia.tipoDocumento}</p>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No se cargó evidencia para este siniestro.</p>
            )}
          </div>
        </div>
      </div>

      {previewUrl && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/80"
          onClick={(e) => {
            e.stopPropagation();
            setPreviewUrl(null);
          }}
        >
          <img src={previewUrl} alt="Evidencia" className="max-w-full max-h-full rounded-lg shadow-2xl" />
        </div>
      )}
    </div>
  );
}
