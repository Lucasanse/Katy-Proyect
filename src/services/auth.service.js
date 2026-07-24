import api, { setToken } from './api.js';

async function login(email, password) {
  const data = await api.post('/auth/login', { email, password });
  setToken(data.token);
  return data.admin;
}

async function logout() {
  try {
    await api.post('/auth/logout');
  } finally {
    setToken(null);
  }
}

async function me() {
  const data = await api.get('/auth/me');
  return data.admin;
}

export default { login, logout, me };
