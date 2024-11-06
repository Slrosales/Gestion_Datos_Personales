const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 30 },
  secondName: { type: String, maxlength: 30 },
  lastName: { type: String, required: true, maxlength: 60 },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: ['Masculino', 'Femenino', 'No binario', 'Prefiero no reportar'], required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
  phone: { type: String, required: true, minlength: 10, maxlength: 10 },
  documentNumber: { type: String, required: true, maxlength: 10, unique: true }, // Llave única
  documentType: { type: String, enum: ['Cédula', 'Tarjeta de identidad'], required: true },
  toponymy: { type: String, maxlength: 1000 },
  profilePicture: { type: String, maxlength: 500, require: true }, // Campo para la URL de la foto de perfil
});

// Exportar el modelo de persona
const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;
