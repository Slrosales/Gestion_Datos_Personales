const Person = require('../models/person.model');

module.exports = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.status(200).json({ message: 'Persona eliminada', data: person });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al eliminar persona' });
  }
};
