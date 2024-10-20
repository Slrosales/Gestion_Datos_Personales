const Person = require('../models/person.model');

module.exports = async (req, res) => {
  try {
    const person = await Person.findOne({ documentNumber: req.params.documentNumber });
    if (!person) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.status(200).json({ message: 'Persona encontrada', data: person });
  } catch (error) {
    console.error('Error al obtener persona:', error); // Agregar log de error
    res.status(500).json({ error: 'Error al obtener persona' });
  }
};
