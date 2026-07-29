// fechaSiniestro se guarda como texto "YYYY-MM-DD" (lo que espera <input type="date">).
// Acá solo se cambia cómo se muestra, nunca el valor que viaja al backend o a los inputs de fecha.
export function formatearFecha(fechaIso) {
  if (!fechaIso) return fechaIso;
  const [anio, mes, dia] = fechaIso.split('-');
  if (!anio || !mes || !dia) return fechaIso;
  return `${dia}-${mes}-${anio}`;
}

// Fecha + hora en formato 24hs (nunca a. m./p. m.), para timestamps tipo DateTime del backend.
export function formatearFechaHora(fechaIso) {
  if (!fechaIso) return fechaIso;
  return new Date(fechaIso).toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
