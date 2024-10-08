const Person = require('../models/person.model');

module.exports = async (req, res) => {
  try {
    // Validar que no se esté tratando de actualizar el número de documento
    if (req.body.documentNumber) {
      return res.status(400).json({ error: 'No se puede actualizar el número de documento' });
    }

    const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!person) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.status(200).json({ message: 'Persona actualizada', data: person });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al actualizar persona' });
  }
};
