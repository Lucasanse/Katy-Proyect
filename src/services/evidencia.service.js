import api from './api.js';

function upload({ siniestroId, tipoDocumento, archivo }) {
  const formData = new FormData();
  formData.append('siniestroId', siniestroId);
  formData.append('tipoDocumento', tipoDocumento);
  formData.append('archivo', archivo);
  return api.post('/evidencia/upload', formData);
}

export default { upload };
