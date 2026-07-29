import api from './api.js';

function update(id, data) {
  return api.put(`/terceros/${id}`, data);
}

export default { update };
