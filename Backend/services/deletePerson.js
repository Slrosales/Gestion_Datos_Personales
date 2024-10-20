const Person = require('../models/person.model');
const Log = require('../models/log.model');  // Importar el modelo de log

module.exports = async (req, res) => {
  try {
    const person = await Person.findOneAndDelete({ documentNumber: req.params.documentNumber });

    if (!person) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    // Registrar la transacción en el log
    await Log.create({
      action: 'delete',
      documentNumber: req.params.documentNumber,
      details: person
    });

    res.status(200).json({ message: 'Persona eliminada con éxito', data: person });
  } catch (error) {
    console.error('Error al eliminar persona:', error);
    res.status(500).json({ error: error.message || 'Error al eliminar persona' });
  }
};
