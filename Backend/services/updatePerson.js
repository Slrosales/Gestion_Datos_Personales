const Person = require('../models/person.model');
const Log = require('../models/log.model');  // Importar el modelo de log

module.exports = async (req, res) => {
  try {
    const validFields = ['firstName', 'secondName', 'lastName', 'birthDate', 'gender', 'email', 'phone', 'documentNumber', 'documentType', 'toponymy'];
    const updateData = {};

    validFields.forEach(field => {
      if (req.body[field]) {
        updateData[field] = req.body[field];
      }
    });

    // Actualizar la persona por número de documento
    const personBeforeUpdate = await Person.findOne({ documentNumber: req.params.documentNumber });
    const person = await Person.findOneAndUpdate({ documentNumber: req.params.documentNumber }, updateData, { new: true });

    if (!person) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    // Registrar la transacción en el log (incluyendo antes y después de la actualización)
    await Log.create({
      action: 'update',
      documentNumber: req.params.documentNumber,
      details: {
        before: personBeforeUpdate,
        after: person
      }
    });

    res.status(200).json({ message: 'Persona actualizada con éxito', data: person });
  } catch (error) {
    console.error('Error al actualizar persona:', error);
    res.status(500).json({ error: 'Error interno al actualizar la persona' });
  }
};
