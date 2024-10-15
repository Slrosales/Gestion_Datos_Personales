const express = require('express');
const router = express.Router();



// Importar microservicios
const getLogs = require('../services/getLogs');  
const createPerson = require('../services/createPerson');
const updatePerson = require('../services/updatePerson');
const deletePerson = require('../services/deletePerson');
const getPerson = require('../services/getPerson');

// Rutas del API Gateway (basadas en documentNumber)
router.post('/', createPerson);                        // Crear persona
router.put('/:documentNumber', updatePerson);          // Actualizar persona por documento
router.delete('/:documentNumber', deletePerson);       // Eliminar persona por documento
router.get('/:documentNumber', getPerson);             // Consultar persona por documento

router.get('/logs', getLogs);                          // Ruta para consultar los logs


// Manejo de rutas no definidas
router.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = router;
