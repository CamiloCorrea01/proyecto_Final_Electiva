import axios from 'axios';

// Configuración global para axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Utiliza la variable de entorno
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
