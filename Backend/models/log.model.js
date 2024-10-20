const mongoose = require('mongoose');

// Definir el esquema del log
const LogSchema = new mongoose.Schema({
  action: { type: String, required: true },          // Tipo de acción (create, update, delete)
  documentNumber: { type: String, required: true },  // Número de documento de la persona involucrada
  details: { type: Object },                         // Detalles adicionales (antes y después de la actualización)
  timestamp: { type: Date, default: Date.now },      // Momento en el que ocurrió la acción
});

// Crear el modelo del log
const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
