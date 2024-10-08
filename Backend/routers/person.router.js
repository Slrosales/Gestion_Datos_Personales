const express = require('express');
const router = express.Router();

// Importar microservicios
const createPerson = require('../services/createPerson');
const updatePerson = require('../services/updatePerson');
const deletePerson = require('../services/deletePerson');
const getPerson = require('../services/getPerson');

// Rutas del API Gateway
router.post('/', createPerson);          // Crear persona
router.put('/:id', updatePerson);        // Actualizar persona
router.delete('/:id', deletePerson);     // Eliminar persona
router.get('/:id', getPerson);           // Consultar persona

module.exports = router;
