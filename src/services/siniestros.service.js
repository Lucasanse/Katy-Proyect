import api from './api.js';

function list(params = {}) {
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== '')),
  ).toString();

  return api.get(`/siniestros${query ? `?${query}` : ''}`);
}

function getById(id) {
  return api.get(`/siniestros/${id}`);
}

function create(data) {
  return api.post('/siniestros', data);
}

function updateEstado(id, estado) {
  return api.put(`/siniestros/${id}/estado`, { estado });
}

function update(id, data) {
  return api.put(`/siniestros/${id}`, data);
}

function remove(id) {
  return api.delete(`/siniestros/${id}`);
}

export default { list, getById, create, updateEstado, update, remove };
