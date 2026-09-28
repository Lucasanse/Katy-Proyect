// Formatos de patente argentina aceptados:
//   ABC123   -> auto (1995-2016)
//   AB123CD  -> auto Mercosur (2016+)
//   123ABC   -> moto (1995-2016)
//   A123BCD  -> moto Mercosur (2016+)
export const PATENTE_REGEX = /^([A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z]{2}|\d{3}[A-Z]{3}|[A-Z]\d{3}[A-Z]{3})$/;

export const PATENTE_ERROR = "Formato inválido. Autos: ABC123 o AB123CD. Motos: 123ABC o A123BCD";

export const esPatenteValida = (value) => PATENTE_REGEX.test((value || '').toUpperCase().trim());
