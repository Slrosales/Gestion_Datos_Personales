const express = require('express');
const router = express.Router();
const Person = require('../models/person.model');

// Obtener todas las personas
router.get('/all', async (req, res) => {
  try {
    const people = await Person.find(); // Encuentra todos los registros en la colección
    res.status(200).json({ message: 'Personas encontradas', data: people });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener personas' });
  }
});

// Obtener una persona por número de documento
router.get('/:documentNumber', async (req, res) => {
  try {
    const person = await Person.findOne({ documentNumber: req.params.documentNumber });
    if (!person) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.status(200).json({ message: 'Persona encontrada', data: person });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener persona' });
  }
});

module.exports = router;
