import api from './api.js';

function list({ incluirInactivas } = {}) {
  return api.get(`/aseguradoras${incluirInactivas ? '?incluirInactivas=true' : ''}`);
}

function getById(id) {
  return api.get(`/aseguradoras/${id}`);
}

function create(data) {
  return api.post('/aseguradoras', data);
}

function update(id, data) {
  return api.put(`/aseguradoras/${id}`, data);
}

function remove(id) {
  return api.delete(`/aseguradoras/${id}`);
}

export default { list, getById, create, update, remove };
