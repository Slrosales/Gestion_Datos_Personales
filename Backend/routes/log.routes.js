const express = require('express');
const router = express.Router();
const getLogs = require('../services/getLogs');  // Importa el microservicio para obtener los logs

// Ruta para obtener todos los logs
router.get('/', getLogs);  // Consultar logs

// Manejo de rutas no definidas
router.use((req, res) => {
  res.status(404).json({ error: 'Ruta de logs no encontrada' });
});

module.exports = router;
