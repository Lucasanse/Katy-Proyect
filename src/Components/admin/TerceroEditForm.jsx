import { useState } from 'react';
import tercerosService from '../../services/terceros.service.js';
import Spinner from '../common/Spinner.jsx';

const inputClass = 'w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'block text-[11px] font-medium text-slate-500 uppercase mb-1';

export default function TerceroEditForm({ tercero, aseguradoras, onSaved, onCancel }) {
  const [form, setForm] = useState({
    dni: tercero.dni || '',
    nombre: tercero.nombre || '',
    apellido: tercero.apellido || '',
    patente: tercero.patente || '',
    aseguradoraId: tercero.aseguradora?.id || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const actualizado = await tercerosService.update(tercero.id, {
        dni: form.dni || undefined,
        nombre: form.nombre || undefined,
        apellido: form.apellido || undefined,
        patente: form.patente || undefined,
        aseguradoraId: form.aseguradoraId ? Number(form.aseguradoraId) : undefined,
      });
      onSaved(actualizado);
    } catch (err) {
      setError(err.message || 'No se pudo guardar el tercero');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-slate-100 pt-3 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Nombre</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Apellido</label>
          <input type="text" name="apellido" value={form.apellido} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>DNI</label>
          <input type="text" name="dni" value={form.dni} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Patente</label>
          <input type="text" name="patente" value={form.patente} onChange={handleChange} className={`${inputClass} uppercase`} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Aseguradora</label>
          <select name="aseguradoraId" value={form.aseguradoraId} onChange={handleChange} className={inputClass}>
            <option value="">Sin aseguradora</option>
            {(aseguradoras || []).map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
                {!a.activo ? ' (inactiva)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1">{error}</p>}

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="text-xs font-medium text-slate-600 hover:underline px-2 py-1">
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
        >
          {saving && <Spinner size={12} />}
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
