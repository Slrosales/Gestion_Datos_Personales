import axios from 'axios';

// Instancia para el servidor en el puerto 5000
const apiCrear= axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '/'
});

// Instancia para el servidor en el puerto 5001
const apiConsultas = axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' : '/'
});

export { apiCrear, apiConsultas };